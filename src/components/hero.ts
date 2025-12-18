/**
 * Hero Component
 * 
 * Displays agent name, description, and badges
 */

import type { AgentCard } from '../types.js'
import type { Theme } from '../themes/types.js'

export function renderHero(agentCard: AgentCard, theme: Theme): string {
    const { name, description, version, pricing } = agentCard

    return `
    <header>
      <h1>🔮 ${escapeHtml(name)}</h1>
      <p class="tagline">${escapeHtml(description)}</p>
      <div class="badges">
        <span class="badge">v${escapeHtml(version)}</span>
        <span class="badge accent">💰 ${escapeHtml(pricing?.price || '$0.001')} ${escapeHtml(pricing?.currency || 'USDC')}</span>
        <span class="badge">${escapeHtml(pricing?.network || 'base')}</span>
        <span class="badge">x402</span>
      </div>
    </header>`
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
