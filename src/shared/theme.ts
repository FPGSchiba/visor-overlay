import { createTheme } from '@mui/material';

export const theme= createTheme({
  palette: {
    primary: {
      main: '#3B72FF',
    },
    secondary: {
      main: '#22D1F6',
    },
    background: {
      default: '#404040',
      paper: '#606060',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#aaa'
    }
  },
});