/**
 * A2A Agent Card Types
 * 
 * Based on the A2A protocol specification for agent discovery
 */

export interface AgentSkill {
    id: string
    name: string
    description: string
    tags?: string[]
    examples?: string[]
    inputSchema?: Record<string, unknown>
    outputSchema?: Record<string, unknown>
}

export interface SupportedSymbols {
    crypto?: { source: string; symbols: string[] }
    equity?: { source: string; symbols: string[] }
    cryptoFallback?: { source: string; symbols: string[] }
    [key: string]: { source: string; symbols: string[] } | undefined
}

export interface PricingInfo {
    model: string
    price: string
    currency: string
    network: string
}

export interface AgentCard {
    name: string
    description: string
    url: string
    version: string
    skills: AgentSkill[]
    supportedSymbols?: SupportedSymbols
    pricing?: PricingInfo
    capabilities?: {
        streaming?: boolean
        pushNotifications?: boolean
        stateTransitionHistory?: boolean
    }
    authentication?: {
        schemes: string[]
        credentials?: unknown
    }
    defaultInputModes?: string[]
    defaultOutputModes?: string[]
}
