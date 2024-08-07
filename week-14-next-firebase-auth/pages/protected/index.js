import { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AuthContext } from '@/context/AuthContext';

export default function Protected() {
  return (
    <Box>
      <Typography variant="h1">Protected Page</Typography>
    </Box>
  );
}
