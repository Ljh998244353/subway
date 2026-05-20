from sqlalchemy import (
    JSON,
    CheckConstraint,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    MetaData,
    Numeric,
    String,
    Table,
    Text,
    Time,
    UniqueConstraint,
)

NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=NAMING_CONVENTION)


def utc_created_column() -> Column:
    return Column("created_at", DateTime(timezone=True), nullable=False)


def utc_updated_column() -> Column:
    return Column("updated_at", DateTime(timezone=True), nullable=False)


def utc_deleted_column() -> Column:
    return Column("deleted_at", DateTime(timezone=True), nullable=True)


mall = Table(
    "mall",
    metadata,
    Column("mall_id", String(64), primary_key=True),
    Column("name", String(128), nullable=False),
    Column("timezone", String(64), nullable=False),
    Column("business_open_time", Time, nullable=False),
    Column("business_close_time", Time, nullable=False),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    mysql_engine="InnoDB",
)
Index("ix_mall_deleted_at", mall.c.deleted_at)

floor = Table(
    "floor",
    metadata,
    Column("floor_id", String(64), primary_key=True),
    Column("mall_id", String(64), ForeignKey("mall.mall_id"), nullable=False),
    Column("name", String(64), nullable=False),
    Column("level_no", Integer, nullable=False),
    Column("width", Numeric(10, 2), nullable=False),
    Column("height", Numeric(10, 2), nullable=False),
    Column("crowd_warning_threshold", Integer, nullable=True),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    UniqueConstraint("mall_id", "level_no", name="uq_floor_mall_level"),
    mysql_engine="InnoDB",
)
Index("ix_floor_mall_deleted", floor.c.mall_id, floor.c.deleted_at)

store_category = Table(
    "store_category",
    metadata,
    Column("category_id", String(64), primary_key=True),
    Column("name", String(64), nullable=False),
    Column("parent_category_id", String(64), ForeignKey("store_category.category_id"), nullable=True),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    mysql_engine="InnoDB",
)
Index("ix_store_category_parent", store_category.c.parent_category_id)

store = Table(
    "store",
    metadata,
    Column("store_id", String(64), primary_key=True),
    Column("mall_id", String(64), ForeignKey("mall.mall_id"), nullable=False),
    Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=False),
    Column("category_id", String(64), ForeignKey("store_category.category_id"), nullable=False),
    Column("name", String(128), nullable=False),
    Column("unit_code", String(64), nullable=False),
    Column("area_sqm", Numeric(10, 2), nullable=False),
    Column("status", String(32), nullable=False),
    Column("x", Numeric(10, 2), nullable=False),
    Column("y", Numeric(10, 2), nullable=False),
    Column("width", Numeric(10, 2), nullable=False),
    Column("height", Numeric(10, 2), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    UniqueConstraint("floor_id", "unit_code", name="uq_store_floor_unit"),
    CheckConstraint("area_sqm >= 0", name="area_non_negative"),
    mysql_engine="InnoDB",
)
Index("ix_store_mall_category_status", store.c.mall_id, store.c.category_id, store.c.status)
Index("ix_store_floor_status", store.c.floor_id, store.c.status)

camera = Table(
    "camera",
    metadata,
    Column("camera_id", String(64), primary_key=True),
    Column("mall_id", String(64), ForeignKey("mall.mall_id"), nullable=False),
    Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=False),
    Column("name", String(128), nullable=False),
    Column("input_mode", String(32), nullable=False),
    Column("input_ref", String(255), nullable=True),
    Column("status", String(32), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    mysql_engine="InnoDB",
)
Index("ix_camera_mall_floor_status", camera.c.mall_id, camera.c.floor_id, camera.c.status)

