import pytest
from httpx import AsyncClient
from datetime import datetime, timedelta
from app.main import app
from app.api import deps

class MockUser:
    id = 1
    email = "test@coach.com"
    is_active = True

async def override_get_current_active_user():
    return MockUser()

@pytest.mark.asyncio
async def test_create_scrim(client: AsyncClient):
    app.dependency_overrides[deps.get_current_active_user] = override_get_current_active_user
    
    payload = {
        "team_name": "Test Team",
        "date": (datetime.now() + timedelta(days=1)).isoformat(),
        "notes": "Test Notes",
        "is_confirmed": False
    }
    
    response = await client.post("/api/v1/scrims/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["team_name"] == "Test Team"
    assert data["id"] is not None

@pytest.mark.asyncio
async def test_read_scrims(client: AsyncClient):
    app.dependency_overrides[deps.get_current_active_user] = override_get_current_active_user
    
    # Create a scrim first
    payload = {
        "team_name": "Test Team",
        "date": (datetime.now() + timedelta(days=1)).isoformat(),
        "notes": "Test Notes"
    }
    await client.post("/api/v1/scrims/", json=payload)
    
    response = await client.get("/api/v1/scrims/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

@pytest.mark.asyncio
async def test_update_scrim(client: AsyncClient):
    app.dependency_overrides[deps.get_current_active_user] = override_get_current_active_user
    
    # Create
    payload = {
        "team_name": "Test Team",
        "date": (datetime.now() + timedelta(days=1)).isoformat()
    }
    create_res = await client.post("/api/v1/scrims/", json=payload)
    scrim_id = create_res.json()["id"]
    
    # Update
    update_payload = {"team_name": "Updated Team"}
    response = await client.put(f"/api/v1/scrims/{scrim_id}", json=update_payload)
    assert response.status_code == 200
    assert response.json()["team_name"] == "Updated Team"

@pytest.mark.asyncio
async def test_delete_scrim(client: AsyncClient):
    app.dependency_overrides[deps.get_current_active_user] = override_get_current_active_user
    
    # Create
    payload = {
        "team_name": "Test Team",
        "date": (datetime.now() + timedelta(days=1)).isoformat()
    }
    create_res = await client.post("/api/v1/scrims/", json=payload)
    scrim_id = create_res.json()["id"]
    
    # Delete
    response = await client.delete(f"/api/v1/scrims/{scrim_id}")
    assert response.status_code == 200
    
    # Verify gone
    get_res = await client.get("/api/v1/scrims/")
    scrims = get_res.json()
    assert not any(s["id"] == scrim_id for s in scrims)
