import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#05003E',
        secondary: '#A5A5A5',
        'secondary-grey': '#FBFBFB',
        'secondary-grey-text': '#A5A5A5',
      },
      screens: {
        xs: '420px',
      },
      fontFamily: {
        sans: ['var(--font-cormorant-infant)', ...defaultTheme.fontFamily.sans],
        manrope: 'var(--font-manrope)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      brightness: {
        0: '0',
      },
      invert: {
        1: '1',
      },
      keyframes: {
        dropIn: {
          '0%': {transform: 'translateY(-100%)', opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'},
        },
      },
      animation: {
        dropIn: 'dropIn 250ms ease-in-out 1',
      },
    },
  },
  plugins: [],
}
export default config
