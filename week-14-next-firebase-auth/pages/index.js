import { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Home() {
  const { signIn, isReady: authReady, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Check if user is signed in and redirect to protected
    if (user) {
      router.replace('/protected');
    }
  }, [user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    await signIn(email, password);
  }

  if (user === null && authReady) {
    return (
      <Container>
        <Typography variant="h1">Firebase Auth Example</Typography>
        <Container>
          <Typography variant="h2" mb={2}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </Box>
        </Container>
      </Container>
    );
  } else {
    // Display some loading or something
  }
}
