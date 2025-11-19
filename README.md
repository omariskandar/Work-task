# Mini Content Management Module

Full-stack implementation of the task described in `FullStack_Test_Task.pdf`. The project contains a backend REST API built with Express/MySQL and a React + Tailwind frontend for managing content items.

```
.
├── backend      # Express API
├── frontend     # React UI (Vite)
└── database     # SQL schema + seed data
```

## Requirements

- Node.js 18+
- npm 10+
- MySQL 8+ (or MariaDB 10+) if you want to run the API against a real database

## Backend Setup

```bash
cd backend
npm install
```

### Configure the database

1. Ensure MySQL is running locally and create a database user with access to the `content_management` schema.
2. Run the schema + seed file:

   ```bash
   mysql -u <user> -p < database/schema.sql
   ```

3. Copy `.env.example` to `.env` (create one if it does not exist yet) and set:

   ```env
   DB_HOST=localhost
   DB_USER=<your user>
   DB_PASSWORD=<your password>
   DB_NAME=content_management
   DB_PORT=3306
   PORT=5000
   ```

### Start the API

```bash
npm start
```

Available endpoints:

- `GET /api/health`
- `GET /api/content`
- `POST /api/content`
- `PUT /api/content/:id`
- `DELETE /api/content/:id`

#### Running without MySQL

For environments where MySQL is not available you can enable the in-memory mock database:

```bash
MOCK_DB=true node server.js
```

> Note: the mock DB is intended only for local testing/demo. Data resets every time the process restarts.

### Automated endpoint tests

```bash
npm test
```

This runs the mocked integration tests that cover all API routes and validation paths.

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` (or `.env.local`) with the backend URL (defaults to `http://localhost:5000`):

```
VITE_API_BASE_URL=http://localhost:5000
```

Run the development server:

```bash
npm run dev
```

The UI provides:

- List of all content items with edit/delete actions
- Form to add a content item (title, description, type, URL, author, optional uploaded file)
- Ability to edit an existing item
- Responsive layout with navigation bar and footer

## Building for production

Frontend:

```bash
cd frontend
npm run build
```

Backend can be deployed as a standard Node.js server once environment variables are set.

## Zipping for delivery

When you are ready to hand in the assignment, zip the repository root so the archive contains `/backend`, `/frontend`, `/database`, `README.md`, and the original PDF:

```bash
cd ..
zip -r MiniCMS.zip Work-task
```

This matches the structure requested in the instructions.
