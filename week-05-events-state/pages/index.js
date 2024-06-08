import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  let [bgColor, setBgColor] = useState('#000');

  function handleClick() {
    setBgColor('#f00');
    console.log(bgColor);
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h1">Events and State</Typography>
      <Box>
        <Typography variant="h2">Box Background</Typography>
        <Button onClick={handleClick} variant="outlined">
          Click Me!
        </Button>
        <Box
          sx={{
            mt: 2,
            height: '200px',
            width: '200px',
            backgroundColor: bgColor,
          }}
        ></Box>
      </Box>
    </Container>
  );
}
