import WeatherForm from '@/components/WeatherForm';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1">Weather Application</Typography>
      <WeatherForm />
    </Container>
  );
}
