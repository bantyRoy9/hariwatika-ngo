# 🗄️ Database Guide - How to Check Your Database

Your project uses **SQLite** + **Prisma ORM** for the database.

---

## ✅ Current Database Status

Your database is **working perfectly!**

**Location:** `/prisma/dev.db` (208 KB)  
**Type:** SQLite  
**ORM:** Prisma

### 📊 Current Data:

**Users & Auth:**
- ✅ 1 Admin User

**Submissions (from public forms):**
- ✅ 8 Donation Submissions
- 0 Contact Submissions
- 0 Volunteer Submissions
- 0 Internship Applications
- 0 Marriage Registrations

**Content (CMS):**
- ✅ 9 Blog Posts
- ✅ 6 Projects
- ✅ 18 Team Members
- ✅ 7 Timeline Items
- ✅ 4 Legal Documents
- ✅ 4 Home Services
- ✅ 4 Home Stats
- ✅ 3 Home Campaigns

**Settings:**
- ✅ 96 Site Settings
- ✅ 174 Translations
- ✅ 9 Media Assets

---

## 🛠️ 5 Ways to Check Your Database

### **Method 1: Quick Check Script** (Easiest)

```bash
node check-db.js
```

This shows all table counts instantly. Perfect for quick verification!

---

### **Method 2: Prisma Studio** (Best Visual Tool) ⭐ RECOMMENDED

```bash
npx prisma studio
```

**What happens:**
- Opens a web browser at `http://localhost:5555`
- Visual interface to browse all tables
- Edit data directly (like Excel)
- Filter, search, add, delete records
- **Perfect for managing content!**

**Screenshot of what you'll see:**
- Left sidebar: All your tables
- Main area: Table data in rows
- Top: Add record, filter, search buttons

**To stop:** Press `Ctrl+C` in terminal

---

### **Method 3: VS Code Extension** (If you use VS Code)

1. Install extension: **"SQLite Viewer"** or **"SQLite Explorer"**
2. Open file: `/prisma/dev.db`
3. Browse tables visually

---

### **Method 4: Command Line** (For advanced users)

Install sqlite3:
```bash
sudo apt install sqlite3  # Ubuntu/Debian
```

Then:
```bash
sqlite3 prisma/dev.db

# Inside sqlite prompt:
.tables                    # List all tables
SELECT * FROM TeamMember;  # View team members
SELECT * FROM BlogPost;    # View blog posts
.exit                      # Exit
```

---

### **Method 5: Custom Query Script**

Create a script to check specific data:

```javascript
// view-team.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function viewTeam() {
  const team = await prisma.teamMember.findMany({
    orderBy: { sortOrder: 'asc' }
  });
  console.log(JSON.stringify(team, null, 2));
  await prisma.$disconnect();
}

viewTeam();
```

Run: `node view-team.js`

---

## 📝 Common Database Tasks

### **View All Team Members:**

```bash
# Method 1: Prisma Studio (visual)
npx prisma studio
# Then click "TeamMember" in left sidebar

# Method 2: Script
node -e "const {PrismaClient}=require('@prisma/client');const p=new PrismaClient();(async()=>{const t=await p.teamMember.findMany();console.log(t);await p.\$disconnect()})();"
```

### **View All Blog Posts:**

```bash
npx prisma studio
# Click "BlogPost" in left sidebar
```

### **Check Admin Login:**

```bash
npx prisma studio
# Click "AdminUser" - you'll see username "admin"
```

### **View Donation Submissions:**

```bash
npx prisma studio
# Click "DonationSubmission" - you have 8 donations recorded
```

---

## 🔧 Database Management Commands

### **Reset Database** (⚠️ Deletes all data!):

```bash
npx prisma migrate reset
```

### **Seed Database** (Add sample data):

```bash
npm run db:seed
```

### **Generate Prisma Client** (After schema changes):

```bash
npx prisma generate
```

### **Create Migration** (After changing schema.prisma):

