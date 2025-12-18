/**
 * Symbols Component
 * 
 * Displays supported symbols organized by source
 * Only renders if supportedSymbols exists in agent card
 */

import type { AgentCard } from '../types.js'
import type { Theme } from '../themes/types.js'

export function renderSymbols(agentCard: AgentCard, theme: Theme): string {
    const { supportedSymbols } = agentCard

    if (!supportedSymbols) {
        return ''
    }

    const sections: string[] = []

    // Render each symbol category
    for (const [key, category] of Object.entries(supportedSymbols)) {
        if (!category?.symbols?.length) continue

        const title = formatCategoryTitle(key, category.source)
        const symbolGrid = category.symbols
            .map(s => `<div class="symbol">${escapeHtml(s)}</div>`)
            .join('')

        sections.push(`
      <h3>${escapeHtml(title)}</h3>
      <div class="symbol-grid">
        ${symbolGrid}
      </div>`)
    }

    if (sections.length === 0) {
        return ''
    }

    return `
    <section>
      <h2>📊 Supported Symbols</h2>
      ${sections.join('')}
    </section>`
}

function formatCategoryTitle(key: string, source: string): string {
    // Convert camelCase to Title Case and append source
    const title = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()

    return `${title} (${source})`
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
