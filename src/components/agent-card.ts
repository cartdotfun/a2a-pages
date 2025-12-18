/**
 * Agent Card Component
 * 
 * Links to the .well-known/agent-card.json endpoint
 */

import type { AgentCard } from '../types.js'
import type { Theme } from '../themes/types.js'

export function renderAgentCardSection(agentCard: AgentCard, theme: Theme): string {
    const { url } = agentCard

    return `
    <section>
      <h2>📋 Agent Card</h2>
      <p style="color: var(--text-dim);">Machine-readable metadata at:</p>
      <pre><a href="${escapeHtml(url)}/.well-known/agent-card.json">${escapeHtml(url)}/.well-known/agent-card.json</a></pre>
    </section>`
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
