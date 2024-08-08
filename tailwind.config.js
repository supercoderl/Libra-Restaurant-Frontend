const opacityManager = ({opacityVariable, opacityValue}, cssVar) => {
  if (opacityValue !== undefined) {
    return `rgba(${cssVar}, ${opacityValue})`;
  }
  if (opacityVariable !== undefined) {
    return `rgba(${cssVar}, var(${opacityVariable}, 1))`;
  }
  return `rgb(${cssVar})`;
};

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '// Note the addition of the app directory.\r\n    ./pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '// Or if using src directory:\r\n    ./src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        productQuantity: '#D12121',
        main: '#D12121',
      },
      backgroundImage: {
        catagoryBackground:
          'url("https://modinatheme.com/foodking/wp-content/uploads/2024/03/catagory-card-shape.png")',
        heroBackground:
          'url("https://wallpapers.com/images/hd/restaurant-background-npda8c1hqh6d0xso.jpg")',
      },
      boxShadow: {
        readmore: 'inset 0 0 1.6em -0.6em #D12121',
        readmoreIcon: '0.1em 0.1em 0.6em 0.2em #D12121',
        order:
          '0.6px 5.3px 6.6px rgba(0, 0, 0, 0.025), 5px 42px 53px rgba(0, 0, 0, 0.05)',
        buttonCheckout: '5px 5px 10px rgba(0, 0, 0, 0.116)',
        secondaryCategory: '0 4px 30px rgba(0, 0, 0, 0.1)',
        modalFocusInput: '1px 2px 0px 0px #D12121',
        modalInput: '3px 4px 0px 1px #D12121'
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        productQuantity: '#D12121',
      },
      colors: {
        purple: props => {
          return opacityManager(props, 'var(--color-purple)');
        },
        orange: props => {
          return opacityManager(props, 'var(--color-orange)');
        },
        yellow: props => {
          return opacityManager(props, 'var(--color-yellow)');
        },
        main: '#D12121',
        background: '#F4F1EA',
        darkBlue: 'hsl(223, 47%, 23%)',
        veryPaleBlue: 'hsl(225, 100%, 98%)',
        desaturatedBlue: 'hsl(224, 23%, 55%)',
      },
      maxWidth: {
        cart: '440px',
      },
      width: {
        readmoreIcon: 'calc(100% - 0.6em)',
      },
      translate: {
        readmoreSvg: '0.1em',
        modalFocusInput: '4px'
      },
      rotate: {
        250: '250deg',
        360: '360deg',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
