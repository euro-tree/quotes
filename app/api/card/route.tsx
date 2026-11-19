import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { BRAND, getFormat, getQuote, getTheme, quoteFontScale } from '@/lib/cards'

export const runtime = 'nodejs'

type FontEntry = {
  name: string
  data: ArrayBuffer
  weight: 400 | 500 | 600
  style: 'normal' | 'italic'
}

async function loadGoogleFont(family: string, weight: number, italic: boolean) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:ital,wght@${italic ? 1 : 0},${weight}`
  const css = await (await fetch(url)).text()
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!match) throw new Error(`Font not found: ${family}`)
  const res = await fetch(match[1])
  if (!res.ok) throw new Error(`Font download failed: ${family}`)
  return res.arrayBuffer()
}

let fontsPromise: Promise<FontEntry[]> | null = null

function getFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadGoogleFont('Cormorant Garamond', 500, true),
      loadGoogleFont('Inter', 500, false),
    ])
      .then(([serif, sans]): FontEntry[] => [
        { name: 'Cormorant', data: serif, weight: 500, style: 'italic' },
        { name: 'Inter', data: sans, weight: 500, style: 'normal' },
      ])
      .catch((error) => {
        console.error('[v0] Failed to load card fonts:', error)
        fontsPromise = null
        return []
      })
  }
  return fontsPromise
}

const imageCache = new Map<string, string>()

async function getBackground(publicPath: string) {
  const cached = imageCache.get(publicPath)
  if (cached) return cached
  const file = await readFile(path.join(process.cwd(), 'public', publicPath))
  const dataUri = `data:image/png;base64,${file.toString('base64')}`
  imageCache.set(publicPath, dataUri)
  return dataUri
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const quote = getQuote(searchParams.get('q'))
  if (!quote) return new Response('Quote not found', { status: 404 })

  const theme = getTheme(searchParams.get('theme') ?? quote.theme)
  const format = getFormat(searchParams.get('format'))
  const { width: W, height: H } = format

  const [fonts, background] = await Promise.all([getFonts(), getBackground(theme.image)])
  const fontSize = Math.round(W * quoteFontScale(quote.text, format.id))
  const pad = Math.round(W * 0.09)

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background}
          alt=""
          width={W}
          height={H}
          style={{ position: 'absolute', top: 0, left: 0, width: W, height: H, objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: W, height: H, display: 'flex', backgroundImage: theme.overlay }} />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: W,
            height: H,
            padding: pad,
            color: theme.text,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontSize: Math.round(W * 0.02),
              letterSpacing: Math.round(W * 0.006),
              textTransform: 'uppercase',
              color: theme.accent,
            }}
          >
            {quote.category}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Cormorant',
                fontStyle: 'italic',
                fontSize: Math.round(W * 0.18),
                lineHeight: 0.8,
                height: Math.round(W * 0.1),
                color: theme.accent,
              }}
            >
              {'\u201C'}
            </div>
            <div
              style={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                fontFamily: 'Cormorant',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize,
                lineHeight: 1.18,
                textWrap: 'balance',
              }}
            >
              {quote.text}
            </div>
            <div
              style={{
                display: 'flex',
                width: Math.round(W * 0.08),
                height: 2,
                backgroundColor: theme.accent,
                marginTop: Math.round(W * 0.055),
                marginBottom: Math.round(W * 0.035),
              }}
            />
            <div
              style={{
                display: 'flex',
                fontFamily: 'Inter',
                fontSize: Math.round(W * 0.024),
                letterSpacing: Math.round(W * 0.005),
                textTransform: 'uppercase',
              }}
            >
              {quote.author}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Cormorant',
              fontStyle: 'italic',
              fontSize: Math.round(W * 0.03),
              opacity: 0.85,
            }}
          >
            {BRAND}
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    },
  )
}
