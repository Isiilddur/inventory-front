const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require('tailwindcss/colors');
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';
const heightWidth = {};
const translate = {}
const leading = {}
const fontSize = {};
const maxMinWidth = {};
const borderRadius = {};
//------------------------------
// @FontSize
//-------------------------------
for (let i = 6; i <= 80; i++) {
  fontSize[i] = [`${i}px`, `${i}px`];
}
//------------------------------
// @borderRadius
//-------------------------------
for (let i = 0; i <= 40; i++) {
  borderRadius[i] = `${i}px`;
}
//------------------------------
// @Width
// Default have 0 to 256px
//-------------------------------
for (let i = 130; i <= 500; i++) {
  heightWidth[i * 2] = `${i * 2}px`;
}

//------------------------------
// @line-height
//-------------------------------
for (let i = 0; i <= 128; i++) {
  leading[i] = `${i}px`;
}
//------------------------------
// @max-width
//-------------------------------
for (let i = 0; i <= 500; i++) {
  maxMinWidth[i] = `${i}px`;
}
//------------------------------
// @translate
//-------------------------------
for (let i = 0; i <= 300; i++) {
  translate[i] = `${i}px`;
}


module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,style}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    variants: {
      extend: {},
    },
    plugins: [],
    theme: {
      extend: {
        translate: {
          ...translate,
        },
        height: {
          ...heightWidth,
        },
        lineHeight: {
          ...leading
        },
        spacing: {
          '279': '279px',
        },
        screens: {
          sm   : {'max': '767px'},
          md   : {'min': '768px', 'max': '991px'},
          lg   : {'min': '992px', 'max': '1199px'},
          xl   : {'min': '1201px', 'max': '1400px'},
          mdMax: {'min': '768px'},
          xxl   : {'min': '1401px', 'max': '1600px'},
        },
        borderRadius: {
          ...borderRadius,
          full: "9999px",
        },

      },
      maxWidth: {
        ...maxMinWidth,
        '33.33p': '33.33%' ,
        '50p': '50%',
        '100p': '100%',
       },
      minWidth: {
        ...maxMinWidth,
        '33.33p': '33.33%' ,
        '50p': '50%',
        '100p': '100%',
       },
      fontFamily: {
        'primary': ["'Nunito Sans', sans-serif"],
       },
      fontSize,
      colors  : {
        transparent: 'transparent',
        current    : 'currentColor',
        black      : {
          light: '#03061C',
          lightTwo: '#454751',
          DEFAULT: '#0D0F19',
          dark: '#ffffff',
        },
        white      : colors.white,
        pink       : {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#ffffff',
        },
        gray       : {
          light: '#f9f9f9',
          lightTwo: '#9B9FA7',
          DEFAULT: '#616161',
          dark: '#EEF3FF',
          border: '#ebebeb',
          borderTwo: '#C1C9D9',
          borderThree: '#EFF0F2',
          borderFour: '#E6E8EE',
          borderFive: '#C1D5FE',
          borderSix: '#E4E6E9',
          borderSeven: '#E5E8EC',
          borderEight: '#ECEEF1',
          bg: '#fcfcfc',
          bgTwo: '#F8FAFF',
          bgThree: '#F4F5F8',
          bgFour: '#F5F7FB',
        },
        red        : {
          light: '#FA5769',
          DEFAULT: '#FF5066',
          dark: '#D41E1E',
        },
        orange     : {
          light: '#FF9720',
          DEFAULT: '#FF9720',
          dark: '#FF9720',
        },
        amber      : colors.amber,
        yellow     : {
          light: '#FF9720',
          lightSoft: '#ffffff',
          DEFAULT: '#ffffff',
        },
        green      : {
          light: '#5BC5A8',
          lightTwo: '#27DB8D',
          DEFAULT: '#32C98D',
          dark: '#ffffff',
        },
        primary      : {
          light: '#2C6AE5',
          DEFAULT: '#2C6AE5',
          dark: '#2C6AE5',
        },
        accent      : {
          light: '#32C98D',
          DEFAULT: '#32C98D',
          dark: '#32C98D',
        },
        warn      : {
          light: '#DF7272',
          DEFAULT: '#FF9720',
          dark: '#E2790F',
        },
        teal       : {
          light: '#866AD4',
          DEFAULT: '#611BCB',
        },
        blue       : {
          light: '#235ED2',
          lightTwo: '#6692E9',
          DEFAULT: '#2C6AE5',
          dark: '#ffffff',
        },
        indigo     : colors.indigo,
        purple     : colors.purple
    },
    borderWidth: {
      '0': '0px',
      '1': '1px',
      '2': '2px',
      '1-2': '.5px',
      '1-5': '1.5px',
      '4': '4px',
      '8': '8px',
      '90': '90px'
    },
    variants: {
      fontSize: ["responsive", "hover"],
    },
      screens: {
        'sm': '576px',
        // => @media (min-width: 576px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '992px',
        // => @media (min-width: 992px) { ... }

        'xl': '1200px',
        // => @media (min-width: 1200px) { ... }

        '2xl': '1396px',
        // => @media (min-width: 1400px) { ... }
      }
    }
};


