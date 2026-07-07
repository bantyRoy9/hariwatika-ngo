#!/bin/bash

# Production Database Migration Script for Vercel
# This script helps migrate your Prisma schema to production PostgreSQL

echo "🚀 Hariwatika NGO - Production Database Migration"
echo "=================================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found!"
    echo "Install it with: npm install -g vercel"
    echo ""
    exit 1
fi

echo "✅ Vercel CLI found"
echo ""

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel"
    echo "Please run: vercel login"
    echo ""
    exit 1
fi

echo "✅ Logged in to Vercel"
echo ""

# Pull environment variables
echo "📥 Pulling production environment variables..."
vercel env pull .env.production --yes

if [ ! -f .env.production ]; then
    echo "❌ Failed to pull environment variables"
    exit 1
fi

echo "✅ Environment variables pulled"
echo ""

# Extract DATABASE_URL
export $(grep DATABASE_URL .env.production | xargs)

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in .env.production"
    exit 1
fi

echo "✅ Production DATABASE_URL loaded"
echo ""

# Show database info (without exposing full URL)
echo "🗄️  Database: $(echo $DATABASE_URL | sed 's|://.*@|://***:***@|')"
echo ""

# Confirm with user
echo "⚠️  WARNING: This will modify your PRODUCTION database!"
echo "This will:"
echo "  1. Generate Prisma Client"
echo "  2. Push schema changes to production"
echo "  3. Seed the database with initial data"
echo ""
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Migration cancelled"
    exit 0
fi

echo ""
echo "🔧 Starting migration..."
echo ""

# Generate Prisma Client
echo "1️⃣  Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Push schema to production
echo "2️⃣  Pushing schema to production database..."
npx prisma db push --skip-generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to push schema"
    exit 1
fi

echo "✅ Schema pushed successfully"
echo ""

# Seed database
echo "3️⃣  Seeding production database..."
npx prisma db seed

if [ $? -ne 0 ]; then
    echo "⚠️  Seeding failed, but schema is migrated"
    echo "You may need to manually seed or check if data already exists"
else
    echo "✅ Database seeded successfully"
fi

echo ""
echo "✨ Migration completed!"
echo ""
echo "📋 Next steps:"
echo "  1. Visit: https://hariwatika-ngo.vercel.app"
echo "  2. Verify homepage loads"
echo "  3. Login: https://hariwatika-ngo.vercel.app/admin/login"
echo "     Username: admin"
echo "     Password: hariwatika123"
echo "  4. Change password after first login!"
echo ""
echo "🎉 Your production site should now be working!"
