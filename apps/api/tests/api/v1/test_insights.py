import pytest
from httpx import AsyncClient
from app.main import app
from app.api import deps

class MockUser:
    id = 1
    email = "test@coach.com"
    is_active = True

async def override_get_current_active_user():
    return MockUser()

@pytest.mark.asyncio
async def test_read_insights(client: AsyncClient):
    app.dependency_overrides[deps.get_current_active_user] = override_get_current_active_user
    response = await client.get("/api/v1/insights/")
    app.dependency_overrides.clear()
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "description" in data[0]
    assert "impactValue" in data[0]
