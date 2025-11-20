# 🚀 Quick Start Guide

Get the Content Management Module running in **5 minutes** on any computer with Node.js.

## What You Need

✅ Node.js 18+ installed  
✅ Two terminal windows  
✅ Web browser  

**That's it!** No MySQL required for quick start.

---

## 5-Minute Setup

### Terminal 1 - Backend

```bash
# 1. Go to backend folder
cd backend

# 2. Install dependencies (only first time)
npm install

# 3. Start server with mock database
MOCK_DB=true npm start
```

**Windows users:**
```cmd
set MOCK_DB=true && npm start
```

You should see:
```
✅ Mock database ready
🚀 Server is running on http://localhost:5000
```

---

### Terminal 2 - Frontend

```bash
# 1. Go to frontend folder
cd frontend

# 2. Install dependencies (only first time)
npm install

# 3. Start development server
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

---

## 🎉 Done!

**Open your browser to:** http://localhost:5173

You should see the Content Management dashboard with:
- Modern navigation bar
- Content list with sample items
- Search and filter functionality
- Professional SaaS design

---

## Test the Application

### Add Content
1. Click "Add Content" in the navigation
2. Fill in the form fields
3. Click "Publish entry"
4. See success notification

### Edit Content
1. Click "Edit" on any content card
2. Modify the fields
3. Click "Save changes"
4. See success notification

### Delete Content
1. Click "Delete" on any content card
2. Confirm in the modal
3. See success notification

---

## Stop the Application

**Terminal 1 (Backend):** Press `Ctrl + C`  
**Terminal 2 (Frontend):** Press `Ctrl + C`

---

## What's Next?

### Use Real MySQL Database

See `README.md` → "Full Setup (With MySQL Database)"

### Run Tests

```bash
cd backend
npm test
```

### Build for Production

```bash
cd frontend
npm run build
```

### Learn More

- **Full Documentation**: See `README.md`
- **UI Design Details**: See `UI_STYLING_SUMMARY.md`
- **Verification Guide**: See `SETUP_VERIFICATION.md`

---

## Troubleshooting

### Port Already in Use?

**Backend:**
```bash
PORT=5001 MOCK_DB=true npm start
```

**Frontend:** Vite will auto-select next available port

### Cannot Find Module?

```bash
# Reinstall dependencies
cd backend && npm install
cd ../frontend && npm install
```

### API Not Responding?

1. Check backend is running: http://localhost:5000/api/health
2. Should return: `{"status":"ok"}`

---

## Features to Try

✨ **Search**: Type in the search box to filter content  
🎯 **Filter**: Select content type (Video, Lecture, PDF)  
📝 **Forms**: Professional validation with helpful errors  
🎨 **Design**: Hover effects, smooth transitions, modern UI  
📱 **Responsive**: Try resizing your browser  
🔔 **Notifications**: Success/error toasts for all actions  

---

**Enjoy building with the Content Management Module!** 🎊
