import { type Config } from 'tailwindcss';

import baseConfig from '@targett/tailwind-config';

export default {
  darkMode: ['class'],
  presets: [baseConfig],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        geist: {
          DEFAULT: '#000',
          bg: '#000',
          fg: '#fff'
        },
        accent: {
          100: '#111',
          200: '#333',
          300: '#444',
          400: '#666',
          500: '#888',
          600: '#999',
          700: '#eaeaea',
          800: '#fafafa'
        },
        error: {
          lighter: '#f7d4d6',
          light: '#f33',
          DEFAULT: 'red',
          dark: '#e60000'
        },
        success: {
          lighter: '#d3e5ff',
          light: '#3291ff',
          DEFAULT: '#0070f3',
          dark: '#0761d1'
        },
        warning: {
          lighter: '#ffefcf',
          light: '#f7b955',
          DEFAULT: '#f5a623',
          dark: '#ab570a'
        },
        violet: {
          lighter: '#d8ccf1',
          light: '#8a63d2',
          DEFAULT: '#7928ca',
          dark: '#4c2889'
        },
        cyan: {
          lighter: '#aaffec',
          light: '#79ffe1',
          DEFAULT: '#50e3c2',
          dark: '#29bc9b'
        },
        highlight: {
          purple: '#f81ce5',
          magenta: '#eb367f',
          pink: '#ff0080',
          yellow: '#fff500'
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' }
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' }
          },
          flash: {
            '0%': { opacity: '0.2' },
            '20%': { opacity: '1' },
            '100%': { opacity: '0.2' }
          }
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          flash: 'flash 1.4s infinite linear'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
