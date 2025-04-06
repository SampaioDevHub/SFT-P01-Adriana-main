/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './(pages)/**/*.{ts,tsx}',
    './_components/**/*.{ts,tsx}',
    './_constants/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.75', scale: '0.9' },
          '50%': { opacity: '1', scale: '1' },
        },
      },
      animation: {
        sparkle: 'sparkle 2s ease-in-out infinite',
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.125rem' }],   // 12px → 16px
        'sm': ['1rem', { lineHeight: '1.375rem' }],       // 14px → 18px
        'base': ['1.125rem', { lineHeight: '1.625rem' }], // 16px → 20px
        'lg': ['1.25rem', { lineHeight: '1.875rem' }],    // 18px → 22px
        'xl': ['1.375rem', { lineHeight: '2rem' }],       // 20px → 24px
        '2xl': ['1.75rem', { lineHeight: '2.25rem' }],    // 24px → 28px
        '3xl': ['2.125rem', { lineHeight: '2.5rem' }],    // 30px → 34px
        '4xl': ['2.5rem', { lineHeight: '2.75rem' }],     // 36px → 40px
        '5xl': ['3.25rem', { lineHeight: '1' }],          // 48px → 52px
        '6xl': ['4rem', { lineHeight: '1' }],             // 60px → 64px
        '7xl': ['4.75rem', { lineHeight: '1' }],          // 72px → 76px
        '8xl': ['6.25rem', { lineHeight: '1' }],          // 96px → 100px
        '9xl': ['8.25rem', { lineHeight: '1' }],          // 128px → 132px
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
