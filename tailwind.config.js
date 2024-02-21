/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-135': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      height: {
        screen: '100dvh',
      },
      minHeight: {
        screen: '100dvh',
      },
      maxHeight: {
        screen: '100dvh',
      },
      width: {
        screen: '100dvw',
      },
      maxWidth: {
        screen: '100dvw',
      },
      minWidth: {
        screen: '100dvw',
      },
      keyframes: {
        'valid-slide-up': {
          '0%': {
            transform: 'translateY(-10px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        'valid-slide-up': 'valid-slide-up 0.1s ease',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
