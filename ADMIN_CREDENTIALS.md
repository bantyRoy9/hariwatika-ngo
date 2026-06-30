# 🔐 Admin Login Credentials

## Current Admin Account

**Admin Panel URL:** http://localhost:3000/admin

### Default Credentials:
```
Username: admin
Password: hariwatika123
```

---

## 📝 How to Check Username & Password

### Check Current Admin:
```bash
node check-admin.js
```

This shows:
- Username (plain text)
- Password hash (encrypted, not readable)
- Creation date
- Last updated date

---

## 🔄 How to Reset Password

If you forgot the password, reset it to default:

```bash
node reset-password.js
```

This will:
- Reset password to: `hariwatika123`
- Keep username as: `admin`
- Show confirmation message

---

## 🔒 How Password Security Works

### Your password is HASHED (encrypted):
- **Plain text:** `hariwatika123` ← What you type
- **Stored in DB:** `$2b$10$xjjbIl5j6ROP0...` ← Encrypted (safe)

### Why you can't see the password:
- For security, passwords are one-way encrypted
- Even admins can't see the plain text
- Only way to "recover" is to reset it

### How bcrypt works:
```javascript
// When you set password:
bcrypt.hashSync("hariwatika123", 10)
// Result: $2b$10$xjjbIl5j6ROP0...

// When you login:
bcrypt.compareSync("hariwatika123", "$2b$10$xjjbIl5j6ROP0...")
// Returns: true (password matches!)
```

---

## 🛠️ Change Password

### Method 1: Through Admin Panel (Recommended)
1. Login at http://localhost:3000/admin
2. Go to Settings or Profile
3. Click "Change Password"
4. Enter old password + new password

### Method 2: Create Custom Password Reset Script
```javascript
// custom-password.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function setPassword() {
  const newPassword = "YOUR_NEW_PASSWORD_HERE";
  const passwordHash = bcrypt.hashSync(newPassword, 10);
  
  await prisma.adminUser.updateMany({
    where: { username: "admin" },
    data: { passwordHash }
  });
  
  console.log('Password updated to:', newPassword);
  await prisma.$disconnect();
}

setPassword();
```

Run: `node custom-password.js`

### Method 3: Using Prisma Studio
```bash
npx prisma studio
```
1. Click "AdminUser" table
2. Click the admin record
3. Paste a new bcrypt hash in `passwordHash` field
4. Generate hash at: https://bcrypt-generator.com/

---

## 🎯 Admin Panel Access

### Login Page:
http://localhost:3000/admin

### After Login, you can access:
- `/admin/donations` - View donation submissions
- `/admin/content/home` - Edit homepage content
- `/admin/content/about` - Edit about page
- `/admin/content/blog` - Manage blog posts
- `/admin/content/projects` - Manage projects
- `/admin/content/headers` - Edit page headers
- And many more...

---

## 📊 Current Database Status

Run this to see current admin:
```bash
node check-admin.js
```

**Current Status:**
- ✅ 1 Admin user exists
- Username: `admin`
- Password: `hariwatika123` (default from seed)
- Created: June 26, 2026

---

## 🐛 Troubleshooting

### Can't login with admin/hariwatika123?

**Check if admin exists:**
```bash
node check-admin.js
```

**Reset password:**
```bash
node reset-password.js
```

**Still not working? Re-seed database:**
```bash
npm run db:seed
# This will reset EVERYTHING and create fresh admin account
```

### "Invalid credentials" error?

1. Make sure dev server is running: `npm run dev`
2. Clear browser cookies
3. Try reset password: `node reset-password.js`
4. Check console for errors (F12)

### Want to create multiple admin users?

```javascript
// add-admin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function addAdmin() {
  await prisma.adminUser.create({
    data: {
      username: "newadmin",
      passwordHash: bcrypt.hashSync("newpassword123", 10)
    }
  });
  
  console.log('New admin created: newadmin / newpassword123');
  await prisma.$disconnect();
}

addAdmin();
```

---

## 🔐 Security Best Practices

### ✅ DO:
- Change default password immediately
- Use strong passwords (12+ characters, mix of letters/numbers/symbols)
- Don't share credentials
- Use HTTPS in production
- Enable 2FA if available

### ❌ DON'T:
- Use "password123" or "admin123"
- Write passwords in code comments
- Share passwords via email/chat
- Use same password for multiple services
- Store passwords in plain text

---

## 📚 Quick Reference

| Task | Command |
|------|---------|
| Check admin | `node check-admin.js` |
| Reset password | `node reset-password.js` |
| Login URL | http://localhost:3000/admin |
| Default username | `admin` |
| Default password | `hariwatika123` |

---

## 🎓 Learn More

- **bcrypt.js:** https://github.com/kelektiv/node.bcrypt.js
- **Password Security:** https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- **Prisma Auth:** https://www.prisma.io/docs/guides/authentication

---

**Your admin account is secure and ready to use!** 🎉

