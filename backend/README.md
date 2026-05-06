# SuperPlaced AI Backend

This backend provides AI agent routes, Supabase integration, and CSV ingestion for the SuperPlaced AI platform.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

## API routes

- `GET /health`
- `POST /api/agents/resume/analyze`
- `POST /api/agents/skillgap/analyze`
- `POST /api/agents/interview/start`
- `POST /api/agents/interview/respond`
- `GET /api/agents/interview/results/:id`
- `POST /api/agents/jobs/match`
- `POST /api/jobs/upload-csv`
