import { Box, Typography } from '@mui/material';

export default function CurrentWeather({ data }) {
  const { main: current, name: city } = data;

  return (
    <Box>
      <Typography variant="h3">Conditions for {city}</Typography>
      <Typography>Current Temperature: {current.temp}</Typography>
    </Box>
  );
}
