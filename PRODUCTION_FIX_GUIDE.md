# 🚀 Production Fix Guide - Vercel Deployment

## Problem Summary
1. ❌ Homepage (https://hariwatika-ngo.vercel.app/) not loading - "This page couldn't load"
2. ✅ Admin page (https://hariwatika-ngo.vercel.app/admin/login) works fine

## Root Cause
The production PostgreSQL database on Vercel is **NOT migrated** - missing required tables like `JourneyCard`, `HeroStat`, `HomeService`, `HomeCampaign`, etc.

---

## 🔐 Admin Login Credentials

### Production Admin Login:
```
URL: https://hariwatika-ngo.vercel.app/admin/login
Username: admin
Password: hariwatika123
```

**Note:** This is the default password from the seed script. Once you login, change it immediately via Settings > Password.

---

## 🛠️ Fix Steps

### Step 1: Run Database Migration on Vercel

You need to run Prisma migrations on your production PostgreSQL database.

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Link your project**:
```bash
cd /Users/banti/Desktop/WORKSPACE/Stitch_Project/ngo_1/hariwatika-ngo
vercel link
```

4. **Pull environment variables** (including DATABASE_URL):
```bash
vercel env pull .env.production
```

5. **Run migration against production database**:
```bash
# Set production DATABASE_URL temporarily
export DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d '=' -f2-)"

# Run Prisma push to sync schema
npx prisma db push

# OR run migrations
npx prisma migrate deploy
```

6. **Seed production database**:
```bash
# Still using production DATABASE_URL
npx prisma db seed
```

#### Option B: Add Migration to Build Process

Update `package.json` to run migrations automatically on deploy:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

Then redeploy:
```bash
vercel --prod
```

#### Option C: Use Vercel Dashboard

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `hariwatika-ngo`
3. Go to Settings > Environment Variables
4. Copy the `DATABASE_URL` value
5. Use it locally to run migrations:

```bash
# Replace with your actual production DATABASE_URL
export DATABASE_URL="postgresql://user:pass@host/database?sslmode=require"

npx prisma db push
npx prisma db seed
```

---

### Step 2: Verify Database Tables

After running migrations, check if tables exist:

```bash
# Using production DATABASE_URL
npx prisma studio
```

Required tables for homepage:
- ✅ `HomeService`
- ✅ `HomeCampaign`
- ✅ `HomeStat`
- ✅ `HomePillar`
- ✅ `SiteSetting`

Required tables for about page:
- ✅ `JourneyCard`
- ✅ `HeroStat`
- ✅ `TimelineItem`
- ✅ `TeamMember`
- ✅ `LegalDoc`

---

### Step 3: Check Vercel Logs

If homepage still fails after migration:

1. **Check deployment logs**:
   - Go to https://vercel.com/dashboard
   - Click on your project
   - Click on "Deployments"
   - Click on the latest deployment
   - Check "Build Logs" and "Function Logs"

2. **Look for errors** related to:
   - Database connection
   - Missing tables
   - Prisma Client generation

---

## 🔍 Common Production Errors & Fixes

### Error: "Can't reach database server"
**Fix:** Check `DATABASE_URL` environment variable in Vercel:
- Go to Project Settings > Environment Variables
- Ensure `DATABASE_URL` is set for Production
- Format: `postgresql://user:password@host:5432/database?sslmode=require`

### Error: "Table 'HomeService' does not exist"
**Fix:** Run migrations on production database (see Step 1)

### Error: "Invalid prisma.journeyCard.findMany() invocation"
**Fix:** Same as above - missing tables, need migration

### Error: "This page couldn't load" (x4i1bx4mJ)
**Fix:** This is a generic Vercel error. Check:
1. Function Logs in Vercel Dashboard
2. Database connection
3. Environment variables

---

## 📋 Post-Migration Checklist

After fixing production:

- [ ] Homepage loads: https://hariwatika-ngo.vercel.app/
- [ ] About page loads: https://hariwatika-ngo.vercel.app/about
- [ ] Gallery page loads: https://hariwatika-ngo.vercel.app/gallery
- [ ] Programs page loads: https://hariwatika-ngo.vercel.app/programs
- [ ] Internship page loads: https://hariwatika-ngo.vercel.app/internship
- [ ] Admin login works: https://hariwatika-ngo.vercel.app/admin/login
- [ ] Admin can edit content
- [ ] Admin can create new items
- [ ] Database persists data across deployments

---

## 🔐 Change Production Password

After verifying everything works:

1. Login: https://hariwatika-ngo.vercel.app/admin/login
   - Username: `admin`
   - Password: `hariwatika123`

2. Go to Settings > Password (if available)

3. OR create a script to change password:

```javascript
// change-prod-password.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL // Use production URL
    }
  }
});

async function changePassword() {
  const newPassword = "YOUR_SECURE_PASSWORD_HERE";
  const passwordHash = bcrypt.hashSync(newPassword, 10);
  
  await prisma.adminUser.updateMany({
    where: { username: "admin" },
    data: { passwordHash }
  });
  
  console.log('✅ Production password changed successfully!');
  await prisma.$disconnect();
}

changePassword();
```

Run with production DATABASE_URL:
```bash
export DATABASE_URL="your_production_database_url"
node change-prod-password.js
```

---

## 🚀 Quick Fix Command (All-in-One)

If you have Vercel CLI installed and linked:

```bash
# Pull production env
vercel env pull .env.production

# Load production DATABASE_URL
export $(grep DATABASE_URL .env.production | xargs)

# Run migration
npx prisma migrate deploy

# Seed database
npx prisma db seed

# Verify
npx prisma studio
```

---

## 📞 Need Help?

If the issue persists:

1. **Check Vercel Function Logs**: Most detailed error info
2. **Verify DATABASE_URL format**: Must include `?sslmode=require` for PostgreSQL
3. **Test connection**: Use a PostgreSQL client to connect directly
4. **Check Prisma version**: Ensure compatibility between local and production

---

## ✅ Expected Result

After following these steps:

✅ Homepage loads with hero section, services, campaigns
✅ All pages render without errors
✅ Admin can login with provided credentials
✅ Database is properly seeded with initial data
✅ All CRUD operations work in admin panel

---

**Last Updated:** July 6, 2026
**Status:** Production deployment needs database migration