camera_roi = Table(
    "camera_roi",
    metadata,
    Column("roi_id", String(64), primary_key=True),
    Column("camera_id", String(64), ForeignKey("camera.camera_id"), nullable=False),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=True),
    Column("name", String(128), nullable=False),
    Column("polygon_json", JSON, nullable=False),
    Column("purpose", String(32), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    mysql_engine="InnoDB",
)
Index("ix_camera_roi_camera_purpose", camera_roi.c.camera_id, camera_roi.c.purpose)
Index("ix_camera_roi_store", camera_roi.c.store_id)

camera_line = Table(
    "camera_line",
    metadata,
    Column("line_id", String(64), primary_key=True),
    Column("camera_id", String(64), ForeignKey("camera.camera_id"), nullable=False),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=True),
    Column("name", String(128), nullable=False),
    Column("start_x", Numeric(10, 4), nullable=False),
    Column("start_y", Numeric(10, 4), nullable=False),
    Column("end_x", Numeric(10, 4), nullable=False),
    Column("end_y", Numeric(10, 4), nullable=False),
    Column("enter_direction", String(32), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    mysql_engine="InnoDB",
)
Index("ix_camera_line_camera_store", camera_line.c.camera_id, camera_line.c.store_id)

person_detection_event = Table(
    "person_detection_event",
    metadata,
    Column("event_id", String(96), primary_key=True),
    Column("camera_id", String(64), ForeignKey("camera.camera_id"), nullable=False),
    Column("track_id", String(96), nullable=False),
    Column("detected_at", DateTime(timezone=True), nullable=False),
    Column("bbox_x", Numeric(10, 4), nullable=False),
    Column("bbox_y", Numeric(10, 4), nullable=False),
    Column("bbox_w", Numeric(10, 4), nullable=False),
    Column("bbox_h", Numeric(10, 4), nullable=False),
    Column("confidence", Numeric(5, 4), nullable=False),
    Column("model_name", String(128), nullable=False),
    Column("model_version", String(64), nullable=False),
    Column("model_license", String(128), nullable=False),
    utc_created_column(),
    CheckConstraint("confidence >= 0 and confidence <= 1", name="confidence_range"),
    mysql_engine="InnoDB",
)
Index("ix_person_detection_camera_time", person_detection_event.c.camera_id, person_detection_event.c.detected_at)
Index("ix_person_detection_track_time", person_detection_event.c.track_id, person_detection_event.c.detected_at)

store_enter_event = Table(
    "store_enter_event",
    metadata,
    Column("event_id", String(96), primary_key=True),
    Column("camera_id", String(64), ForeignKey("camera.camera_id"), nullable=False),
    Column("line_id", String(64), ForeignKey("camera_line.line_id"), nullable=False),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False),
    Column("track_id", String(96), nullable=False),
    Column("occurred_at", DateTime(timezone=True), nullable=False),
    Column("confidence", Numeric(5, 4), nullable=False),
    Column("source_detection_event_id", String(96), ForeignKey("person_detection_event.event_id"), nullable=True),
    utc_created_column(),
    CheckConstraint("confidence >= 0 and confidence <= 1", name="confidence_range"),
    mysql_engine="InnoDB",
)
Index("ix_store_enter_store_time", store_enter_event.c.store_id, store_enter_event.c.occurred_at)
Index("ix_store_enter_track_time", store_enter_event.c.track_id, store_enter_event.c.occurred_at)

store_exit_event = Table(
    "store_exit_event",
    metadata,
    Column("event_id", String(96), primary_key=True),
    Column("camera_id", String(64), ForeignKey("camera.camera_id"), nullable=False),
    Column("line_id", String(64), ForeignKey("camera_line.line_id"), nullable=False),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False),
    Column("track_id", String(96), nullable=False),
    Column("occurred_at", DateTime(timezone=True), nullable=False),
    Column("confidence", Numeric(5, 4), nullable=False),
    Column("source_detection_event_id", String(96), ForeignKey("person_detection_event.event_id"), nullable=True),
    utc_created_column(),
    CheckConstraint("confidence >= 0 and confidence <= 1", name="confidence_range"),
    mysql_engine="InnoDB",
)
Index("ix_store_exit_store_time", store_exit_event.c.store_id, store_exit_event.c.occurred_at)
Index("ix_store_exit_track_time", store_exit_event.c.track_id, store_exit_event.c.occurred_at)

