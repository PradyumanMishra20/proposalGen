/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        slate: {
          950: '#0B0F19',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc'
        },
        // Custom colors for better dark mode
        dark: {
          bg: '#0f172a',
          bgSecondary: '#1e293b',
          bgTertiary: '#334155',
          text: '#f8fafc',
          textSecondary: '#cbd5e1',
          textTertiary: '#94a3b8',
          border: '#334155',
          borderSecondary: '#475569'
        },
        light: {
          bg: '#ffffff',
          bgSecondary: '#f8fafc',
          bgTertiary: '#f1f5f9',
          text: '#0f172a',
          textSecondary: '#334155',
          textTertiary: '#64748b',
          border: '#e2e8f0',
          borderSecondary: '#cbd5e1'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'theme-toggle': 'themeToggle 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        themeToggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' }
        }
      }
    },
  },
  plugins: [],
}
