AI Production Rules – No Mocks, Env-Driven APIs

Project: MacroMind – AI-Powered Assistant Coach for Competitive Esports

1. Purpose

This document enforces production-only behavior for AI-assisted development tools (Cursor, Junie, Copilot, etc.).

The AI must:

generate production-ready code only

never introduce mock, fake, or placeholder data

never hardcode external service details

always source integrations from environment configuration

These rules override convenience, demos, and prototyping behavior.

2. Absolute Rule: No Mock Data
The AI MUST NOT:

Create mock datasets

Create fake users, matches, events, or metrics

Add sample JSON responses

Add fallback hardcoded data

Simulate API responses inside code

Use “TODO: replace with real data” patterns

This includes:

development mode

local testing

UI placeholders

unit tests (unless explicitly requested)

If real data is not available, the AI must fail explicitly.

3. Required Behavior When Data Is Missing

When a feature requires external data that is not yet wired:

The AI MUST:

Define a clear interface

Implement proper error handling

Return explicit errors such as:

DataSourceNotConfiguredError

MissingExternalDependencyError

Document required environment variables

The AI MUST NOT:

Fill gaps with mock data

Guess data formats

Invent schemas

4. External APIs & Integrations
Mandatory Rules

For any external API (GRID, analytics, auth, storage, etc.):

API base URLs must come from environment variables

API keys must come from environment variables

Timeouts and retries must be configurable

No credentials may exist in code or config files

Required Pattern
import os

GRID_API_BASE_URL = os.getenv("GRID_API_BASE_URL")
GRID_API_KEY = os.getenv("GRID_API_KEY")

if not GRID_API_BASE_URL or not GRID_API_KEY:
    raise RuntimeError("GRID API configuration is missing")


Hardcoding any of the following is forbidden:

URLs

tokens

secrets

organization IDs

account identifiers

5. .env Configuration Rules
The AI MUST:

Assume .env is the single source of truth for:

API endpoints

credentials

feature flags

Clearly document required variables in code comments or docs

Fail fast if required variables are missing

The AI MUST NOT:

Commit .env files

Reference .env.example values directly

Provide default secrets or API keys

6. Production-First Error Handling

If a production dependency is unavailable:

The system must:

log the error

return a safe, explicit failure

The system must not:

silently degrade

substitute fake data

mask errors

Example:

if not response.ok:
    logger.error("GRID API request failed", extra={...})
    raise ExternalServiceError("Failed to fetch match data")

7. Tests & Validation Rules
Default Behavior

Do not generate mock-heavy tests

Do not stub external services automatically

When Tests Are Requested Explicitly

Use interface-based testing

Prefer contract tests

Require explicit user approval before introducing mocks

If the user does not explicitly ask for mocks:

Do not create them.

8. Frontend Data Rules

The frontend must assume real API responses only

No placeholder charts or fake timelines

Loading states are acceptable

Empty states must reflect real “no data” scenarios

9. Refusal Clause (Critical)

If a request implies:

mock data usage

fake responses

demo-only shortcuts

The AI must:

Refuse to implement the request as stated

Explain why it violates production rules

Offer a production-safe alternative

10. Enforcement Summary

The AI must behave as if:

“This code will be deployed to a real esports organization tomorrow.”

No demos.
No mocks.
No shortcuts.

Only production-grade, environment-configured implementations are allowed.

11. Final Instruction to AI

When uncertain, default to:

explicit failure

configuration-driven behavior

clear documentation

Never default to mock data.