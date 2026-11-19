'use client'

import { useMemo, useState } from 'react'
import { Download, Shuffle, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardStudioDialog } from '@/components/card-studio-dialog'
import { QuoteCardPreview } from '@/components/quote-card-preview'
import { downloadCard } from '@/lib/card-actions'
import { type Category, type Quote, categories, getTheme, quotes } from '@/lib/cards'
import { cn } from '@/lib/utils'

type Filter = 'All' | Category

export function CardGallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [active, setActive] = useState<Quote | null>(null)

  const visible = useMemo(
    () => (filter === 'All' ? quotes : quotes.filter((q) => q.category === filter)),
    [filter],
  )

  function openRandom() {
    setActive(quotes[Math.floor(Math.random() * quotes.length)])
  }

  return (
    <section id="cards" aria-labelledby="cards-heading" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col gap-6 border-t pt-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 id="cards-heading" className="font-serif text-4xl italic text-balance md:text-5xl">
            The collection
          </h2>
          <p className="text-muted-foreground">
            {visible.length} cards · tap any card to change its background and format.
          </p>
        </div>
        <Button variant="outline" onClick={openRandom} className="self-start md:self-auto">
          <Shuffle aria-hidden />
          Surprise me
        </Button>
      </div>

      <div role="group" aria-label="Filter by theme" className="mt-8 flex flex-wrap gap-2">
        {(['All', ...categories] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              filter === c ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((quote) => (
          <li key={quote.id} className="group flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActive(quote)}
              aria-label={`Customize card: ${quote.text} by ${quote.author}`}
              className="overflow-hidden rounded-xl shadow-sm ring-1 ring-foreground/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <QuoteCardPreview quote={quote} theme={getTheme(quote.theme)} />
            </button>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm text-muted-foreground">{quote.author}</span>
              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Customize card by ${quote.author}`}
                  onClick={() => setActive(quote)}
                >
                  <SlidersHorizontal aria-hidden />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Download HD card by ${quote.author}`}
                  onClick={() => downloadCard(quote, quote.theme, 'post')}
                >
                  <Download aria-hidden />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <CardStudioDialog quote={active} onOpenChange={(open) => !open && setActive(null)} />
    </section>
  )
}
