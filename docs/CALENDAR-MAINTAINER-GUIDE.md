# 📅 Training Calendar Maintainer Guide

This guide explains how to manage the MBSC Training Calendar system, which uses dynamic JSON files with full multilingual support.

---

## 📁 File Structure

```
/public/calendars/
├── 2026.json     # Base calendar (template for all years)
├── 2027.json     # 2027 calendar
├── 2028.json     # 2028 calendar (generated)
└── ...           # Future years

/scripts/
└── generateCalendarYear.js   # CLI tool to generate new years

/components/
└── TrainingCalendar.tsx      # React component (loads JSON dynamically)
```

---

## 🌐 Multilingual JSON Format

Each calendar JSON file follows this structure:

```json
{
  "year": 2026,
  "languages": ["en", "fr"],
  "months": [
    {
      "name": {
        "en": "January",
        "fr": "Janvier"
      },
      "events": [
        {
          "date": "12-16",
          "title": {
            "en": "RT Level II Certification",
            "fr": "Certification RT Niveau II"
          },
          "category": "NDT",
          "location": {
            "en": "Brisbane Training Centre",
            "fr": "Centre de formation de Brisbane"
          },
          "deliveryMethod": "In-Person",
          "spots": 12,
          "certificateType": "iso9712",
          "certificateLabel": {
            "en": "ISO 9712 Certification",
            "fr": "Certification ISO 9712"
          }
        }
      ]
    }
  ]
}
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `year` | number | Calendar year (e.g., 2026) |
| `languages` | string[] | Supported language codes |
| `months[].name` | `{en, fr}` | Localized month name |
| `months[].events[].date` | string | Date range (e.g., "12-16" or "5") |
| `months[].events[].title` | `{en, fr}` | Localized event title |
| `months[].events[].category` | string | One of: `NDT`, `Safety`, `GPR`, `Corporate` |
| `months[].events[].location` | `{en, fr}` | Localized venue/location |
| `months[].events[].deliveryMethod` | string | One of: `In-Person`, `Online`, `Hybrid`, `On-Site` |
| `months[].events[].spots` | number | Available seats |
| `months[].events[].certificateType` | string | Key for badge: `iso9712`, `bespoke`, `safety`, `compliance`, `technical` |
| `months[].events[].certificateLabel` | `{en, fr}` | Localized certificate badge text |

---

## ✏️ How to Update Calendar Events

### Adding a New Event

1. Open `/public/calendars/YYYY.json`
2. Find the target month in the `months` array
3. Add a new event object to that month's `events` array:

```json
{
  "date": "20-24",
  "title": {
    "en": "New Training Course",
    "fr": "Nouveau Cours de Formation"
  },
  "category": "NDT",
  "location": {
    "en": "Melbourne Training Centre",
    "fr": "Centre de formation de Melbourne"
  },
  "deliveryMethod": "In-Person",
  "spots": 15,
  "certificateType": "iso9712",
  "certificateLabel": {
    "en": "ISO 9712 Certification",
    "fr": "Certification ISO 9712"
  }
}
```

### Editing an Existing Event

Simply modify the relevant fields in the JSON. Both `en` and `fr` translations should be updated.

### Removing an Event

Delete the entire event object from the `events` array.

---

## 📆 How to Add a New Year

### Option 1: Use the Generator Script (Recommended)

```bash
npm run generate:calendar 2029
```

This will:
1. Read `2026.json` as the base template
2. Create a new file at `/public/calendars/2029.json`
3. Update the `year` field to 2029
4. Keep all events unchanged (dates stay the same)

**After generating, you should:**
1. Open the new JSON file
2. Adjust dates for the new year (weekdays, holidays, etc.)
3. Add/remove programs as needed

### Option 2: Manual Copy

```bash
cp public/calendars/2026.json public/calendars/2029.json
```

Then manually edit the `year` field and adjust events.

---

## 🔗 How to Display a Different Year

In `App.tsx`, update the TrainingCalendar component:

```tsx
// Display 2026 calendar
<TrainingCalendar year={2026} source="/calendars/2026.json" />

// Display 2027 calendar
<TrainingCalendar year={2027} source="/calendars/2027.json" />

// Display 2028 calendar
<TrainingCalendar year={2028} source="/calendars/2028.json" />
```

---

## 🌍 Language Fallback System

The calendar automatically:

1. **Detects** the current language from i18next (`i18n.language`)
2. **Extracts** the base language code (e.g., `"en-AU"` → `"en"`)
3. **Uses fallback** to English if a translation is missing

### Fallback Order

```
User's language (e.g., "fr") → English ("en") → Default string
```

### Example (in TrainingCalendar.tsx)

```tsx
// For title:
title: evt.title[lang] || evt.title.en

// For location:
location: evt.location?.[lang] || evt.location?.en || "TBC"

// For certificate label:
certificateType: evt.certificateLabel[lang] || evt.certificateLabel.en || "Technical Certification"
```

---

## 🎨 Certificate Type Badges

The calendar displays colored badges based on `certificateType`:

| Key | English Label | French Label | Color |
|-----|--------------|--------------|-------|
| `iso9712` | ISO 9712 Certification | Certification ISO 9712 | Blue |
| `bespoke` | Bespoke Training | Formation sur mesure | Indigo |
| `safety` | Safety Certification | Certification sécurité | Red |
| `compliance` | Compliance Training | Formation conformité | Yellow |
| `technical` | Technical Certification | Certification technique | Green |

---

## 🔧 Category Colors

Events are color-coded by category:

| Category | Background Color |
|----------|-----------------|
| `NDT` | Purple |
| `Safety` | Red |
| `GPR` | Orange |
| `Corporate` | Teal |

---

## 🧪 Testing Changes

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to Training section** and verify:
   - Events display correctly
   - Switch language (EN/FR) and confirm translations
   - Click on events to expand details

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚠️ Common Issues

### Event not showing up
- Ensure the event is in the correct month's `events` array
- Verify JSON syntax (no trailing commas)
- Check that all required fields are present

### Translation not working
- Verify both `en` and `fr` keys exist for the field
- Check for typos in language codes

### Build errors
- Run `npm run build` to check for TypeScript errors
- Ensure `certificateType` uses a valid key

---

## 📋 Quick Reference: Valid Values

### Categories
- `NDT`
- `Safety`
- `GPR`
- `Corporate`

### Delivery Methods
- `In-Person`
- `Online`
- `Hybrid`
- `On-Site`

### Certificate Types
- `iso9712`
- `bespoke`
- `safety`
- `compliance`
- `technical`

---

## 🚀 Backend Integration (Future)

The JSON structure is designed to be easily served from a backend API:

```tsx
// Current: Static JSON file
<TrainingCalendar source="/calendars/2026.json" />

// Future: API endpoint
<TrainingCalendar source="https://api.mbsc.com.au/calendars/2026" />
```

No component changes needed—just update the `source` prop!
