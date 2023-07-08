import type { Config } from 'tailwindcss';

import baseConfig from '@targett/tailwind-config';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.tsx'],
  presets: [baseConfig],
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
          background: '#000',
          foreground: '#fff'
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
        purple: {
          '050': '#f9f8ff',
          100: '#eeeaff',
          200: '#d4c9fe',
          300: '#b7a5fb',
          400: '#a18bf5',
          500: '#8467f3',
          600: '#5e49af',
          700: '#4b3990',
          800: '#3e1f75',
          900: '#27124a',
          950: '#180636'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))'
        // },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
        flash: 'flash 1.4s infinite linear;'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
