#!/bin/bash

# Production Health Check Script
# Checks if your Vercel deployment is working properly

echo "🏥 Hariwatika NGO - Production Health Check"
echo "==========================================="
echo ""

SITE_URL="https://hariwatika-ngo.vercel.app"

echo "🌐 Checking site status..."
echo ""

# Check homepage
echo "1️⃣  Homepage (/)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Status: $HTTP_CODE - Working!"
else
    echo "   ❌ Status: $HTTP_CODE - Not working!"
fi
echo ""

# Check admin login
echo "2️⃣  Admin Login (/admin/login)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/admin/login")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Status: $HTTP_CODE - Working!"
else
    echo "   ❌ Status: $HTTP_CODE - Not working!"
fi
echo ""

# Check about page
echo "3️⃣  About Page (/about)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/about")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Status: $HTTP_CODE - Working!"
else
    echo "   ❌ Status: $HTTP_CODE - Not working!"
fi
echo ""

# Check gallery
echo "4️⃣  Gallery Page (/gallery)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/gallery")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Status: $HTTP_CODE - Working!"
else
    echo "   ❌ Status: $HTTP_CODE - Not working!"
fi
echo ""

# Check programs
echo "5️⃣  Programs Page (/programs)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/programs")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Status: $HTTP_CODE - Working!"
else
    echo "   ❌ Status: $HTTP_CODE - Not working!"
fi
echo ""

# Check internship
echo "6️⃣  Internship Page (/internship)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/internship")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Status: $HTTP_CODE - Working!"
else
    echo "   ❌ Status: $HTTP_CODE - Not working!"
fi
echo ""

echo "==========================================="
echo ""
echo "📝 Notes:"
echo "   - Status 200 = Page loading correctly"
echo "   - Status 500 = Server error (likely database issue)"
echo "   - Status 404 = Page not found"
echo ""
echo "🔗 Admin Credentials:"
echo "   URL: $SITE_URL/admin/login"
echo "   Username: admin"
echo "   Password: hariwatika123"
echo ""
echo "💡 If pages show errors, run: ./migrate-production.sh"
