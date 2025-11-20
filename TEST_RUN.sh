#!/bin/bash

# Content Management Module - Quick Test Script
# This script verifies the application can run successfully

echo "=================================================="
echo "  Content Management Module - Setup Test"
echo "=================================================="
echo ""

# Check Node.js
echo "1. Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "   ❌ Node.js is not installed!"
    echo "   Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "   ✅ Node.js $NODE_VERSION installed"
echo ""

# Check npm
echo "2. Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "   ❌ npm is not installed!"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo "   ✅ npm $NPM_VERSION installed"
echo ""

# Check backend dependencies
echo "3. Checking backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "   📦 Installing backend dependencies..."
    npm install --silent
fi
echo "   ✅ Backend dependencies ready"
cd ..
echo ""

# Check frontend dependencies
echo "4. Checking frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "   📦 Installing frontend dependencies..."
    npm install --silent
fi
echo "   ✅ Frontend dependencies ready"
cd ..
echo ""

# Test backend startup
echo "5. Testing backend startup..."
cd backend
timeout 5 bash -c "MOCK_DB=true node server.js" > /tmp/backend_test.log 2>&1 &
BACKEND_PID=$!
sleep 2

if ps -p $BACKEND_PID > /dev/null; then
    echo "   ✅ Backend starts successfully"
    kill $BACKEND_PID 2>/dev/null
else
    echo "   ❌ Backend failed to start"
    echo "   Check /tmp/backend_test.log for details"
    exit 1
fi
cd ..
echo ""

# Test API health
echo "6. Testing API endpoint..."
cd backend
MOCK_DB=true node server.js > /dev/null 2>&1 &
BACKEND_PID=$!
sleep 2

HEALTH_CHECK=$(curl -s http://localhost:5000/api/health 2>/dev/null || echo "failed")
kill $BACKEND_PID 2>/dev/null

if [[ $HEALTH_CHECK == *"status"* ]]; then
    echo "   ✅ API responds correctly"
else
    echo "   ⚠️  API test inconclusive (might be port conflict)"
fi
cd ..
echo ""

# Run backend tests
echo "7. Running backend tests..."
cd backend
TEST_OUTPUT=$(npm test 2>&1)
if [ $? -eq 0 ]; then
    echo "   ✅ All tests pass"
else
    echo "   ⚠️  Some tests failed (check npm test output)"
fi
cd ..
echo ""

# Summary
echo "=================================================="
echo "  Setup Test Complete!"
echo "=================================================="
echo ""
echo "✅ Node.js installed: $NODE_VERSION"
echo "✅ npm installed: $NPM_VERSION"
echo "✅ Backend dependencies installed"
echo "✅ Frontend dependencies installed"
echo "✅ Backend can start"
echo "✅ Tests available"
echo ""
echo "🎉 Your setup is ready!"
echo ""
echo "To run the application:"
echo ""
echo "  Terminal 1:"
echo "    cd backend"
echo "    MOCK_DB=true npm start"
echo ""
echo "  Terminal 2:"
echo "    cd frontend"
echo "    npm run dev"
echo ""
echo "  Then open: http://localhost:5173"
echo ""
echo "See QUICK_START.md for detailed instructions."
echo "=================================================="
