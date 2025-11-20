# Setup Verification Guide

This document helps you verify that the Content Management Module is properly set up and running.

## Prerequisites Check

Before starting, verify you have Node.js installed:

```bash
node --version
# Should show v18.x.x or higher
```

```bash
npm --version
# Should show 9.x.x or higher
```

## Quick Setup Test (Mock Database)

Follow these steps to verify the application runs correctly:

### Step 1: Verify Project Structure

```bash
ls -la
```

You should see:
- `backend/` directory
- `frontend/` directory
- `database/` directory
- `README.md` file

### Step 2: Backend Setup Test

```bash
cd backend
npm install
```

Expected output: Installation completes without errors.

### Step 3: Start Backend (Mock Mode)

```bash
MOCK_DB=true npm start
```

**Expected Output:**
```
📦 Using mock in-memory database (MOCK_DB=true)
✅ Mock database ready (no real MySQL connection needed)
🚀 Server is running on http://localhost:5000
📡 API endpoints available at http://localhost:5000/api/content
```

**Windows users:**
```cmd
set MOCK_DB=true && npm start
```

### Step 4: Test API Health (in a new terminal)

```bash
curl http://localhost:5000/api/health
```

**Expected Output:**
```json
{"status":"ok","timestamp":"2024-...","database":"mock"}
```

Or visit in browser: `http://localhost:5000/api/health`

### Step 5: Test Content Endpoint

```bash
curl http://localhost:5000/api/content
```

**Expected Output:** JSON array with sample content items.

### Step 6: Frontend Setup Test

In a **new terminal**:

```bash
cd frontend
npm install
```

Expected output: Installation completes without errors.

### Step 7: Start Frontend

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 8: Open Application in Browser

Navigate to: `http://localhost:5173`

**You should see:**
- Modern navigation bar with "Content Manager" branding
- Dashboard showing content items
- Search bar and filter dropdown
- Sample content cards (if mock DB has seed data)
- Clean, professional SaaS design

### Step 9: Test CRUD Operations

1. **Create**: Click "Add Content" link → Fill form → Submit
   - Should see success toast
   - New item appears in list

2. **Read**: View the content cards on the dashboard
   - Should display title, author, description, type badge

3. **Update**: Click "Edit" on a content card → Modify fields → Save
   - Should see success toast
   - Changes reflected immediately

4. **Delete**: Click "Delete" on a content card → Confirm
   - Should see confirmation modal
   - Item removed from list after confirmation

## Full MySQL Setup Test

If you want to test with a real MySQL database:

### Step 1: Verify MySQL is Running

```bash
mysql --version
```

```bash
mysql -u root -p -e "SELECT VERSION();"
```

### Step 2: Load Database Schema

```bash
mysql -u root -p < database/schema.sql
```

Expected: No errors, database created.

### Step 3: Verify Database

```bash
mysql -u root -p -e "USE content_management; SHOW TABLES;"
```

**Expected Output:**
```
+-------------------------------+
| Tables_in_content_management  |
+-------------------------------+
| content                       |
+-------------------------------+
```

### Step 4: Configure Backend

Edit `backend/.env`:
```env
MOCK_DB=false
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=content_management
```

### Step 5: Restart Backend

```bash
cd backend
npm start
```

**Expected Output:**
```
✅ Connected to MySQL database: content_management
🚀 Server is running on http://localhost:5000
```

## Running Tests

### Backend API Tests

```bash
cd backend
npm test
```

**Expected Output:**
```
Content Management API Tests
  ✓ GET /api/health should return status ok
  ✓ GET /api/content should return array of content
  ✓ POST /api/content should create new content
  ✓ PUT /api/content/:id should update content
  ✓ DELETE /api/content/:id should delete content
  ✓ POST /api/content should validate required fields
  ✓ POST /api/content should validate URL format

  7 passing (XXXms)
```

## Troubleshooting Checklist

### ❌ "Cannot find module" errors

**Solution:**
```bash
cd backend && npm install
cd ../frontend && npm install
```

### ❌ "Port 5000 already in use"

**Solution:**
```bash
# Use different port
PORT=5001 MOCK_DB=true npm start

# Update frontend .env
echo "VITE_API_URL=http://localhost:5001/api" > frontend/.env
```

### ❌ "ECONNREFUSED" errors in browser

**Causes:**
1. Backend not running
2. Wrong API URL in frontend

**Solution:**
1. Ensure backend is running: `http://localhost:5000/api/health`
2. Check `frontend/.env` has correct API URL

### ❌ MySQL connection errors

**Solution:**
1. Verify MySQL is running
2. Check credentials in `backend/.env`
3. Use mock mode: `MOCK_DB=true npm start`

### ❌ Blank page in browser

**Causes:**
1. Frontend not compiled
2. JavaScript errors

**Solution:**
1. Check browser console for errors (F12)
2. Restart frontend dev server: `npm run dev`
3. Clear browser cache and reload

## Success Criteria

✅ Backend starts without errors  
✅ API health endpoint returns `{"status":"ok"}`  
✅ Frontend loads at http://localhost:5173  
✅ Can view content list  
✅ Can add new content  
✅ Can edit existing content  
✅ Can delete content  
✅ Tests pass with `npm test`  
✅ UI is responsive and professional  

## Next Steps

Once verification is complete:

1. **Explore the UI**: Test all features
2. **Review the Code**: Check implementation details
3. **Run Tests**: Ensure quality
4. **Build for Production**: `npm run build` in frontend
5. **Read Documentation**: See `README.md` and `UI_STYLING_SUMMARY.md`

---

**Need Help?**

- Check the main `README.md` for detailed setup instructions
- Review `UI_STYLING_SUMMARY.md` for design system details
- Ensure all prerequisites are installed
- Try mock database mode first before MySQL setup
