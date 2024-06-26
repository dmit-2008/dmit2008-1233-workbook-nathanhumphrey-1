import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { QuoteManager } from '@/utils/quote-manager';

export default function Home() {
  const QUOTE_URL = 'https://api.quotable.io/random';

  const [randomQuote, setRandomQuote] = useState(null);
  const [savedQuotes, setSavedQuotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Only on mount want to fetch saved quotes
  useEffect(() => {
    QuoteManager.getSavedQuotes().then((quotes) => {
      setSavedQuotes(quotes);
    });
  }, []);

  function getRandomQuote() {
    setIsLoading(true);
    setRandomQuote(null);

    fetch(QUOTE_URL)
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        setRandomQuote({ author: json.author, quote: json.content });
      });
  }

  return (
    <Box component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1">Get You Some Quotes!</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component="section">
        <Typography variant="h1">Random Quotes</Typography>
        <Box mt={4} mb={4}>
          <Button variant="contained" onClick={getRandomQuote}>
            Get a Quote
          </Button>
        </Box>
        <hr />
        <Box mt={4}>
          {isLoading && <LinearProgress />}
          {randomQuote && (
            <Box>
              <Typography variant="h2" mb={2}>
                A Random Quote
              </Typography>
              <Typography mb={2}>
                {randomQuote.quote} - {randomQuote.author}
              </Typography>
              <Button
                variant="contained"
                onClick={async () => {
                  // Set the returned db-generated id on our random quote
                  randomQuote.id = (
                    await QuoteManager.saveQuote(randomQuote)
                  ).id;

                  // Set both random quote and saved quotes for render update
                  setRandomQuote({ ...randomQuote });
                  setSavedQuotes([...savedQuotes, randomQuote]);
                }}
              >
                Save Quote
              </Button>
            </Box>
          )}
        </Box>
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