store_visit_session = Table(
    "store_visit_session",
    metadata,
    Column("session_id", String(96), primary_key=True),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False),
    Column("track_id_hash", String(128), nullable=False),
    Column("enter_event_id", String(96), ForeignKey("store_enter_event.event_id"), nullable=True),
    Column("exit_event_id", String(96), ForeignKey("store_exit_event.event_id"), nullable=True),
    Column("entered_at", DateTime(timezone=True), nullable=True),
    Column("exited_at", DateTime(timezone=True), nullable=True),
    Column("dwell_seconds", Integer, nullable=True),
    Column("quality_flag", String(32), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    CheckConstraint("dwell_seconds is null or dwell_seconds >= 0", name="dwell_non_negative"),
    mysql_engine="InnoDB",
)
Index("ix_visit_session_store_entered", store_visit_session.c.store_id, store_visit_session.c.entered_at)
Index("ix_visit_session_quality", store_visit_session.c.quality_flag)

consume_event = Table(
    "consume_event",
    metadata,
    Column("event_id", String(96), primary_key=True),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False),
    Column("occurred_at", DateTime(timezone=True), nullable=False),
    Column("amount_bucket", String(32), nullable=True),
    Column("source", String(32), nullable=False),
    utc_created_column(),
    mysql_engine="InnoDB",
)
Index("ix_consume_store_time", consume_event.c.store_id, consume_event.c.occurred_at)

trajectory_event = Table(
    "trajectory_event",
    metadata,
    Column("event_id", String(96), primary_key=True),
    Column("mall_id", String(64), ForeignKey("mall.mall_id"), nullable=False),
    Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=False),
    Column("track_id_hash", String(128), nullable=False),
    Column("occurred_at", DateTime(timezone=True), nullable=False),
    Column("node_from", String(64), nullable=True),
    Column("node_to", String(64), nullable=True),
    Column("x", Numeric(10, 4), nullable=True),
    Column("y", Numeric(10, 4), nullable=True),
    Column("retention_expires_at", DateTime(timezone=True), nullable=False),
    utc_created_column(),
    mysql_engine="InnoDB",
)
Index("ix_trajectory_floor_time", trajectory_event.c.floor_id, trajectory_event.c.occurred_at)
Index("ix_trajectory_retention", trajectory_event.c.retention_expires_at)

heatmap_event = Table(
    "heatmap_event",
    metadata,
    Column("event_id", String(96), primary_key=True),
    Column("mall_id", String(64), ForeignKey("mall.mall_id"), nullable=False),
    Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=False),
    Column("cell_x", Integer, nullable=False),
    Column("cell_y", Integer, nullable=False),
    Column("intensity", Numeric(10, 4), nullable=False),
    Column("occurred_at", DateTime(timezone=True), nullable=False),
    utc_created_column(),
    CheckConstraint("intensity >= 0", name="intensity_non_negative"),
    mysql_engine="InnoDB",
)
Index("ix_heatmap_floor_time_cell", heatmap_event.c.floor_id, heatmap_event.c.occurred_at, heatmap_event.c.cell_x, heatmap_event.c.cell_y)


def stat_columns(scope_column: Column) -> list[Column]:
    return [
        Column("stat_id", String(96), primary_key=True),
        scope_column,
        Column("window_start", DateTime(timezone=True), nullable=False),
        Column("window_end", DateTime(timezone=True), nullable=False),
        Column("business_date", Date, nullable=False),
        Column("source_version", String(64), nullable=False),
        utc_created_column(),
        utc_updated_column(),
        CheckConstraint("window_end > window_start", name="window_order"),
    ]


