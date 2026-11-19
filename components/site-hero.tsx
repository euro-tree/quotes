import { ArrowDown } from 'lucide-react'
import { QuoteCardPreview } from '@/components/quote-card-preview'
import { getQuote, getTheme } from '@/lib/cards'

const featured = ['stars', 'seeking', 'pace-of-nature'] as const

export function SiteHero() {
  const cards = featured.map((id) => getQuote(id)!)

  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Wisdom, beautifully made</p>
        <h1 className="font-serif text-5xl italic leading-[1.05] text-balance md:text-7xl">
          Words worth sharing, in full HD.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          A curated collection of timeless quotes set on hand-picked backgrounds. Choose a format, download a crisp PNG,
          and share it anywhere in seconds.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span>Post · Square · Story</span>
          <span aria-hidden>·</span>
          <span>1080px PNG</span>
          <span aria-hidden>·</span>
          <span>Free to share</span>
        </div>
        <a
          href="#cards"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Browse the cards
          <ArrowDown className="size-4" aria-hidden />
        </a>
      </div>

      <div className="relative mx-auto flex w-full max-w-lg items-center justify-center py-6" aria-hidden>
        <div className="w-[44%] -rotate-6 translate-x-8 translate-y-6 overflow-hidden rounded-xl shadow-2xl">
          <QuoteCardPreview quote={cards[1]} theme={getTheme(cards[1].theme)} sizes="240px" />
        </div>
        <div className="relative z-10 w-[52%] overflow-hidden rounded-xl shadow-2xl">
          <QuoteCardPreview quote={cards[0]} theme={getTheme(cards[0].theme)} priority sizes="300px" />
        </div>
        <div className="w-[44%] rotate-6 -translate-x-8 translate-y-6 overflow-hidden rounded-xl shadow-2xl">
          <QuoteCardPreview quote={cards[2]} theme={getTheme(cards[2].theme)} sizes="240px" />
        </div>
      </div>
    </section>
  )
}
