# Chronos — Apple-Style Personal Availability & Booking Network

Chronos is a personal availability calendar and appointment booking web application styled with Apple's design language (SF Pro typography hierarchy, frosted glass translucency, smooth micro-interactions, and pure SVG Lucide icons without emojis).

It enables you to share a dedicated availability link (`?user=yourname`) with friends, allowing them to inspect your occupied/free days, request precise time slots (including exact minute ranges like `17:10 – 19:00`), and send notes for your approval.

---

## Key Features

- **Apple Design Language**: SF Pro font stack, backdrop glassmorphic blurs (`backdrop-blur-2xl bg-white/10`), ultra-clean borders, and pure Lucide SVG icons. Zero emojis used.
- **Interactive Calendar Engine**: 12-month navigation, day status indicators (`Available`, `Pending Request`, `Accepted Appointment`, `Occupied`).
- **Precision Booking Modal**: Friends select an available date and specify exact hours/minutes (e.g., `17:10 to 19:00` or decimal hours) with presets and note messages.
- **Host Inbox Approval Workflow**: Host receives instant notification badges in the header inbox to **Accept** (Green Check) or **Decline** (Red X) requests. Accepting an appointment locks that slot on the calendar.
- **Multi-User Account & Saved Friends Network**: Anyone can switch accounts or register a new handle (e.g., `@dj`, `@alex`, `@maria`). Save friends' handles to quickly view their availability and book appointments.
- **Instant Share Link**: 1-click **Share Link** button copies direct URL (`?user=handle`) for instant sharing.

---

## Free Hosting Guide (Zero Domain Required)

You do not need to buy a custom domain! You can host Chronos for 100% free with custom URLs using either **GitHub Pages** or **Vercel**:

### Option 1: GitHub Pages (Free `yourname.github.io/chronos`)

1. Create a public repository named `chronos` on GitHub.
2. Upload/push all files from this directory (`index.html`, `styles.css`, `app.js`, `README.md`) to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial Chronos release"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/chronos.git
   git push -u origin main
   ```
3. On GitHub, navigate to **Settings** > **Pages**.
4. Under **Build and deployment** > **Source**, select `Deploy from a branch` and choose `main` branch.
5. Click **Save**. Your site will be live at `https://YOUR_GITHUB_USERNAME.github.io/chronos` in ~60 seconds!

---

### Option 2: Vercel (Free `chronos.vercel.app`)

1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New** > **Project** and import your `chronos` GitHub repository.
3. Leave build settings default and click **Deploy**.
4. Vercel will instantly host your app at `https://chronos.vercel.app` with zero configuration needed.

---

## Local Development & Testing

To test locally on your machine, simply launch Python's built-in web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