store_flow_stat = Table(
    "store_flow_stat",
    metadata,
    *stat_columns(Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False)),
    Column("enter_count", Integer, nullable=False),
    Column("exit_count", Integer, nullable=False),
    Column("inside_estimate", Integer, nullable=False),
    UniqueConstraint("store_id", "window_start", "window_end", name="uq_store_flow_window"),
    CheckConstraint("enter_count >= 0 and exit_count >= 0 and inside_estimate >= 0", name="counts_non_negative"),
    mysql_engine="InnoDB",
)

store_dwell_stat = Table(
    "store_dwell_stat",
    metadata,
    *stat_columns(Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False)),
    Column("avg_dwell_seconds", Numeric(10, 2), nullable=False),
    Column("median_dwell_seconds", Numeric(10, 2), nullable=False),
    Column("sample_count", Integer, nullable=False),
    UniqueConstraint("store_id", "window_start", "window_end", name="uq_store_dwell_window"),
    CheckConstraint("avg_dwell_seconds >= 0 and median_dwell_seconds >= 0 and sample_count >= 0", name="dwell_counts_non_negative"),
    mysql_engine="InnoDB",
)

store_conversion_stat = Table(
    "store_conversion_stat",
    metadata,
    *stat_columns(Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False)),
    Column("enter_count", Integer, nullable=False),
    Column("consume_count", Integer, nullable=False),
    Column("conversion_rate", Numeric(6, 5), nullable=False),
    UniqueConstraint("store_id", "window_start", "window_end", name="uq_store_conversion_window"),
    CheckConstraint("enter_count >= 0 and consume_count >= 0", name="conversion_counts_non_negative"),
    CheckConstraint("conversion_rate >= 0 and conversion_rate <= 1", name="conversion_rate_range"),
    mysql_engine="InnoDB",
)

customer_profile_stat = Table(
    "customer_profile_stat",
    metadata,
    Column("stat_id", String(96), primary_key=True),
    Column("mall_id", String(64), ForeignKey("mall.mall_id"), nullable=False),
    Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=True),
    Column("business_date", Date, nullable=False),
    Column("segment_type", String(64), nullable=False),
    Column("segment_value", String(64), nullable=False),
    Column("visitor_count", Integer, nullable=False),
    Column("ratio", Numeric(6, 5), nullable=False),
    Column("source_version", String(64), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    UniqueConstraint("mall_id", "floor_id", "business_date", "segment_type", "segment_value", name="uq_customer_profile_segment"),
    CheckConstraint("visitor_count >= 0", name="visitor_count_non_negative"),
    CheckConstraint("ratio >= 0 and ratio <= 1", name="ratio_range"),
    mysql_engine="InnoDB",
)

floor_flow_stat = Table(
    "floor_flow_stat",
    metadata,
    *stat_columns(Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=False)),
    Column("current_people", Integer, nullable=False),
    Column("enter_count", Integer, nullable=False),
    Column("exit_count", Integer, nullable=False),
    Column("crowd_level", String(32), nullable=False),
    UniqueConstraint("floor_id", "window_start", "window_end", name="uq_floor_flow_window"),
    CheckConstraint("current_people >= 0 and enter_count >= 0 and exit_count >= 0", name="floor_counts_non_negative"),
    mysql_engine="InnoDB",
)

node_flow_stat = Table(
    "node_flow_stat",
    metadata,
    Column("stat_id", String(96), primary_key=True),
    Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=False),
    Column("node_from", String(64), nullable=False),
    Column("node_to", String(64), nullable=False),
    Column("window_start", DateTime(timezone=True), nullable=False),
    Column("window_end", DateTime(timezone=True), nullable=False),
    Column("business_date", Date, nullable=False),
    Column("flow_count", Integer, nullable=False),
    Column("source_version", String(64), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    UniqueConstraint("floor_id", "node_from", "node_to", "window_start", "window_end", name="uq_node_flow_window"),
    CheckConstraint("flow_count >= 0", name="flow_count_non_negative"),
    CheckConstraint("window_end > window_start", name="window_order"),
    mysql_engine="InnoDB",
)

