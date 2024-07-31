import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({

  palette: {
    mode: 'dark',
    primary: {
      main: '#8a63f9',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { opacity: "0" },
       
      },
      
    },
    MuiFormControlLabel: {
      styleOverrides: {
        asterisk: { opacity: "0" },

      },
    },
  },

});