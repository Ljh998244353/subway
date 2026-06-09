from __future__ import annotations

import json
from typing import Any

import httpx

from app.core.config import LlmSettings, get_llm_settings
from app.schemas.advice import (
    LlmAdviceStateDto,
    StoreAdviceInputDto,
    StoreManagementAdviceDto,
    StoreManagementAdviceRequestDto,
    StoreManagementAdviceResponseDto,
)

BLOCKED_INPUT_KEYS = {
    "face_id",
    "faceId",
    "member_id",
    "memberId",
    "phone",
    "person_id",
    "personId",
    "track_id",
    "trackId",
    "trajectory_id",
    "trajectoryId",
    "raw_frame",
    "rawFrame",
    "video_url",
    "videoUrl",
    "image_url",
    "imageUrl",
    "order_id",
    "orderId",
    "payment_id",
    "paymentId",
}

PRIORITY_RANK = {"high": 0, "medium": 1, "low": 2}


def contains_blocked_keys(value: Any) -> list[str]:
    found: list[str] = []
    if isinstance(value, dict):
        for key, item in value.items():
            if key in BLOCKED_INPUT_KEYS:
                found.append(key)
            found.extend(contains_blocked_keys(item))
    elif isinstance(value, list):
        for item in value:
            found.extend(contains_blocked_keys(item))
    return sorted(set(found))


def build_store_management_advice(request: StoreManagementAdviceRequestDto) -> StoreManagementAdviceResponseDto:
    settings = get_llm_settings()
    rule_items = generate_rule_advice(request)
    if not settings.enabled:
        return _response("disabled", "rule", rule_items, settings, "LLM_ENABLED is false; deterministic rule advice returned.")
    if not settings.is_configured:
        return _response("disabled", "rule", rule_items, settings, "LLM is enabled but LLM_BASE_URL, LLM_API_KEY, or LLM_MODEL is missing.")

    try:
        llm_items = generate_llm_advice(request, settings)
    except Exception:
        return _response("fallback", "rule", rule_items, settings, "LLM request failed or returned invalid JSON; deterministic rule advice returned.")

    return _response("llm", "llm", llm_items, settings, None)


def generate_rule_advice(request: StoreManagementAdviceRequestDto) -> list[StoreManagementAdviceDto]:
    items: list[StoreManagementAdviceDto] = []
    open_alert_store_ids = {alert.storeId for alert in request.alerts if alert.storeId and not alert.isResolved}
    critical_alert_store_ids = {alert.storeId for alert in request.alerts if alert.storeId and alert.level == "critical" and not alert.isResolved}

    for store in request.stores:
        if store.storeId in open_alert_store_ids or store.hasWarning:
            items.append(
                _advice(
                    store,
                    "alert",
                    "high" if store.storeId in critical_alert_store_ids or request.incidentLevel >= 2 else "medium",
                    "优先处理门店告警",
                    store.warningText or "该店存在未闭环的合成运营告警。",
                    ["核对店前动线和导购响应", "在当日高峰前完成一次店面巡检", "将处理结论同步到值班记录"],
                    "降低未闭环风险，避免低效信号继续扩大。",
                    [f"warning={store.hasWarning}", f"incidentLevel={request.incidentLevel}"],
                )
            )
        if store.grade in {"C-", "D"} or store.score < 62:
            items.append(
                _advice(
                    store,
                    "conversion",
                    "high",
                    "启动低分店铺提升动作",
                    f"综合评分 {store.score}，低于合成运营阈值。",
                    ["复盘近三日进店转化", "调整店前主推品和活动露出", "安排楼层运营做一次到店诊断"],
                    "提升进店转化和评分稳定性。",
                    [f"score={store.score}", f"grade={store.grade}"],
                )
            )
        if store.entryRate < 20:
            items.append(
                _advice(
                    store,
                    "traffic",
                    "high" if request.scenarioDensity == "surge" else "medium",
                    "加强店前导流",
                    f"进店率 {store.entryRate}% 偏低，店前客流未充分转化。",
                    ["优化入口视觉锚点", "在相邻热区布置轻量活动", "检查导视与橱窗信息是否清晰"],
                    "把周边客流转化为实际进店。",
                    [f"entryRate={store.entryRate}%", f"density={request.scenarioDensity}"],
                )
            )
        if store.avgDwellTime < 12:
            items.append(
                _advice(
                    store,
                    "dwell",
                    "medium",
                    "提升停留体验",
                    f"平均停留 {store.avgDwellTime} 分钟，体验深度不足。",
                    ["增加试用/试吃/互动点", "调整高频品陈列路径", "设计两件套或组合推荐"],
                    "拉长有效停留时间，改善后续转化。",
                    [f"avgDwellTime={store.avgDwellTime}m"],
                )
            )
        if store.score >= 88 and not store.hasWarning:
            items.append(
                _advice(
                    store,
                    "category_ops",
                    "low",
                    "复制高表现经验",
                    f"该店评分 {store.score}，可作为同业态参考样本。",
                    ["记录陈列和活动节奏", "提炼可复用话术", "与同楼层同业态店铺做对照"],
                    "形成可复用运营模板。",
                    [f"score={store.score}", f"category={store.category}"],
                )
            )

    items.sort(key=lambda item: (PRIORITY_RANK[item.priority], item.storeId, item.id))
    return items[:12]


