import { GetApp } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function WeatherForm() {
  return (
    <>
      <Typography variant="h2">Weather Form</Typography>
      <Box component="form">
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
