import AltPageHeading from '@/components/AltPageHeading';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <AltPageHeading text="Home Page" />
      <Typography>Welcome to the Home Page!</Typography>
      <Button variant="outlined">Some Button</Button>
    </Container>
  );
}
