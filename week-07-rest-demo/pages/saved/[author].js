import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

export default function QuotesByAuthor() {
  const router = useRouter();
  const { author } = router.query;

  const [savedQuotes, setSavedQuotes] = useState(null);

  function toProperNameCase(name) {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ');
  }

  // Only on mount want to fetch saved quotes
  useEffect(() => {
    QuoteManager.getSavedQuotesByAuthor(toProperNameCase(author)).then((quotes) => {
      setSavedQuotes(quotes);
    });
  }, []);

  return (
    <Box component="main">
      <NavBar />
      <Container maxWidth="lg" component="section">
        <Box mt={4}>
          <Typography variant="h2">Saved Quotes from {toProperNameCase(author)}</Typography>
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
