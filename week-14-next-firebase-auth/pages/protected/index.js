import { useContext, useEffect } from 'react';
import { Box, Container, Button, Typography } from '@mui/material';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Protected() {
  const { signOut, user, isReady: authReady } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && authReady && user === null) {
      router.replace('/');
    }
  }, [authReady, router.isReady, user]);

  if (user) {
    return (
      <Container>
        <Typography variant="h1">Protected Page</Typography>
        <Typography mb={2}>User email {user.email}</Typography>
        <Button variant="contained" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Container>
    );
  }
}