def generate_llm_advice(request: StoreManagementAdviceRequestDto, settings: LlmSettings) -> list[StoreManagementAdviceDto]:
    payload = {
        "model": settings.model,
        "temperature": 0.2,
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system",
                "content": (
                    "You generate synthetic mall store management advice as JSON only. "
                    "Do not invent real data sources, faces, members, phones, trajectories, videos, orders, or payments. "
                    "Return {\"items\": [...]} using fields id, storeId, priority, category, title, reason, actions, expectedImpact, evidence, source."
                ),
            },
            {"role": "user", "content": json.dumps(request.model_dump(), ensure_ascii=False)},
        ],
    }
    content = _post_chat_completion(settings, payload)
    parsed = json.loads(content)
    items = parsed.get("items", [])
    return [StoreManagementAdviceDto(**{**item, "source": "llm"}) for item in items][:12]


def _post_chat_completion(settings: LlmSettings, payload: dict[str, Any]) -> str:
    url = f"{settings.base_url.rstrip('/')}/chat/completions"
    headers = {"Authorization": f"Bearer {settings.api_key}", "Content-Type": "application/json"}
    with httpx.Client(timeout=8.0) as client:
        response = client.post(url, headers=headers, json=payload)
        response.raise_for_status()
        body = response.json()
    return str(body["choices"][0]["message"]["content"])


def _advice(
    store: StoreAdviceInputDto,
    category: str,
    priority: str,
    title: str,
    reason: str,
    actions: list[str],
    expected_impact: str,
    evidence: list[str],
) -> StoreManagementAdviceDto:
    return StoreManagementAdviceDto(
        id=f"adv_{store.storeId}_{category}_{priority}",
        storeId=store.storeId,
        priority=priority,  # type: ignore[arg-type]
        category=category,  # type: ignore[arg-type]
        title=title,
        reason=reason,
        actions=actions,
        expectedImpact=expected_impact,
        evidence=evidence,
        source="rule",
    )


def _response(
    status: str,
    source: str,
    items: list[StoreManagementAdviceDto],
    settings: LlmSettings,
    reason: str | None,
) -> StoreManagementAdviceResponseDto:
    return StoreManagementAdviceResponseDto(
        status=status,  # type: ignore[arg-type]
        source=source,  # type: ignore[arg-type]
        items=items,
        llm=LlmAdviceStateDto(
            enabled=settings.enabled,
            configured=settings.is_configured,
            provider=settings.provider,
            model=settings.model or None,
            reason=reason,
        ),
        privacyNote="Synthetic aggregate advice only. No face images, member IDs, phone numbers, real video, orders, payments, or individual trajectories are accepted or stored.",
    )
