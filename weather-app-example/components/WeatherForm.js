import { GetApp } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function WeatherForm({ weatherCallback }) {
  // TODO: implement state for the input value
  // and render an error if the input is empty
  // (NOTE: check error and helperText props for
  // TextField)

  function handleSubmit(evt) {
    evt.preventDefault();

    const location = evt.target.elements['location'].value.trim();

    if (location === '') {
      console.error('Location cannot be empty');
    } else {
      console.log(`Location: ${location}`);
      // Fetch the weather data ...
      weatherCallback('DATA from weather form...');
    }
  }

  return (
    <>
      <Typography variant="h2">Weather Form</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          name="location"
          label="Location"
          variant="outlined"
          size="small"
          sx={{ width: '16em' }}
        />
        <Button type="submit" variant="contained" size="large">
          <GetApp />
        </Button>
      </Box>
    </>
  );
}
