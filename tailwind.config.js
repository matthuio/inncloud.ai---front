/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C8AFF',
        secondary: '#1E1E2F',
        accent: '#FFB547',
        background: '#F6F8FB',
        success: '#33D17A',
        neutral: '#E0E4E8',
      },
      backgroundImage: {
        'primary-gradient': 'radial-gradient(ellipse at center, #4C8AFF 0%, transparent 70%)',
        'accent-gradient': 'linear-gradient(90deg, #FFB547 0%, #4C8AFF 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(76, 138, 255, 0.07)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
}
