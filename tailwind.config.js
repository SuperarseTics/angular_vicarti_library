/** @type {import('tailwindcss').Config} */
const colors =
  module.exports = {
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
    theme: {
      extend: {
        colors: {
          'primary': {
            1: '#e6f7ff',
            2: '#bae0ff',
            3: '#91d5ff',
            4: '#69b1ff',
            5: '#40a9ff',
            6: '#1890ff',
            7: '#096dd9',
            8: '#0050b3',
            9: '#003a8c',
            10: '#002766',
            85: '#000000d9',
          },
          'secondary': {
            25: '#00000040',
            45: '#00000073',
            55: 'rgb(0,0,0,0.55)'
          },
          'orange-figma': '#FA913C',
          'yellow-figma': '#FABE24',
          'lime-figma': '#A2E535',
          'green-figma': '#34D298',
          'blue-figma': '#60A4F9',
          'purple-figma': '#BF83FB',
          'pink-figma': '#F372B5',
          'description': '#120338d9',
          'title': '#120338'
        },
        fontSize: {
          'sm-statement': '1.5rem',
          'sm-answer': '1rem',
          'sm-button': '0.875rem',
          'sm-description': '0.875rem',
          'base-statement': '1.75rem',
          'base-answer': '1.25rem',
          'base-button': '1rem',
          'base-description': '1rem',
          'xl-statement': '1.875rem',
          'xl-answer': '1.375rem',
          'xl-button': '1.25rem',
          'xl-description': '1.25rem',
          //mobile measures
          'mobile-sm-statement': '1rem',
          'mobile-sm-answer': '0.875rem',
          'mobile-sm-button': '0.75rem',
          'mobile-sm-description': '0.75rem',
          'mobile-base-statement': '1.25rem',
          'mobile-base-answer': '1rem',
          'mobile-base-button': '0.875rem',
          'mobile-base-description': '0.875rem',
          'mobile-xl-statement': '1.5rem',
          'mobile-xl-answer': '1.25rem',
          'mobile-xl-button': '1rem',
          'mobile-xl-description': '1rem',

        },
      },
    },
    plugins: [],
    corePlugins: {
      //Preflight is a feature that applies default styles to HTML elements. Set it to false to prevent ng zorro overwrite styles
      preflight: false,
    }
  }

