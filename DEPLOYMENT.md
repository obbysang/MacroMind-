# Deployment & Rollback Strategy

## Deployment Pipeline

The application is structured as a monorepo with `apps/web` (Next.js) and `apps/api` (FastAPI).

### Web (Frontend)
1.  **Build**: `cd apps/web && npm run build`
2.  **Test**: `cd apps/web && npm test`
3.  **Deploy**: Vercel (recommended) or Docker container.

### API (Backend)
1.  **Test**: `cd apps/api && pytest`
2.  **Build**: Docker image `apps/api/Dockerfile` (to be created if missing).
3.  **Deploy**: Cloud Run, AWS ECS, or similar.

## Rollback Procedures

### Automated Rollback (Vercel/Cloud Platforms)
-   Most modern platforms support instant rollback to the previous immutable deployment.
-   **Action**: Click "Rollback" in the dashboard.

### Manual Rollback
If deploying via custom scripts:
1.  **Identify last stable commit/tag**.
2.  **Revert**: `git revert HEAD` or checkout the specific tag.
3.  **Redeploy**: Run the deployment pipeline again.

## Monitoring
-   **Frontend**: Sentry for error tracking.
-   **Backend**: Prometheus/Grafana or Datadog.
