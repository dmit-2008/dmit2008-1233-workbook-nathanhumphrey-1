import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { QuoteManager } from '@/utils/quote-manager';
import NavBar from '@/components/NavBar';

export default function SavedQuotes() {
  const [savedQuotes, setSavedQuotes] = useState(null);

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
                <ListItem key={q.id}>
                  <ListItemText primary={q.quote} secondary={q.author} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
}
