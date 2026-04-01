/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'hud-gold': '#fbbf24',
        'radar-cyan': '#22d3ee',
        'space-bg': '#05070d',
        'system-green': '#10b981',
        'critical-red': '#ef4444',
        'terminal-green': '#0d9488',
        'terminal-teal': '#0d9488',
        'terminal-teal-hover': '#14b8a6',
        'terminal-teal-glow': '#2dd4bf',
        'terminal-teal-muted': '#134e4a',
        'terminal-board': '#0b1120',
        'terminal-dim': '#111827',
        'terminal-text': '#e5e7eb',
        'terminal-muted': '#9ca3af'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        space: ['var(--font-space)', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.1)' },
        },
        'flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
      boxShadow: {
        'terminal-glow': '0 0 15px rgba(13, 148, 136, 0.1)',
        'terminal-glow-hover': '0 0 20px rgba(20, 184, 166, 0.3)',
        'teal-glow': '0 0 20px rgba(13, 148, 136, 0.2)',
      }
    },
  },
  plugins: [],
};
