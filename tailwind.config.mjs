/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom colors for markdown rendering
        'markdown-header': '#4F46E5',
      },
      fontSize: {
        'md-preview': '1.125rem', // Custom font size for markdown content
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // This plugin enables the `prose` class
  ],
};
