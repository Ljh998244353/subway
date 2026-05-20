# Alembic Migrations

P4-I3 uses Alembic in offline-first mode. The initial revision imports SQLAlchemy metadata from `backend/app/db/metadata.py` and can generate MySQL SQL without connecting to a real database.

Generate offline SQL from the repository root:

```bash
backend/.venv/Scripts/python.exe -m alembic -c backend/alembic.ini upgrade head --sql
```

P4-I3 does not create a real MySQL service, credentials, Docker Compose file, or production deployment.
