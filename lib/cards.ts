export type Category = 'Wisdom' | 'Love' | 'Courage' | 'Calm' | 'Growth'

export const categories: Category[] = ['Wisdom', 'Love', 'Courage', 'Calm', 'Growth']

export type Theme = {
  id: string
  name: string
  image: string
  text: string
  accent: string
  overlay: string
}

export const themes: Theme[] = [
  {
    id: 'blush',
    name: 'Blush Petal',
    image: '/backgrounds/blush.png',
    text: '#3a1d28',
    accent: '#93445c',
    overlay: 'linear-gradient(180deg, rgba(255,242,245,0.55) 0%, rgba(255,236,240,0.35) 50%, rgba(255,242,245,0.6) 100%)',
  },
  {
    id: 'dusk',
    name: 'Ocean Dusk',
    image: '/backgrounds/dusk.png',
    text: '#fdf6ec',
    accent: '#f4c58a',
    overlay: 'linear-gradient(180deg, rgba(14,12,40,0.45) 0%, rgba(14,12,40,0.25) 50%, rgba(14,12,40,0.6) 100%)',
  },
  {
    id: 'sage',
    name: 'Sage Light',
    image: '/backgrounds/sage.png',
    text: '#1d2b22',
    accent: '#46644e',
    overlay: 'linear-gradient(180deg, rgba(240,244,236,0.5) 0%, rgba(240,244,236,0.3) 50%, rgba(240,244,236,0.55) 100%)',
  },
  {
    id: 'dune',
    name: 'Golden Dune',
    image: '/backgrounds/dune.png',
    text: '#fff8ef',
    accent: '#f6d3a1',
    overlay: 'linear-gradient(180deg, rgba(40,18,8,0.4) 0%, rgba(40,18,8,0.25) 50%, rgba(40,18,8,0.6) 100%)',
  },
  {
    id: 'forest',
    name: 'Misty Forest',
    image: '/backgrounds/forest.png',
    text: '#f1f5ee',
    accent: '#c9e3c0',
    overlay: 'linear-gradient(180deg, rgba(6,20,14,0.45) 0%, rgba(6,20,14,0.3) 50%, rgba(6,20,14,0.65) 100%)',
  },
  {
    id: 'marble',
    name: 'Noir Marble',
    image: '/backgrounds/marble.png',
    text: '#f7efe0',
    accent: '#d4af6a',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.45) 100%)',
  },
]

export type FormatId = 'post' | 'square' | 'story'

export type Format = {
  id: FormatId
  name: string
  hint: string
  width: number
  height: number
}

export const formats: Format[] = [
  { id: 'post', name: 'Post', hint: '4:5 · 1080×1350', width: 1080, height: 1350 },
  { id: 'square', name: 'Square', hint: '1:1 · 1080×1080', width: 1080, height: 1080 },
  { id: 'story', name: 'Story', hint: '9:16 · 1080×1920', width: 1080, height: 1920 },
]

export type Quote = {
  id: string
  text: string
  author: string
  category: Category
  theme: string
}

export const quotes: Quote[] = [
  { id: 'journey', text: 'The journey of a thousand miles begins with one step.', author: 'Lao Tzu', category: 'Growth', theme: 'dune' },
  { id: 'know-nothing', text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates', category: 'Wisdom', theme: 'marble' },
  { id: 'seeking', text: 'What you seek is seeking you.', author: 'Rumi', category: 'Love', theme: 'blush' },
  { id: 'nature-hurry', text: 'Nature does not hurry, yet everything is accomplished.', author: 'Lao Tzu', category: 'Calm', theme: 'sage' },
  { id: 'slowly', text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius', category: 'Growth', theme: 'forest' },
  { id: 'love-life', text: 'Where there is love there is life.', author: 'Mahatma Gandhi', category: 'Love', theme: 'dusk' },
  { id: 'love-all', text: 'Love all, trust a few, do wrong to none.', author: 'William Shakespeare', category: 'Love', theme: 'marble' },
  { id: 'do-what-you-can', text: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt', category: 'Courage', theme: 'dune' },
  { id: 'difficulty', text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', category: 'Courage', theme: 'dusk' },
  { id: 'through', text: 'The best way out is always through.', author: 'Robert Frost', category: 'Courage', theme: 'forest' },
  { id: 'all-your-heart', text: 'Wherever you go, go with all your heart.', author: 'Confucius', category: 'Love', theme: 'sage' },
  { id: 'pace-of-nature', text: 'Adopt the pace of nature: her secret is patience.', author: 'Ralph Waldo Emerson', category: 'Calm', theme: 'forest' },
  { id: 'beauty-light', text: 'Beauty is not in the face; beauty is a light in the heart.', author: 'Kahlil Gibran', category: 'Love', theme: 'blush' },
  { id: 'stars', text: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.', author: 'Marcus Aurelius', category: 'Wisdom', theme: 'dusk' },
  { id: 'soul-color', text: 'The soul becomes dyed with the color of its thoughts.', author: 'Marcus Aurelius', category: 'Wisdom', theme: 'sage' },
  { id: 'difference', text: 'Act as if what you do makes a difference. It does.', author: 'William James', category: 'Courage', theme: 'marble' },
  { id: 'happiness', text: 'Happiness depends upon ourselves.', author: 'Aristotle', category: 'Calm', theme: 'blush' },
  { id: 'grace', text: 'Courage is grace under pressure.', author: 'Ernest Hemingway', category: 'Courage', theme: 'dune' },
  { id: 'still-water', text: 'Muddy water, let stand, becomes clear.', author: 'Lao Tzu', category: 'Calm', theme: 'dusk' },
  { id: 'well-done', text: 'Well done is better than well said.', author: 'Benjamin Franklin', category: 'Growth', theme: 'sage' },
  { id: 'begin', text: 'The secret of getting ahead is getting started.', author: 'Mark Twain', category: 'Growth', theme: 'blush' },
  { id: 'wounds', text: 'The wound is the place where the Light enters you.', author: 'Rumi', category: 'Wisdom', theme: 'forest' },
  { id: 'simplicity', text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', category: 'Wisdom', theme: 'marble' },
  { id: 'present', text: 'Forever is composed of nows.', author: 'Emily Dickinson', category: 'Calm', theme: 'sage' },
]

export function getTheme(id: string | null | undefined): Theme {
  return themes.find((t) => t.id === id) ?? themes[0]
}

export function getFormat(id: string | null | undefined): Format {
  return formats.find((f) => f.id === id) ?? formats[0]
}

export function getQuote(id: string | null | undefined): Quote | undefined {
  return quotes.find((q) => q.id === id)
}

/** Font size as a fraction of the card width, so previews and HD renders match. */
export function quoteFontScale(text: string, format: FormatId): number {
  const len = text.length
  let scale = len < 40 ? 0.084 : len < 60 ? 0.074 : len < 90 ? 0.064 : 0.056
  if (format === 'square') scale *= 0.9
  return scale
}

export function cardImageUrl(quoteId: string, themeId: string, format: FormatId) {
  const params = new URLSearchParams({ q: quoteId, theme: themeId, format })
  return `/api/card?${params.toString()}`
}

export const BRAND = 'Lumen'
