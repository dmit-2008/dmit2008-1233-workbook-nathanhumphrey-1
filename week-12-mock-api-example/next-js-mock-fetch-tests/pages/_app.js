import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <CssBaseline>
      <Component {...pageProps} />
    </CssBaseline>
  );
}
