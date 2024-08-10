import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  let [bgColor, setBgColor] = useState('#000');
  let [text, setText] = useState('');

  function handleClick() {
    if (bgColor === '#000') {
      setBgColor('#f00');
    } else {
      setBgColor('#000');
    }
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
      <Box>
        <Typography variant="h2">Text Field Example</Typography>
        <TextField
          variant="outlined"
          label="Some Text"
          id="text"
          name="text"
          value={text}
          onChange={(evt) => {
            setText(evt.target.value);
          }}
        />
        {text === '' ? (
          <Typography sx={{ color: '#f00' }}>Text cannot be empty</Typography>
        ) : (
          <Typography>{text}</Typography>
        )}
      </Box>
    </Container>
  );
}
