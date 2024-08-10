import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import { QuoteManager } from '@/utils/quote-manager';
import NavBar from '@/components/NavBar';

export default function Home() {
  const QUOTE_URL = 'https://api.quotable.io/random';

  const [randomQuote, setRandomQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteExists, setQuoteExists] = useState(false);

  function getRandomQuote() {
    setIsLoading(true);
    setRandomQuote(null);

    let localAuthor;
    let localQuote;

    fetch(QUOTE_URL)
      .then((res) => res.json())
      .then((json) => {
        localAuthor = json.author;
        localQuote = json.content;

        return QuoteManager.quoteExists({
          author: json.author,
          quote: json.content,
        });
      })
      .then((exists) => {
        setQuoteExists(exists);
        setIsLoading(false);
        setRandomQuote({ author: localAuthor, quote: localQuote });
      });
  }

  return (
    <Box component="main">
      <NavBar />
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
                disabled={randomQuote.id !== undefined || quoteExists}
                variant="contained"
                onClick={async () => {
                  // Set the returned db-generated id on our random quote
                  randomQuote.id = (
                    await QuoteManager.saveQuote(randomQuote)
                  ).id;

                  // Set both random quote and saved quotes for render update
                  setRandomQuote({ ...randomQuote });
                }}
              >
                Save Quote
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
