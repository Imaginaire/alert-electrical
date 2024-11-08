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
        primary: '#15387D',
        secondary: '#00B007',
        'secondary-grey': '#F2F2F2',
        'secondary-grey-text': '#4F4E4E',
        'secondary-blue': '#2145C4',
        'secondary-green-hover': '#16a34a',
      },
      screens: {
        xs: '420px',
      },
      fontFamily: {
        sans: ['var(--font-cormorant-infant)', ...defaultTheme.fontFamily.sans],
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
