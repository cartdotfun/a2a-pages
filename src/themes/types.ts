/**
 * Theme Interface
 * 
 * Defines the color scheme and typography for landing pages
 */

export interface Theme {
    colors: {
        bg: string
        surface: string
        border: string
        text: string
        textDim: string
        accent: string
        accentDim: string
        codeBg: string
    }
    fonts: {
        heading: string
        body: string
        mono: string
    }
}
