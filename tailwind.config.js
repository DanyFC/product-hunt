/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray': 'var(--gray)',
        'gray2': 'var(--gray2)',
        'gray3': 'var(--gray3)',
        'orange': 'var(--orange)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'pt-sans': ['__PT_Sans_2b1938', 'sans-serif'],
        'roboto-slab': ['__Roboto_Slab_5d9861', 'serif'],
      }
    },
  },
  plugins: [],
}
