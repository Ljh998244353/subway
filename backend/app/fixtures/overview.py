from app.schemas.overview import FloorSummaryDto, OverviewDto, OverviewMetricDto, TrafficTrendPointDto


OVERVIEW_BY_MALL_ID = {
    "mall_demo_001": OverviewDto(
        mallId="mall_demo_001",
        generatedAt="2026-05-19T10:30:00+08:00",
        source="synthetic_fixture",
        metrics=[
            OverviewMetricDto(
                id="current-occupancy",
                label="Current occupancy",
                value=356,
                unit="people",
                status="normal",
                trendDelta=4.8,
                timeWindow="current",
                description="Synthetic current people count across demo floors.",
            ),
            OverviewMetricDto(
                id="today-traffic",
                label="Today traffic",
                value=4820,
                unit="visits",
                status="normal",
                trendDelta=8.1,
                timeWindow="today",
                description="Synthetic accumulated entry count for the demo mall.",
            ),
            OverviewMetricDto(
                id="crowding-index",
                label="Crowding index",
                value=0.42,
                unit="",
                status="normal",
                trendDelta=-0.03,
                timeWindow="current",
                description="Synthetic ratio of occupancy to floor warning thresholds.",
            ),
            OverviewMetricDto(
                id="open-alerts",
                label="Open alerts",
                value=2,
                unit="alerts",
                status="warning",
                trendDelta=-1,
                timeWindow="today",
                description="Synthetic unresolved low-efficiency alerts.",
            ),
        ],
        trafficTrend=[
            TrafficTrendPointDto(
                timestamp="2026-05-19T10:00:00+08:00",
                currentOccupancy=210,
                todayTrafficDelta=680,
                crowdingIndex=0.28,
            ),
            TrafficTrendPointDto(
                timestamp="2026-05-19T11:00:00+08:00",
                currentOccupancy=294,
                todayTrafficDelta=920,
                crowdingIndex=0.36,
            ),
            TrafficTrendPointDto(
                timestamp="2026-05-19T12:00:00+08:00",
                currentOccupancy=356,
                todayTrafficDelta=1210,
                crowdingIndex=0.42,
            ),
        ],
        floorSummaries=[
            FloorSummaryDto(floorId="floor_demo_l1", floorName="L1", traffic=2860, crowdingIndex=0.46, alertCount=1),
            FloorSummaryDto(floorId="floor_demo_l2", floorName="L2", traffic=1960, crowdingIndex=0.37, alertCount=1),
        ],
        inefficientStoreIds=["store_demo_101"],
        alertIds=["alert_demo_001", "alert_demo_002"],
    )
}


def get_overview(mall_id: str) -> OverviewDto | None:
    return OVERVIEW_BY_MALL_ID.get(mall_id)
