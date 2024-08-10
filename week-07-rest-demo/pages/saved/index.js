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

export default function SavedQuotes() {
  const [savedQuotes, setSavedQuotes] = useState(null);

  function toKebabCase(name) {
    return name.split(' ').join('-').toLowerCase();
  };

  // Only on mount want to fetch saved quotes
  useEffect(() => {
    QuoteManager.getSavedQuotes().then((quotes) => {
      setSavedQuotes(quotes);
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
                  <Link href={`/saved/${toKebabCase(q.author)}`}>More from {q.author}</Link>
                </Stack>
              ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
}
