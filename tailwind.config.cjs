/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            maxWidth: {
                'custom-1400px': '1400px'
            }
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}