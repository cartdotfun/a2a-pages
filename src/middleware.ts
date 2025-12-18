/**
 * Express Middleware Factory
 * 
 * Creates an Express request handler that serves the agent landing page
 */

import type { Request, Response, RequestHandler } from 'express'
import { readFileSync } from 'node:fs'
import { generateLandingPage, type GeneratorOptions } from './generator.js'
import type { AgentCard } from './types.js'

export type AgentCardInput = string | AgentCard

export interface MiddlewareOptions extends GeneratorOptions {
    // Cache the generated HTML (default: true in production)
    cache?: boolean
}

/**
 * Creates an Express middleware that serves a beautiful landing page
 * 
 * @param agentCardInput - Path to agent-card.json or the agent card object itself
 * @param options - Customization options for the landing page
 * 
 * @example
 * // Using file path
 * app.get('/', createAgentLanding('./agent-card.json'))
 * 
 * @example
 * // Using agent card object
 * app.get('/', createAgentLanding(agentCard, { theme: 'light' }))
 * 
 * @example
 * // With customization
 * app.get('/', createAgentLanding('./agent-card.json', {
 *   theme: 'dark',
 *   showPaymentFlow: true,
 *   footer: {
 *     links: [{ label: 'GitHub', url: 'https://github.com/...' }]
 *   }
 * }))
 */
export function createAgentLanding(
    agentCardInput: AgentCardInput,
    options: MiddlewareOptions = {}
): RequestHandler {
    const shouldCache = options.cache ?? process.env.NODE_ENV === 'production'
    let cachedHtml: string | null = null

    return async (req: Request, res: Response) => {
        try {
            // Return cached HTML if available
            if (shouldCache && cachedHtml) {
                res.type('html').send(cachedHtml)
                return
            }

            // Load agent card from file or use provided object
            const agentCard = await loadAgentCard(agentCardInput)

            // Generate the landing page HTML
            const html = generateLandingPage(agentCard, options)

            // Cache the result if caching is enabled
            if (shouldCache) {
                cachedHtml = html
            }

            res.type('html').send(html)
        } catch (error) {
            console.error('[agent-landing] Error generating landing page:', error)
            res.status(500).send('Error generating landing page')
        }
    }
}

async function loadAgentCard(input: AgentCardInput): Promise<AgentCard> {
    if (typeof input === 'object') {
        return input
    }

    // Input is a file path
    try {
        const content = readFileSync(input, 'utf-8')
        return JSON.parse(content) as AgentCard
    } catch (error) {
        throw new Error(`Failed to load agent card from ${input}: ${error}`)
    }
}

/**
 * Invalidate the cached landing page HTML
 * Useful when the agent card is updated at runtime
 */
export function clearLandingCache(): void {
    // This is a no-op since the cache is per-middleware instance
    // But we expose it for future use if we add global caching
    console.log('[agent-landing] Cache clearing is per-middleware instance')
}
