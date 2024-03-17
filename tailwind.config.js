/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        separator: 'hsl(var(--separator))',
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
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
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
      },
      backgroundImage: {
        'gradient-135': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'background-gradient': 'linear-gradient(var(--background-gradient))',
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
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
        fade: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        'slide-top': {
          '0%': {
            transform: 'translateY(-50px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'valid-slide-up': 'valid-slide-up 0.1s ease',
        fade: 'fade 0.2s ease',
        'slide-top': 'slide-top 0.5s ease',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('autoprefixer')],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-135': 'linear-gradient(135deg, var(--tw-gradient-stops))',
//       },
//       height: {
//         screen: '100dvh',
//       },
//       minHeight: {
//         screen: '100dvh',
//       },
//       maxHeight: {
//         screen: '100dvh',
//       },
//       width: {
//         screen: '100dvw',
//       },
//       maxWidth: {
//         screen: '100dvw',
//       },
//       minWidth: {
//         screen: '100dvw',
//       },
//       keyframes: {
//         'valid-slide-up': {
//           '0%': {
//             transform: 'translateY(-10px)',
//             opacity: 0,
//           },
//           '100%': {
//             transform: 'translateY(0)',
//             opacity: 1,
//           },
//         },
//         fade: {
//           '0%': {
//             opacity: 0,
//           },
//           '100%': {
//             opacity: 1,
//           },
//         },
//         'slide-top': {
//           '0%': {
//             transform: 'translateY(-50px)',
//             opacity: 0,
//           },
//           '100%': {
//             transform: 'translateY(0)',
//             opacity: 1,
//           },
//         },
//       },
//       animation: {
//         'valid-slide-up': 'valid-slide-up 0.1s ease',
//         fade: 'fade 0.2s ease',
//         'slide-top': 'slide-top 0.3s ease',
//       },
//       fontFamily: {
//         poppins: ['Poppins', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };
