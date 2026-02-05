/* 
  Tailwind CSS Consumption
  Maps Substrata tokens to Tailwind theme configuration.
*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          300: "var(--brand-300)",
          500: "var(--brand-500)",
          700: "var(--brand-700)",
        },
        neutral: {
          0: "var(--neutral-0)",
          900: "var(--neutral-900)",
        },
        surface: "var(--color-surface)",
        text: "var(--color-text-primary)",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      fontFamily: {
        body: "var(--font-family-base)",
        heading: "var(--font-family-heading)",
      },
    },
  },
  plugins: [],
};
