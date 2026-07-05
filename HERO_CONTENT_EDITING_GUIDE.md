# Hero Section Content Editing - Complete Guide ✅

## 🎉 New Feature: Edit Hero Section Content

The hero section (title, subtitle, tag/eyebrow, and background image) is now **fully editable** from the About page editor!

---

## 🎯 What Can Be Edited

### Hero Section Content
1. **Tag/Eyebrow** (small text above title)
   - English: "Who We Are"
   - Hindi: "हम कौन हैं"

2. **Title** (main heading)
   - English: "About Us"
   - Hindi: "हमारे बारे में"

3. **Subtitle** (description text)
   - English: Full description paragraph
   - Hindi: Full description paragraph in Hindi

4. **Background Image**
   - URL to background image
   - Leave empty to use default

5. **Hero Stats** (already editable)
   - Value (e.g., "25+", "5000+")
   - Label in English and Hindi

---

## 📝 How to Edit Hero Content

### Step 1: Login and Navigate
1. Login to admin panel at `/admin/login`
2. Go to `/admin/page-editor/about`

### Step 2: Locate Edit Button
Look at the **top-left** of the hero section:

```
┌─────────────────────────────────────────────┐
│  [⚙️ Edit Hero Content]  [➕ Add Hero Stat] │
│  ↑ TOP LEFT              ↑ TOP RIGHT       │
│                                             │
│  ╔═══════════════════════════════════════╗  │
│  ║  Gradient Background                 ║  │
│  ║                                      ║  │
│  ║  Home / About Us                     ║  │
│  ║                                      ║  │
│  ║  ABOUT US                            ║  │
│  ║  हमारे बारे में                      ║  │
│  ║                                      ║  │
│  ║  Learn about our mission...          ║  │
│  ║                                      ║  │
│  ║  Stats (editable on hover)           ║  │
│  ╚═══════════════════════════════════════╝  │
└─────────────────────────────────────────────┘
```

### Step 3: Click "Edit Hero Content"
- Button has dark background with yellow text
- Located at top-left of hero section
- Has gear icon (⚙️)

### Step 4: Fill the Form
A modal will open with these fields:

**Tag/Eyebrow:**
- English field (required)
- Hindi field (required)
- Example: "Who We Are" / "हम कौन हैं"

**Title:**
- English field (required)
- Hindi field (required)
- Example: "About Us" / "हमारे बारे में"

**Subtitle:**
- English textarea (required)
- Hindi textarea (required)
- 2-3 sentences describing the page

**Background Image:**
- URL field (optional)
- Use Unsplash or Pexels URLs
- Leave empty to use default image

### Step 5: Save Changes
1. Click **"Update Hero Content"** button
2. Page will reload
3. Changes appear immediately

---

## 🎨 UI Overview

### Admin Edit View
```
Top-Left Corner:
┌──────────────────────────┐
│ ⚙️ Edit Hero Content     │  ← Click this to edit title, subtitle, tag, image
└──────────────────────────┘

Top-Right Corner:
┌──────────────────────────┐
│ ➕ Add Hero Stat         │  ← Click this to add stats like "25+ Years"
└──────────────────────────┘

Bottom Section (hover over stats):
┌────────────┐
│ ✏️ 🗑️      │  ← Edit/delete icons appear on hover
│   25+      │
│   Years    │
└────────────┘
```

### Public View
- NO edit buttons visible
- NO "Edit Hero Content" button
- Original design displayed normally

---

## 📋 Form Fields Reference

### Tag/Eyebrow
**Purpose:** Small text that appears above the main title  
**Examples:**
- "Who We Are" / "हम कौन हैं"
- "Our Mission" / "हमारा मिशन"
- "Learn More" / "और जानें"

**Tips:**
- Keep it short (2-4 words)
- Use title case
- Matches the page theme

### Title
**Purpose:** Main heading of the hero section  
**Examples:**
- "About Us" / "हमारे बारे में"
- "Our Story" / "हमारी कहानी"
- "Who We Are" / "हम कौन हैं"

**Tips:**
- Keep it concise (2-5 words)
- Use title case
- Clear and descriptive

