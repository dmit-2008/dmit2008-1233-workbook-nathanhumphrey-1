import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';

export default function Home() {
  const QUOTE_URL = 'https://api.quotable.io/random';

  return (
    <Box component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1">Get You Some Quotes!</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component="section">
        <Typography variant="h1">Random Quotes</Typography>
        <Box mt={4}>
          <Button variant="contained">Get a Quote</Button>
        </Box>
        <Box mt={4}></Box>
      </Container>
    </Box>
  );
}
