import { Margin, Visibility } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({

  palette: {
    mode: 'light',
    primary: {
      main: '#12065c',
    },
    secondary: {
      main: '#9c27b0',
    },
    text: {
      primary: '#12065c',
      secondary: '#12065c',
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
    MuiCollapse: {
      styleOverrides: {
        root: {

          '&.MuiCollapse-root': {

            visibility: "visible"
          },

        },

      }

    },
    
  },
},

);