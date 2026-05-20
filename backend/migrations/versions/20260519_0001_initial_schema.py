"""initial MySQL schema baseline

Revision ID: 20260519_0001
Revises:
Create Date: 2026-05-19
"""

from alembic import op

from app.db.metadata import metadata

revision = "20260519_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    metadata.create_all(bind=op.get_bind())


def downgrade() -> None:
    metadata.drop_all(bind=op.get_bind())
