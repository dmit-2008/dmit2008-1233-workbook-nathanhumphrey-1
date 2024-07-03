import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();

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
          <Button color="inherit">About</Button>
        </Link>
        <Button
          color="inherit"
          onClick={() => {
            router.push(`/folder/${Math.random()}`);
          }}
        >
          Random Param
        </Button>
      </Toolbar>
    </AppBar>
  );
}
