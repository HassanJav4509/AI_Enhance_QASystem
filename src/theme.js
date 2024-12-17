import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b5999', // Dark blue color
    },
    secondary: {
      main: '#db6747', // Orange color for contrast
    },
    background: {
      default: '#ffffff', // White background for the page
    },
  },
});

export default theme;
