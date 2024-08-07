import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { QuoteManager } from '@/utils/quote-manager';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

export default function Saved() {
  const [savedQuotes, setSavedQuotes] = useState(null);

  function kababName(name) {
    return name.split(' ').join('-').toLowerCase();
  }

  // Only on mount
  useEffect(() => {
    QuoteManager.getSavedQuotes().then((savedQuotes) => {
      setSavedQuotes(savedQuotes);
    });
  }, []);

  return (
    <Box component="main">
      <NavBar />
      <Container maxWidth="lg" component="section">
        <Box mt={4}>
          <Typography variant="h2">Previously Saved Quotes</Typography>
          <List>
            {savedQuotes &&
              savedQuotes.map((q) => (
                <Stack key={q.id} spacing={2}>
                  <ListItem disableGutters>
                    <ListItemText primary={q.quote} secondary={q.author} />
                  </ListItem>
                  <Link href={`/saved/${kababName(q.author)}`}>
                    More from the {q.author}
                  </Link>
                </Stack>
              ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
}