```bash
npx prisma migrate dev --name your_migration_name
```

### **View Database Schema:**

```bash
cat prisma/schema.prisma
```

---

## 🎯 What Each Table Does

### **Auth:**
- `AdminUser` - Admin login credentials

### **Public Form Submissions:**
- `ContactSubmission` - Contact form entries
- `DonationSubmission` - Donation records with ref number
- `VolunteerSubmission` - Volunteer applications
- `InternshipSubmission` - Internship applications
- `MarriageRegistration` - Marriage assistance registrations

### **Content (CMS):**
- `BlogPost` - News & blog articles (bilingual)
- `Project` - Project listings with progress
- `TeamMember` - Team members with roles
- `TimelineItem` - Organization history timeline
- `LegalDoc` - Legal documents (registration, certificates)
- `FuturePlan` - Future plans/roadmap
- `FinancialReport` - Annual financial reports
- `InternshipListing` - Available internship positions

### **Homepage Content:**
- `HomeService` - Service cards on homepage
- `HomeStat` - Statistics counters
- `HomeCampaign` - Active campaigns with progress
- `HomePillar` - Four pillars section

### **Settings:**
- `SiteSetting` - Site-wide settings (phone, email, bank details, page headers)
- `Translation` - UI text translations (buttons, labels, messages)
- `OptionItem` - Dropdown options for forms
- `NavLink` - Navigation menu items
- `SocialLink` - Social media links
- `MediaAsset` - Uploaded images/files

---

## 🚀 Best Practice: Use Prisma Studio

For day-to-day database management, **Prisma Studio** is the best option:

### **Start Prisma Studio:**

```bash
npx prisma studio
```

### **What you can do:**
✅ View all records in any table  
✅ Add new records (blog posts, team members, etc.)  
✅ Edit existing records  
✅ Delete records  
✅ Filter and search data  
✅ See relationships between tables  

### **Common Use Cases:**

**Add a new blog post:**
1. Open Prisma Studio
2. Click "BlogPost"
3. Click "Add record"
4. Fill in titleEn, titleHi, excerptEn, excerptHi, etc.
5. Save

**Edit team member:**
1. Open Prisma Studio
2. Click "TeamMember"
3. Find the member
4. Click to edit
5. Update name, designation, phone
6. Save

**View donations:**
1. Open Prisma Studio
2. Click "DonationSubmission"
3. See all 8 donations with details

---

## 🐛 Troubleshooting

### **"Database file not found"**

```bash
# Create database from schema:
npx prisma migrate dev --name init

# Then seed it:
npm run db:seed
```

### **"Can't connect to database"**

Check `.env` file:
```bash
DATABASE_URL="file:./dev.db"
```

### **"Prisma Client not generated"**

```bash
npx prisma generate
```

### **"Schema is out of sync"**

```bash
npx prisma migrate dev
```

---

## 📊 Database File Info

**Location:** `/home/lap1209per/Desktop/MY_WORKSPACE/hariwatika-ngo/prisma/dev.db`  
**Size:** 208 KB  
**Type:** SQLite (single file database)  
**Backup:** Just copy the `dev.db` file!

### **Backup Database:**

```bash
# Create backup
cp prisma/dev.db prisma/dev.db.backup

# Restore backup
cp prisma/dev.db.backup prisma/dev.db
```

---

## 🎓 Learn More

- **Prisma Docs:** https://www.prisma.io/docs
- **Prisma Studio:** https://www.prisma.io/studio
- **SQLite Docs:** https://www.sqlite.org/docs.html

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Check database | `node check-db.js` |
| Visual editor | `npx prisma studio` |
| View schema | `cat prisma/schema.prisma` |
| Reset database | `npx prisma migrate reset` |
| Seed data | `npm run db:seed` |
| Backup | `cp prisma/dev.db prisma/backup.db` |

---

**Your database is healthy and working perfectly!** 🎉

