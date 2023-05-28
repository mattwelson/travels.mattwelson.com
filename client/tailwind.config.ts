import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', ...defaultTheme.fontFamily.serif],
        sans: ['Rubik', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateColumns: {
        layout: '1fr min(65ch,calc(100% - 4rem)) 1fr'
      },
      
    },
  },
  plugins: [require('@tailwindcss/typography'),],
} satisfies Config

