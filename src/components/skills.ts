/**
 * Skills Component
 * 
 * Displays all API methods/skills
 */

import type { AgentCard, AgentSkill } from '../types.js'
import type { Theme } from '../themes/types.js'

export function renderSkills(agentCard: AgentCard, theme: Theme): string {
    const { skills } = agentCard

    if (!skills || skills.length === 0) {
        return ''
    }

    const skillCards = skills.map(skill => renderSkillCard(skill)).join('')

    return `
    <section>
      <h2>🔧 API Methods</h2>
      ${skillCards}
    </section>`
}

function renderSkillCard(skill: AgentSkill): string {
    const tags = skill.tags?.length
        ? `<div class="skill-tags">${skill.tags.map(t => `<span class="skill-tag">${escapeHtml(t)}</span>`).join('')}</div>`
        : ''

    return `
    <div class="endpoint">
      <strong>${escapeHtml(skill.name)}</strong>
      <p style="color: var(--text-dim); margin: 0.5rem 0;">${escapeHtml(skill.description)}</p>
      <code>method: "${escapeHtml(skill.id)}"</code>
      ${tags}
    </div>`
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
