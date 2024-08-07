import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';

export default function Page({ children }) {
  return (
    <CssBaseline>
      <Box>
        <NavBar />
        <Container>{children}</Container>
      </Box>
    </CssBaseline>
  );
}
