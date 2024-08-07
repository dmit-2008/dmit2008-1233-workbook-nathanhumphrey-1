import { Typography } from '@mui/material';
import variables from '@/styles/variables.module.scss';

export default function AltPageHeading({ text }) {
  return (
    <Typography
      sx={{ color: variables.primaryColor }}
      component="h1"
      variant="h2"
    >
      {text}
    </Typography>
  );
}
