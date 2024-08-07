import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link href="/">
          <Typography component="h1">Get You Some Quotes!</Typography>
        </Link>
        <Link href="/saved">
          <Button color="inherit">Saved Quotes</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