store_score_stat = Table(
    "store_score_stat",
    metadata,
    Column("stat_id", String(96), primary_key=True),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False),
    Column("business_date", Date, nullable=False),
    Column("score_version", String(64), nullable=False),
    Column("score", Numeric(5, 2), nullable=False),
    Column("grade", String(8), nullable=False),
    Column("breakdown_json", JSON, nullable=False),
    Column("source_version", String(64), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    UniqueConstraint("store_id", "business_date", "score_version", name="uq_store_score_date_version"),
    CheckConstraint("score >= 0 and score <= 100", name="score_range"),
    mysql_engine="InnoDB",
)

store_alert = Table(
    "store_alert",
    metadata,
    Column("alert_id", String(96), primary_key=True),
    Column("mall_id", String(64), ForeignKey("mall.mall_id"), nullable=False),
    Column("floor_id", String(64), ForeignKey("floor.floor_id"), nullable=False),
    Column("store_id", String(64), ForeignKey("store.store_id"), nullable=False),
    Column("type", String(64), nullable=False),
    Column("severity", String(32), nullable=False),
    Column("status", String(32), nullable=False),
    Column("detected_at", DateTime(timezone=True), nullable=False),
    Column("resolved_at", DateTime(timezone=True), nullable=True),
    Column("summary", String(255), nullable=False),
    Column("evidence_json", JSON, nullable=False),
    utc_created_column(),
    utc_updated_column(),
    mysql_engine="InnoDB",
)
Index("ix_store_alert_mall_status_severity_time", store_alert.c.mall_id, store_alert.c.status, store_alert.c.severity, store_alert.c.detected_at)
Index("ix_store_alert_store_time", store_alert.c.store_id, store_alert.c.detected_at)
Index("ix_store_alert_type", store_alert.c.type)

user = Table(
    "user",
    metadata,
    Column("user_id", String(64), primary_key=True),
    Column("username", String(128), nullable=False),
    Column("password_hash", String(255), nullable=False),
    Column("status", String(32), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    utc_deleted_column(),
    UniqueConstraint("username", name="uq_user_username"),
    mysql_engine="InnoDB",
)

role = Table(
    "role",
    metadata,
    Column("role_id", String(64), primary_key=True),
    Column("code", String(64), nullable=False),
    Column("name", String(128), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    UniqueConstraint("code", name="uq_role_code"),
    mysql_engine="InnoDB",
)

permission = Table(
    "permission",
    metadata,
    Column("permission_id", String(64), primary_key=True),
    Column("code", String(128), nullable=False),
    Column("resource", String(64), nullable=False),
    Column("action", String(64), nullable=False),
    utc_created_column(),
    utc_updated_column(),
    UniqueConstraint("code", name="uq_permission_code"),
    mysql_engine="InnoDB",
)

user_role = Table(
    "user_role",
    metadata,
    Column("user_id", String(64), ForeignKey("user.user_id"), primary_key=True),
    Column("role_id", String(64), ForeignKey("role.role_id"), primary_key=True),
    utc_created_column(),
    mysql_engine="InnoDB",
)

operation_log = Table(
    "operation_log",
    metadata,
    Column("log_id", String(96), primary_key=True),
    Column("user_id", String(64), ForeignKey("user.user_id"), nullable=True),
    Column("action", String(128), nullable=False),
    Column("resource_type", String(64), nullable=False),
    Column("resource_id", String(96), nullable=True),
    Column("trace_id", String(96), nullable=False),
    Column("details_json", JSON, nullable=True),
    utc_created_column(),
    mysql_engine="InnoDB",
)
Index("ix_operation_log_trace", operation_log.c.trace_id)
Index("ix_operation_log_user_time", operation_log.c.user_id, operation_log.c.created_at)

EXPECTED_TABLES = tuple(metadata.tables.keys())
