# 🚀 Quick Start Guide

Everything you need to know in 5 minutes!

---

## ✅ Your Website is Running!

**Frontend:** http://localhost:3000  
**Admin Panel:** http://localhost:3000/admin

---

## 🔐 Admin Login Credentials

```
Username: admin
Password: hariwatika123
```

**⚠️ Change this password after first login!**

---

## 📊 Check Your Database

### Quick Check (All tables at once):
```bash
node check-db.js
```

### Visual Editor (Best option):
```bash
npx prisma studio
```
Opens at: http://localhost:5555

### Check Admin Credentials:
```bash
node check-admin.js
```

### Reset Password:
```bash
node reset-password.js
```

---

## 🎨 Customize Your Website

### Change Colors (5 seconds):
1. Open: `src/app/globals.css`
2. Find `:root` section (lines 1-50)
3. Copy any theme from `COLOR_THEMES.md`
4. Paste and save
5. Refresh browser (Ctrl+Shift+R)

### Change Font Sizes:
1. Open: `src/app/globals.css`
2. Find `html { font-size: 16px; }`
3. Change to 14px (smaller) or 17px (larger)
4. Or copy a preset from `FONT_SIZE_GUIDE.md`

---

## 📝 Common Commands

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Check database | `node check-db.js` |
| Open Prisma Studio | `npx prisma studio` |
| Check admin login | `node check-admin.js` |
| Reset password | `node reset-password.js` |
| Seed database | `npm run db:seed` |
| Build for production | `npm run build` |

---

## 📂 Important Files

| File | What it does |
|------|--------------|
| `src/app/globals.css` | **Colors & fonts** (customize here!) |
| `src/app/page.tsx` | Homepage |
| `src/app/about/` | About page |
| `prisma/dev.db` | Database file (SQLite) |
| `prisma/schema.prisma` | Database structure |
| `.env` | Environment variables |

---

## 🎯 Your Current Data

**Users & Auth:**
- ✅ 1 Admin User

**Content (CMS):**
- ✅ 9 Blog Posts
- ✅ 6 Projects
- ✅ 18 Team Members
- ✅ 7 Timeline Items
- ✅ 4 Legal Documents
- ✅ 4 Services
- ✅ 4 Stats
- ✅ 3 Campaigns

**Submissions:**
- ✅ 8 Donation Records
- 0 Contact Submissions
- 0 Volunteer Applications

---

## 🛠️ Troubleshooting

### Dev server not running?
```bash
npm run dev
```

### Changes not showing?
Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Can't login to admin?
```bash
node reset-password.js
```

### Database error?
```bash
npx prisma generate
npx prisma migrate dev
```

---

## 📚 Full Documentation

- `ADMIN_CREDENTIALS.md` - Login details & password management
- `DATABASE_GUIDE.md` - Everything about the database
- `COLOR_THEMES.md` - 5 ready-made color themes
- `FONT_SIZE_GUIDE.md` - 4 typography scales
- `DESIGN_SYSTEM.md` - Full design documentation

---

## 🎨 5 Ready Color Themes

Copy-paste from `COLOR_THEMES.md`:

1. ✅ **Warm Orange** (Current)
2. **Royal Blue** (Trust & Professional)
3. **Forest Green** (Nature & Growth)
4. **Elegant Purple** (Luxury & Wisdom)
5. **Ocean Teal** (Calm & Trustworthy)

---

## 🌐 Your Website Structure

```
Homepage (/)
├── About (/about)
├── Projects (/projects)
├── Blog (/blog)
├── Transparency (/transparency)
├── Internships (/internships)
├── Volunteer (/volunteer)
├── Donate (/donate)
├── Contact (/contact)
└── Admin (/admin)
    ├── Donations
    ├── Content
    │   ├── Home
    │   ├── About
    │   ├── Blog
    │   ├── Projects
    │   └── More...
    └── Settings
```

---

## 🎯 Next Steps

### 1. Login to Admin Panel
```
http://localhost:3000/admin
Username: admin
Password: hariwatika123
```

### 2. Browse Your Data
```bash
npx prisma studio
```

### 3. Try Different Colors
Open `COLOR_THEMES.md` → Copy a theme → Paste in `globals.css`

### 4. Test All Pages
- http://localhost:3000 (Homepage)
- http://localhost:3000/about (About)
- http://localhost:3000/projects (Projects)
- http://localhost:3000/blog (Blog)

---

## 🎉 You're All Set!

Your premium NGO website is:
- ✅ Running locally
- ✅ Database connected
- ✅ Admin panel ready
- ✅ 9 blog posts loaded
- ✅ 18 team members listed
- ✅ Beautiful premium design
- ✅ Fully responsive
- ✅ Bilingual (English/Hindi)

**Need help?** Check the documentation files!

---

**Made with ♥ for Hariwatika Shiv Mandir Vivah Sewa Samiti**

