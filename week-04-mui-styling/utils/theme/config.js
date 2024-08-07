import { createTheme } from '@mui/material';

const themeOptions = {
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#ff3d00',
    },
  },
};

const theme = createTheme(themeOptions);

export { theme };
