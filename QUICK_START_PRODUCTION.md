# ⚡ Quick Start: Fix Production Site

## 🔴 Problem
- Homepage: https://hariwatika-ngo.vercel.app/ → ❌ Not working
- Admin: https://hariwatika-ngo.vercel.app/admin/login → ✅ Works

## 🎯 Solution
Your production database needs to be migrated (tables are missing).

---

## 🚀 Easy Fix (3 Steps)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Run Migration Script
```bash
cd /Users/banti/Desktop/WORKSPACE/Stitch_Project/ngo_1/hariwatika-ngo
./migrate-production.sh
```

**That's it!** The script will:
- Pull your production database URL
- Migrate the database schema
- Seed initial data
- Show you the admin credentials

---

## 🔐 Admin Login Info

After migration completes:

```
URL: https://hariwatika-ngo.vercel.app/admin/login
Username: admin
Password: hariwatika123
```

**⚠️ IMPORTANT:** Change this password immediately after first login!

---

## ✅ What to Expect

After running the migration:

1. ✅ Homepage will load with hero section
2. ✅ All pages (About, Gallery, Programs, Internship) will work
3. ✅ Admin panel will work fully
4. ✅ You can edit content and it will persist

---

## 🆘 If Script Doesn't Work

### Manual Method:

1. **Get your production DATABASE_URL**:
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Copy the `DATABASE_URL` value

2. **Run commands manually**:
```bash
# Set production database URL
export DATABASE_URL="paste_your_database_url_here"

# Generate Prisma client
npx prisma generate

# Push schema
npx prisma db push

# Seed database
npx prisma db seed
```

3. **Verify**:
   - Visit https://hariwatika-ngo.vercel.app/
   - Should now load properly!

---

## 📊 Why This Happened

Your local database (SQLite) has all the tables, but production (PostgreSQL on Vercel) was never migrated. The build succeeded, but the database was empty.

---

## 💡 Prevent This in Future

Add to your `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

This will automatically run migrations on every Vercel deployment.

---

## 📞 Need Help?

Check these files for more details:
- `PRODUCTION_FIX_GUIDE.md` - Detailed troubleshooting
- `ADMIN_CREDENTIALS.md` - Password management
- `DEPLOYMENT_GUIDE.md` - Full deployment docs

---

**Ready to fix your site?**

Just run:
```bash
./migrate-production.sh
```

🎉 Your production site will be working in 2-3 minutes!
