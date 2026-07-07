# 🚀 Deployment Guide - Production Ready

## 📋 Pre-Deployment Checklist

### 1. Environment Setup

Create a `.env.production` file:

```bash
# Database (PostgreSQL for production)
DATABASE_URL="postgresql://username:password@host:5432/database_name?schema=public"

# Session Secret (Generate a strong 32-character random string)
SESSION_SECRET="GENERATE_YOUR_OWN_32_CHAR_SECRET_HERE"

# Node Environment
NODE_ENV="production"

# Application URL
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Email Configuration (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="Hariwatika NGO <noreply@yourdomain.com>"

# File Upload (Optional - use cloud storage)
UPLOAD_DIR="/var/www/uploads"
MAX_FILE_SIZE="5242880"  # 5MB in bytes

# Admin Defaults
DEFAULT_ADMIN_USERNAME="admin"
DEFAULT_ADMIN_PASSWORD="CHANGE_ON_FIRST_LOGIN"
