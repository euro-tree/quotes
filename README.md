# ✨ Lumen — Quote Cards Worth Sharing

> **Words worth sharing, beautifully made.**

Lumen is a thoughtfully curated quote card studio built with Next.js. Discover timeless words, explore hand-picked themes, customize the format, and export crisp 1080px PNG cards for social media.

🌐 **Live website:** https://aesthetica-azure.vercel.app

---

## 🖼️ Highlights

- 📚 **24 curated quotes** across Wisdom, Love, Courage, Calm, and Growth
- 🎨 **6 atmospheric themes** including Blush Petal, Ocean Dusk, and Misty Forest
- 📐 **3 sharing formats:** Post, Square, and Story
- 🖌️ **Live Card Studio** for changing themes and formats
- 🎲 **Surprise me** for a random quote
- 🔍 **Category filters** for focused browsing
- ⬇️ **High-definition PNG downloads** at 1080px
- 📱 **Responsive, accessible interface**
- ⚡ Built with the Next.js App Router and React

---

## ✨ The Experience

### 🌅 Featured collection

A polished hero introduces the Lumen experience with beautifully stacked quote cards.

### 🗂️ Find your words

Browse the collection or filter by a theme:

| Category | Mood |
|---|---|
| 🦉 Wisdom | Reflect and understand |
| 💗 Love | Connect and appreciate |
| 🛡️ Courage | Take the next brave step |
| 🌿 Calm | Slow down and breathe |
| 🌱 Growth | Begin, learn, and continue |

### 🖌️ Make it yours

Open the Card Studio to choose a visual theme and the format you need:

- **Post:** 4:5 — `1080 × 1350`
- **Square:** 1:1 — `1080 × 1080`
- **Story:** 9:16 — `1080 × 1920`

The resulting PNG is ready to share anywhere.

---

## 🧰 Tech Stack

- **Framework:** Next.js 16
- **UI library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** shadcn-style Base UI components
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Package manager:** pnpm
- **Analytics:** Vercel Analytics

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm

### 1️⃣ Clone the project

```bash
git clone https://github.com/euro-tree/quotes.git
cd quotes
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Start the development server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

---

## 📦 Available Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the local development server |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Run the production build |

---

## 🗂️ Project Structure

```text
app/             Next.js App Router pages, layouts, and API routes
components/      Quote gallery, hero, card studio, previews, and UI components
lib/             Quote, theme, format, and card-generation definitions
public/          Static assets and background images
```

---

## 🎨 Customizing Lumen

Quotes and themes live in `lib/cards.ts`.

### Add a theme

Add an entry to the `themes` array with:

- A unique `id`
- A display `name`
- A background `image` path
- Text and accent colors
- A gradient overlay

### Add a quote

Add an entry to the `quotes` array with:

- A unique `id`
- The quote `text`
- The `author`
- A `category`
- A matching theme `id`

You can place background artwork in `public/backgrounds/` and reference it from the theme configuration.

---

## ☁️ Deployment

Lumen can be deployed to Vercel in a few clicks:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Use the detected Next.js settings.
4. Deploy.

No environment variables are currently required.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Make and test your changes
4. Open a pull request

Please keep quote additions family-friendly and verify each attribution before submitting.

---

## 📄 License

No license has been added to this repository yet. Please contact the repository owner before using its code or assets in another project.

---

<div align="center">

### ✍️ *Timeless words. Beautifully framed.*

Built with Next.js, React, and a little reverence for language.

</div>
