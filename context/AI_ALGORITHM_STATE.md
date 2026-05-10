# AI Algorithm State

更新时间：2026-05-10

## 当前状态

尚未创建 `ai-services/` 工程，尚未选择具体模型权重或数据集。

## 计划能力

```text
video ingestion
person detection
tracking
ROI counting
line-crossing direction detection
event output
synthetic fixture validation
```

## 合规约束

```text
不使用真实监控画面
不存储人脸原图
不展示个人轨迹
不使用来源不明模型权重
不使用许可证不清晰数据集
```

## AI 输出审计字段

```text
model name
model version
license
thresholds
input source
output schema
FPS
accuracy or validation notes
limitations
```

## 下一步

P2-I3 不创建 `ai-services/`，不选择模型权重或数据集。P6 前必须先完成模型和数据集许可证审计；P6 使用合成视频或确定性 fixture 验证。
