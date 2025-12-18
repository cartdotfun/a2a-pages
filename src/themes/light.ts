/**
 * Light Theme
 * 
 * Clean light theme variant with subtle grays and green accents
 */

import type { Theme } from './types.js'

export const lightTheme: Theme = {
    colors: {
        bg: '#fafafa',
        surface: '#ffffff',
        border: '#e4e4e7',
        text: '#18181b',
        textDim: '#71717a',
        accent: '#16a34a',
        accentDim: '#dcfce7',
        codeBg: '#f4f4f5'
    },
    fonts: {
        heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'JetBrains Mono', 'Fira Code', monospace"
    }
}
