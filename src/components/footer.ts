/**
 * Footer Component
 * 
 * Displays cart.fun and x402 attribution with optional custom links
 */

import type { Theme } from '../themes/types.js'

export interface FooterLink {
    label: string
    url: string
}

export interface FooterOptions {
    links?: FooterLink[]
}

export function renderFooter(options?: FooterOptions): string {
    const customLinks = options?.links?.length
        ? `<p style="margin-bottom: 0.5rem;">${options.links.map(link =>
            `<a href="${escapeHtml(link.url)}" target="_blank">${escapeHtml(link.label)}</a>`
        ).join(' · ')}</p>`
        : ''

    return `
    <footer>
      ${customLinks}
      <p>Built with <a href="https://cart.fun" target="_blank">cart.fun</a> · Powered by <a href="https://x402.org" target="_blank">x402</a></p>
    </footer>`
}

function escapeHtml(str: string | undefined): string {
    if (!str) return ''
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}
