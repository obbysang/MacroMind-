# MacroMind API

Backend for the MacroMind application, built with FastAPI, SQLAlchemy, and Python.

## Features

- **FastAPI**: High performance, easy to learn, fast to code, ready for production.
- **SQLAlchemy**: Database ORM with async support.
- **Authentication**: JWT based authentication.
- **Pydantic**: Data validation and settings management.
- **Testing**: Pytest with async support.

## Setup

1.  **Create a virtual environment**:
    ```bash
    python -m venv .venv
    ```

2.  **Activate the virtual environment**:
    - Windows: `.\.venv\Scripts\Activate`
    - Unix: `source .venv/bin/activate`

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment Variables**:
    Copy `.env.example` to `.env` and update the values.
    ```bash
    cp .env.example .env
    ```

## Running the Application

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.
Interactive documentation is available at `http://localhost:8000/docs`.

## Testing

Run tests with pytest:

```bash
pytest
```
