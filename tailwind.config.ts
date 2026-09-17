import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      colors: {
        surface: {
          card: 'var(--bg-card)',
          panel: 'var(--bg-panel)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