### Subtitle
**Purpose:** Description paragraph below the title  
**Examples:**
- "Learn about our mission and journey serving communities in West Champaran"
- "हमारे मिशन और पश्चिम चम्पारण में समुदायों की सेवा करने की यात्रा के बारे में जानें"

**Tips:**
- 2-3 sentences
- Describes the page content
- Engaging and informative

### Background Image
**Purpose:** Background image for the hero section  
**Format:** URL to image  
**Sources:**
- Unsplash: `https://images.unsplash.com/photo-...`
- Pexels: `https://images.pexels.com/photos/...`
- Your own uploads

**Tips:**
- Use high-quality images (1920x1080px)
- Community/charity themed images work best
- Leave empty to use default image

---

## 🔧 Technical Details

### API Endpoint
- **Route:** `/api/hero-content`
- **Method:** POST
- **Auth:** Requires admin authentication

### Database Storage
Hero content is stored in the `SiteSetting` table with these keys:
- `header.about.tag` - Tag/eyebrow text
- `header.about.title` - Main title (also stores image URL)
- `header.about.subtitle` - Description text

### Files Created
1. ✅ `src/components/HeroContentForm.tsx` - Form component
2. ✅ `src/app/api/hero-content/route.ts` - API endpoint
3. ✅ `src/components/EditableHeroStats.tsx` - Updated with hero content button

### Files Modified
1. ✅ `src/app/(site)/about/AboutContent.tsx` - Added hero content modal

---

## ✅ Testing Checklist

### Test Hero Content Editing
- [ ] Login as admin → Go to `/admin/page-editor/about`
- [ ] See "Edit Hero Content" button (top-left of hero)
- [ ] Click button → Form modal opens
- [ ] Form shows current values pre-filled
- [ ] Update tag: Change "Who We Are" to "Our Mission"
- [ ] Update title: Change "About Us" to "Our Story"
- [ ] Update subtitle: Change description text
- [ ] Update image: Add Unsplash URL
- [ ] Click "Update Hero Content"
- [ ] Page reloads → Changes visible immediately
- [ ] Check both English and Hindi versions

### Test Hero Stats (Already Working)
- [ ] See "Add Hero Stat" button (top-right)
- [ ] Hover over stats → Edit/delete icons appear
- [ ] Can add new stats
- [ ] Can edit existing stats
- [ ] Can delete stats

### Test Public View
- [ ] Open `/about` (public page)
- [ ] NO "Edit Hero Content" button visible
- [ ] NO "Add Hero Stat" button visible
- [ ] Hero content displays correctly
- [ ] Stats display correctly

---

## 💡 Tips for Clients

### Content Guidelines
**Tag/Eyebrow:**
- Use action words or labels
- Keep it under 20 characters
- Example: "Learn More", "Discover", "Join Us"

**Title:**
- Clear and direct
- Reflects page purpose
- Keep under 30 characters

**Subtitle:**
- Informative and welcoming
- 2-3 sentences max
- Describes what visitors will find

**Image:**
- Use bright, positive images
- Show people, community, or nature
- High quality (not pixelated)

### Where to Find Images
1. **Unsplash** (https://unsplash.com)
   - Search: "community", "volunteers", "charity"
   - Free high-quality images
   - Copy image URL

2. **Pexels** (https://pexels.com)
   - Search: "india community", "helping hands"
   - Free stock photos
   - Copy image URL

3. **Your Own Images**
   - Upload to Media Library in admin
   - Use the URL from media library

---

## 🎊 Summary

**What's Editable:**
- ✅ Hero tag/eyebrow (EN/HI)
- ✅ Hero title (EN/HI)
- ✅ Hero subtitle (EN/HI)
- ✅ Hero background image
- ✅ Hero stats (value + label EN/HI)

**How to Edit:**
1. Login → `/admin/page-editor/about`
2. Click "Edit Hero Content" (top-left)
3. Fill form fields
4. Click "Update Hero Content"
5. Page reloads with changes

**Result:**
- 🎨 Original design preserved
- ✏️ Full editing control
- 🌐 Bilingual support
- 🔒 Admin-only access
- ⚡ Instant updates

The hero section is now **100% editable** with zero code knowledge required! 🎉
