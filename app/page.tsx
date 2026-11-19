import { CardGallery } from '@/components/card-gallery'
import { SiteHero } from '@/components/site-hero'
import { BRAND } from '@/lib/cards'

export default function Page() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
        <a href="/" className="font-serif text-2xl italic">
          {BRAND}
        </a>
        <nav aria-label="Primary">
          <a href="#cards" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Collection
          </a>
        </nav>
      </header>
      <main>
        <SiteHero />
        <CardGallery />
      </main>
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <span className="font-serif text-lg italic text-foreground">{BRAND}</span>
          <span>Timeless words, made to be shared.</span>
        </div>
      </footer>
    </>
  )
}
