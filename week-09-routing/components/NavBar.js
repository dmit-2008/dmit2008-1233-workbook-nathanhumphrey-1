import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Link href="/">
            <Typography variant="h6" component="div">
              Page Navigation Demo
            </Typography>
          </Link>
        </Box>
        <Stack direction="row" spacing={2}>
          <Link href="/about">
            <Button color="inherit">About</Button>
          </Link>
          <Button
            color="inherit"
            onClick={() => {
              router.push(`/folder/${Math.random()}`);
            }}
          >
            Random
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
