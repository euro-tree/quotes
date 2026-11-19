'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Copy, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { QuoteCardPreview } from '@/components/quote-card-preview'
import { copyQuote, downloadCard, shareCard } from '@/lib/card-actions'
import { type FormatId, type Quote, formats, getTheme, themes } from '@/lib/cards'
import { cn } from '@/lib/utils'

type Props = {
  quote: Quote | null
  onOpenChange: (open: boolean) => void
}

export function CardStudioDialog({ quote, onOpenChange }: Props) {
  return (
    <Dialog open={quote !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-0 sm:max-w-4xl">
        {quote && <StudioBody key={quote.id} quote={quote} />}
      </DialogContent>
    </Dialog>
  )
}

function StudioBody({ quote }: { quote: Quote }) {
  const [themeId, setThemeId] = useState(quote.theme)
  const [format, setFormat] = useState<FormatId>('post')
  const [busy, setBusy] = useState<'download' | 'share' | null>(null)
  const theme = getTheme(themeId)

  async function run(kind: 'download' | 'share') {
    setBusy(kind)
    await (kind === 'download' ? downloadCard(quote, themeId, format) : shareCard(quote, themeId, format))
    setBusy(null)
  }

  return (
    <div className="grid md:grid-cols-[1.1fr_1fr]">
      <div className="flex items-center justify-center bg-muted p-6 md:rounded-l-xl">
        <QuoteCardPreview
          quote={quote}
          theme={theme}
          format={format}
          priority
          sizes="(min-width: 768px) 420px, 90vw"
          className={cn(
            'rounded-lg shadow-xl transition-all',
            format === 'story' ? 'max-w-[260px]' : format === 'square' ? 'max-w-[400px]' : 'max-w-[360px]',
          )}
        />
      </div>

      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-1.5 pr-8">
          <DialogTitle className="font-serif text-2xl italic leading-tight">Customize your card</DialogTitle>
          <DialogDescription>
            {quote.author} · {quote.category}
          </DialogDescription>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">Format</legend>
          <div className="grid grid-cols-3 gap-2">
            {formats.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={format === f.id}
                onClick={() => setFormat(f.id)}
                className={cn(
                  'flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  format === f.id ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
                )}
              >
                <span className="text-sm font-medium">{f.name}</span>
                <span className={cn('text-[11px]', format === f.id ? 'opacity-80' : 'text-muted-foreground')}>
                  {f.hint}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Background · <span className="normal-case tracking-normal">{theme.name}</span>
          </legend>
          <div className="grid grid-cols-6 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={themeId === t.id}
                aria-label={t.name}
                title={t.name}
                onClick={() => setThemeId(t.id)}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-md ring-offset-2 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  themeId === t.id ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100',
                )}
              >
                <Image src={t.image} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-auto flex flex-col gap-2">
          <Button size="lg" className="h-11" onClick={() => run('download')} disabled={busy !== null}>
            <Download aria-hidden />
            {busy === 'download' ? 'Rendering…' : 'Download HD image'}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="lg" className="h-11" onClick={() => run('share')} disabled={busy !== null}>
              <Share2 aria-hidden />
              {busy === 'share' ? 'Preparing…' : 'Share'}
            </Button>
            <Button variant="outline" size="lg" className="h-11" onClick={() => copyQuote(quote)}>
              <Copy aria-hidden />
              Copy text
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">PNG · full HD, ready for Instagram, Pinterest & more</p>
        </div>
      </div>
    </div>
  )
}
