# Mini Content Management Module

Full-stack implementation of the task described in `FullStack_Test_Task.pdf`. The project contains a backend REST API built with Express/MySQL and a React + Tailwind frontend for managing content items.

```
.
├── backend      # Express API
├── frontend     # React UI (Vite + React + Tailwind CSS)
└── database     # SQL schema + seed data
```

## 📋 Requirements

- **Node.js** 18+ (with npm)
- **MySQL** 8+ (or MariaDB 10+) - **Optional** (can run with in-memory mock DB)

> ✅ **Quick Start**: You can run the entire application without MySQL using the mock database mode (see below).

---

## 🚀 Quick Start (Without MySQL)

The easiest way to run the application on **any computer with Node.js installed**:

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start Backend with Mock Database

```bash
MOCK_DB=true npm start
```

The API will run on `http://localhost:5000`

> **Windows users**: Use `set MOCK_DB=true && npm start`

### 3. Install Frontend Dependencies

Open a **new terminal**:

```bash
cd frontend
npm install
```

### 4. Start Frontend Development Server

```bash
npm run dev
```

The UI will be available at `http://localhost:5173`

**That's it!** 🎉 Open your browser to `http://localhost:5173` to use the application.

---

## 💾 Full Setup (With MySQL Database)

If you want to use a real MySQL database instead of the mock in-memory database:

### Backend Setup

```bash
cd backend
npm install
```

### Configure the Database

1. Ensure MySQL is running locally

2. Run the schema + seed file from the project root:

   ```bash
   mysql -u root -p < database/schema.sql
   ```

   This will create the `content_management` database and seed it with sample data.

3. Create `.env` file in the `backend` directory:

   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and set your database credentials:

   ```env
   PORT=5000
   
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=content_management
   DB_USER=root
   DB_PASSWORD=your_password_here
   
   # Set to false to use real MySQL
   MOCK_DB=false
   ```

### Start the API

```bash
npm start
```

The server will run on `http://localhost:5000`

### Available API Endpoints

- `GET /api/health` - Health check
- `GET /api/content` - Get all content items
- `GET /api/content/:id` - Get a single content item
- `POST /api/content` - Create new content item
- `PUT /api/content/:id` - Update content item
- `DELETE /api/content/:id` - Delete content item

### Frontend Setup

```bash
cd frontend
npm install
```

The frontend is already configured to use `http://localhost:5000/api` by default.

If you need to change the API URL, create a `.env` file:

```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

Run the development server:

```bash
npm run dev
```

The UI will be available at `http://localhost:5173`

---

## 🧪 Running Tests

### Backend API Tests

```bash
cd backend
npm test
```

This runs automated integration tests that cover all API routes and validation paths using the mock database.

---

## 📦 Building for Production

### Frontend Production Build

```bash
cd frontend
npm run build
```

The optimized static files will be in `frontend/dist/`

### Preview Production Build

```bash
npm run preview
```

### Backend Deployment

The backend can be deployed as a standard Node.js application. Ensure environment variables are properly set on your server.

---

## 🎨 UI Features

The modernized React frontend provides:

- **Dashboard**: List of all content items with search and filtering
- **Add Content**: Form to create new content (title, description, type, URL, author)
- **Edit Content**: Update existing content items
- **Delete Content**: Remove content with confirmation modal
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Professional SaaS design with Palette B color scheme
- **Smooth Animations**: Page transitions and hover effects
- **Toast Notifications**: Success/error feedback for all actions

---

## 🗂️ Project Structure

```
backend/
├── server.js           # Express server entry point
├── routes/
│   └── content.js      # Content API routes
├── db/
│   ├── database.js     # MySQL connection pool
│   └── mockDatabase.js # In-memory mock database
├── .env.example        # Environment variables template
└── package.json

frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Base UI components (buttons, inputs, cards, etc.)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ContentCard.jsx
│   │   └── ModernSelect.jsx
│   ├── pages/          # Page components
│   │   ├── AllContent.jsx
│   │   ├── AddContent.jsx
│   │   └── EditContent.jsx
│   ├── services/       # API service layer
│   │   └── api.js
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── package.json

database/
└── schema.sql          # MySQL schema and seed data
```

---

## 🛠️ Troubleshooting

### Port Already in Use

If port 5000 or 5173 is already in use:

**Backend:**
```bash
PORT=5001 npm start
```

Then update frontend `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

**Frontend:**
```bash
# Vite will automatically use the next available port
npm run dev
```

### MySQL Connection Issues

If you're having trouble connecting to MySQL:

1. Verify MySQL is running: `mysql -u root -p`
2. Check credentials in `.env` file
3. Ensure the database exists: `SHOW DATABASES;`
4. Or use mock database: `MOCK_DB=true npm start`

### Cannot Find Module Errors

Make sure dependencies are installed:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### CORS Errors

The backend is configured to accept requests from `http://localhost:5173`. If you change the frontend port, update the CORS configuration in `backend/server.js`.

---

## 📝 Environment Variables

### Backend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `5000` | No |
| `DB_HOST` | MySQL host | `localhost` | When MOCK_DB=false |
| `DB_PORT` | MySQL port | `3306` | When MOCK_DB=false |
| `DB_NAME` | Database name | `content_management` | When MOCK_DB=false |
| `DB_USER` | Database user | `root` | When MOCK_DB=false |
| `DB_PASSWORD` | Database password | - | When MOCK_DB=false |
| `MOCK_DB` | Use in-memory database | `false` | No |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 📤 Packaging for Delivery

To create a zip file for submission:

```bash
cd ..
zip -r ContentManagement.zip Work-task -x "*/node_modules/*" "*/dist/*" "*/.git/*"
```

This creates a clean archive without dependencies or build artifacts.

---

## 🎯 Features Implemented

✅ Full CRUD operations for content items  
✅ Input validation on both frontend and backend  
✅ RESTful API design with proper HTTP status codes  
✅ Responsive React UI with modern design  
✅ Error handling and user feedback  
✅ Database indexing for performance  
✅ Mock database mode for easy testing  
✅ Automated API tests  
✅ Professional SaaS UI with Palette B design system  
✅ Smooth page transitions and animations  
✅ Search and filter functionality  
✅ Form validation with helpful error messages  
✅ TypeScript-ready component structure  

---

## 🎨 UI Design System

The application uses a modern, professional design system:

- **Color Palette**: Enterprise neutral colors (Palette B)
  - Primary: `#3B82F6` (Blue)
  - Dark: `#0F172A` (Navy)
  - Surface: `#FFFFFF` (White)
  - Background: `#F3F4F6` (Light Gray)
- **Typography**: Inter font family with proper weight hierarchy
- **Spacing**: Consistent 4/8/16/24px scale
- **Border Radius**: 8-12px for modern, clean appearance
- **Shadows**: Subtle elevations for depth
- **Animations**: Smooth 200ms transitions

For detailed UI improvements, see `UI_STYLING_SUMMARY.md`

---

## 📄 License

This project was created as a technical assessment submission.

---

## 👤 Author

Created as part of a full-stack development technical assessment.
