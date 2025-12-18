/**
 * Payment Flow Component
 * 
 * Explains the x402 payment flow
 */

import type { AgentCard } from '../types.js'
import type { Theme } from '../themes/types.js'

export function renderPaymentFlow(agentCard: AgentCard, theme: Theme): string {
    return `
    <section>
      <h2>💳 x402 Payment Flow</h2>
      <ol style="color: var(--text-dim); padding-left: 1.5rem;">
        <li>Send request to <code>/a2a</code></li>
        <li>Receive <code>402 Payment Required</code> with payment details</li>
        <li>Sign USDC authorization using x402 library</li>
        <li>Retry request with <code>X-PAYMENT</code> header</li>
        <li>Receive data ✅</li>
      </ol>
      <p style="margin-top: 1rem; color: var(--text-dim);">
        Use the <a href="https://www.npmjs.com/package/x402" target="_blank">x402</a> library to handle payments automatically.
      </p>
    </section>`
}
