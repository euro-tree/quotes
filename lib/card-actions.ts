'use client'

import { toast } from 'sonner'
import { type FormatId, type Quote, cardImageUrl } from '@/lib/cards'

async function fetchCardFile(quote: Quote, themeId: string, format: FormatId) {
  const res = await fetch(cardImageUrl(quote.id, themeId, format))
  if (!res.ok) throw new Error('Could not render the card')
  const blob = await res.blob()
  return new File([blob], `lumen-${quote.id}-${format}.png`, { type: 'image/png' })
}

export async function downloadCard(quote: Quote, themeId: string, format: FormatId) {
  const id = toast.loading('Rendering HD card…')
  try {
    const file = await fetchCardFile(quote, themeId, format)
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    toast.success('Card downloaded', { id, description: file.name })
  } catch {
    toast.error('Download failed. Please try again.', { id })
  }
}

export async function shareCard(quote: Quote, themeId: string, format: FormatId) {
  const caption = `\u201C${quote.text}\u201D \u2014 ${quote.author}`
  try {
    const file = await fetchCardFile(quote, themeId, format)
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: quote.author, text: caption })
      return
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
  }

  const imageLink = new URL(cardImageUrl(quote.id, themeId, format), window.location.origin).toString()
  try {
    await navigator.clipboard.writeText(`${caption}\n${imageLink}`)
    toast.success('Caption and image link copied', {
      description: 'Paste it into any app, or download the HD image to post it.',
    })
  } catch {
    toast.error('Sharing is not supported here. Try downloading instead.')
  }
}

export async function copyQuote(quote: Quote) {
  try {
    await navigator.clipboard.writeText(`\u201C${quote.text}\u201D \u2014 ${quote.author}`)
    toast.success('Quote copied to clipboard')
  } catch {
    toast.error('Could not copy the quote')
  }
}
