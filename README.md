# Hariwatika Shiv Mandir Vivah Sewa Samiti - Official Website

> A modern, full-featured NGO website with comprehensive admin panel

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?logo=prisma)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)

## ✨ Features

- 🎨 **Beautiful Design** - 3D hero, smooth animations, premium typography
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🌐 **Bilingual** - Complete English and Hindi support
- 🔐 **Secure Admin Panel** - Full CMS with inline page editing
- 📝 **Form Management** - Contact, volunteer, donation, internship forms
- 📊 **Transparency** - Annual reports, financial data, documents
- 🖼️ **Media Library** - Upload and manage images
- 💳 **Donation System** - Multiple payment methods, receipt generation
- 🎓 **Volunteer System** - Registration with ID card generation
- 📧 **WhatsApp Integration** - Quick contact and notifications

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/hariwatika-ngo.git
cd hariwatika-ngo

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Set up database
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# 5. Run development server
npm run dev

# 6. Open browser
# http://localhost:3000 - Public site
# http://localhost:3000/admin/login - Admin panel
```

### Admin Login

**Default Credentials:**
- Username: `admin`
- Password: `hariwatika123`

⚠️ **IMPORTANT:** Change password immediately after first login!

## 📁 Project Structure

```
hariwatika-ngo/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── (site)/       # Public pages
│   │   ├── admin/        # Admin panel
│   │   ├── actions/      # Server actions
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── context/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   └── theme/            # Design tokens
├── prisma/               # Database schema & migrations
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🎯 Available Pages

### Public Pages
- `/` - Home with 3D hero
- `/about` - About, team, history
- `/projects` - Current projects
- `/blog` - News and updates
- `/transparency` - Financial reports
- `/contact` - Contact form
- `/volunteer` - Volunteer registration
- `/donate` - Donation page
- `/gallery` - Photo gallery
- `/programs` - All programs
- `/internship` - Internship applications

### Admin Pages
- `/admin/login` - Admin login
- `/admin` - Dashboard
- `/admin/page-editor/[page]` - Edit page content
- `/admin/content/*` - Content management
- `/admin/submissions/*` - Form submissions
- `/admin/media` - Media library
- `/admin/settings` - Site settings

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add production database URL
# Done!
```

### VPS / Custom Server

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📚 Documentation

- **[ADMIN_USER_GUIDE.md](./ADMIN_USER_GUIDE.md)** - Complete admin guide
- **[PRODUCTION_READY_CHECKLIST.md](./PRODUCTION_READY_CHECKLIST.md)** - Pre-launch checklist
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deployment instructions
- **[FINAL_PROJECT_SUMMARY.md](./FINAL_PROJECT_SUMMARY.md)** - Project overview
- **[ADMIN_EDITING_GUIDE.md](./ADMIN_EDITING_GUIDE.md)** - How to edit content

## 🔒 Security

- ✅ Session-based authentication with bcrypt
- ✅ CSRF protection via Next.js server actions
- ✅ SQL injection prevention via Prisma ORM
- ✅ XSS protection via React
- ✅ Secure file uploads with validation
- ✅ Rate limiting on login attempts
- ✅ Secure headers configured

## 🎨 Tech Stack

**Frontend:**
- Next.js 16 with App Router
- TypeScript
- Tailwind CSS v4
- Three.js (3D graphics)
- Framer Motion (animations)

**Backend:**
- Next.js API Routes
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- Server Actions

**Development:**
- Turbopack
- ESLint
- TypeScript strict mode

## 📊 Database Schema

```prisma
// Core models
model Setting { ... }      // Editable text content
model Contact { ... }      // Contact form submissions
model Volunteer { ... }    // Volunteer registrations
model Donation { ... }     // Donation records
model Internship { ... }   // Internship applications
model BlogPost { ... }     // Blog posts
model Project { ... }      // Projects
model TeamMember { ... }   // Team members
// ... and more
```

## 🤝 Contributing

This is a private project for Hariwatika NGO. For feature requests or bug reports, contact:

- Email: hariwatikaseva@gmail.com
- Phone: +91 9473331919
- WhatsApp: +91 9288390016

## 📄 License

Private - All rights reserved by Hariwatika Shiv Mandir Vivah Sewa Samiti

## 🙏 Acknowledgments

- **Client:** Hariwatika Shiv Mandir Vivah Sewa Samiti
- **Location:** Bettiah, West Champaran, Bihar
- **Built with:** Next.js, TypeScript, Tailwind CSS, Prisma
- **Developed by:** Kiro AI Assistant

## 📞 Support

**Hariwatika Shiv Mandir Vivah Sewa Samiti**
- Address: Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, Bihar 845438
- Phone: +91 9473331919, +91 9288390016
- Email: hariwatikaseva@gmail.com
- Website: https://yourdomain.com

---

**Built with ❤️ for social good** | **Status: Production Ready ✅**
