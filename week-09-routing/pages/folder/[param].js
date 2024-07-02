import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Param() {
  const router = useRouter();
  const { param } = router.query;

  return (
    <Box>
      <Typography variant="h1">Param Page</Typography>
      <Typography>The param value is {param}.</Typography>
    </Box>
  );
}
