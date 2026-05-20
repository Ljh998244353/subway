from io import StringIO
from pathlib import Path
from contextlib import redirect_stdout

from alembic import command
from alembic.config import Config

from app.db.metadata import EXPECTED_TABLES, metadata


ROOT = Path(__file__).resolve().parents[2]


def test_metadata_contains_p4_baseline_tables() -> None:
    expected = {
        "mall",
        "floor",
        "store_category",
        "store",
        "camera",
        "camera_roi",
        "camera_line",
        "person_detection_event",
        "store_enter_event",
        "store_exit_event",
        "store_visit_session",
        "consume_event",
        "trajectory_event",
        "heatmap_event",
        "store_flow_stat",
        "store_dwell_stat",
        "store_conversion_stat",
        "customer_profile_stat",
        "floor_flow_stat",
        "node_flow_stat",
        "store_score_stat",
        "store_alert",
        "user",
        "role",
        "permission",
        "user_role",
        "operation_log",
    }

    assert set(EXPECTED_TABLES) == expected
    assert set(metadata.tables) == expected


def test_metadata_keeps_sensitive_identity_fields_out() -> None:
    blocked_tokens = {
        "face",
        "phone",
        "id_card",
        "identity",
        "member_id",
        "raw_frame",
        "image",
        "video_url",
    }

    for table in metadata.tables.values():
        for column in table.columns:
            lowered = column.name.lower()
            assert not any(token in lowered for token in blocked_tokens), f"{table.name}.{column.name}"


def test_key_quality_constraints_exist() -> None:
    assert "score" in metadata.tables["store_score_stat"].c
    assert "conversion_rate" in metadata.tables["store_conversion_stat"].c
    assert "event_id" in metadata.tables["person_detection_event"].c
    assert metadata.tables["person_detection_event"].c.event_id.primary_key
    assert metadata.tables["store_enter_event"].c.event_id.primary_key
    assert metadata.tables["store_exit_event"].c.event_id.primary_key


def test_alembic_offline_sql_contains_mysql_baseline() -> None:
    config = Config(str(ROOT / "backend" / "alembic.ini"))
    output = StringIO()

    with redirect_stdout(output):
        command.upgrade(config, "head", sql=True)

    sql = output.getvalue().lower()
    assert "create table mall" in sql
    assert "create table person_detection_event" in sql
    assert "create table store_score_stat" in sql
    assert "create table operation_log" in sql
    assert "mysql" in config.get_main_option("sqlalchemy.url")
    assert "face" not in sql
    assert "phone" not in sql
