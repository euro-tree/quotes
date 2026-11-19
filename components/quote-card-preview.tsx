import Image from 'next/image'
import { BRAND, type FormatId, type Quote, type Theme, getFormat, quoteFontScale } from '@/lib/cards'
import { cn } from '@/lib/utils'

type Props = {
  quote: Quote
  theme: Theme
  format?: FormatId
  className?: string
  priority?: boolean
  sizes?: string
}

/** CSS mirror of the HD render in /api/card. Sizes use container-width units so it scales to any size. */
export function QuoteCardPreview({ quote, theme, format = 'post', className, priority, sizes }: Props) {
  const { width, height } = getFormat(format)
  const scale = quoteFontScale(quote.text, format)
  const cq = (n: number) => `${(n * 100).toFixed(3)}cqw`

  return (
    <div
      className={cn('@container relative w-full overflow-hidden', className)}
      style={{ aspectRatio: `${width} / ${height}`, color: theme.text }}
    >
      <Image
        src={theme.image}
        alt=""
        fill
        priority={priority}
        sizes={sizes ?? '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: theme.overlay }} />
      <figure
        className="relative flex h-full flex-col items-center justify-between text-center"
        style={{ padding: cq(0.09) }}
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: cq(0.02), letterSpacing: cq(0.006), color: theme.accent }}
        >
          {quote.category}
        </span>

        <div className="flex flex-col items-center">
          <span
            aria-hidden
            className="font-serif italic"
            style={{ fontSize: cq(0.18), lineHeight: 0.8, height: cq(0.1), color: theme.accent }}
          >
            {'\u201C'}
          </span>
          <blockquote
            className="font-serif font-medium italic text-balance"
            style={{ fontSize: cq(scale), lineHeight: 1.18 }}
          >
            {quote.text}
          </blockquote>
          <span
            aria-hidden
            style={{
              width: cq(0.08),
              height: '1px',
              backgroundColor: theme.accent,
              marginTop: cq(0.055),
              marginBottom: cq(0.035),
            }}
          />
          <figcaption className="font-sans uppercase" style={{ fontSize: cq(0.024), letterSpacing: cq(0.005) }}>
            {quote.author}
          </figcaption>
        </div>

        <span aria-hidden className="font-serif italic" style={{ fontSize: cq(0.03), opacity: 0.85 }}>
          {BRAND}
        </span>
      </figure>
    </div>
  )
}
