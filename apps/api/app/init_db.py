import asyncio
from sqlalchemy import select

from app.db.session import engine, Base, AsyncSessionLocal
from app.models.user import User
from app.models.match import Match
from app.models.scrim import Scrim
from app.core import security
from app.core.config import settings

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        result = await db.execute(select(User).where(User.email == "admin@example.com"))
        user = result.scalars().first()
        if not user:
            user = User(
                email="admin@example.com",
                hashed_password=security.get_password_hash("password"),
                is_superuser=True,
            )
            db.add(user)
            await db.commit()
            print("Superuser created")
        else:
            print("Superuser already exists")

if __name__ == "__main__":
    asyncio.run(init_db())
