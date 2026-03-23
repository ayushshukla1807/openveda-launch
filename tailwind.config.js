/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        accent: {
          green: '#22c55e',
          blue: '#3b82f6',
          purple: '#a855f7',
        },
      },
      animation: {
        'mesh-gradient': 'mesh 15s ease infinite',
        'subtle-float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        mesh: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
