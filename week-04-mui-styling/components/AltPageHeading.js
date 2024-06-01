import { Typography } from '@mui/material';

export default function AltPageHeading({ text }) {
  return (
    <Typography component="h1" variant="h2">
      {text}
    </Typography>
  );
}
