import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/">
            <Typography variant="h6" component="div">
              Page Navigation
            </Typography>
          </Link>
        </Box>
        <Link href="/about">
          <Button>About</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
