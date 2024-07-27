import { useEffect, useState } from 'react';
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
  const [randomQuote, setRandomQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteExists, setQuoteExists] = useState(false);

  async function getQuote() {
    setRandomQuote(null);
    setIsLoading(true);

    const quote = await QuoteManager.getRandomQuote();
    const isQuoteSaved = await QuoteManager.quoteExists(quote);

    setIsLoading(false);
    setRandomQuote(quote);
    setQuoteExists(isQuoteSaved);
  }

  // Fetch a random quote on page mount
  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Box component="main">
      <NavBar />
      <Container maxWidth="lg" component="section">
        <Typography variant="h1">Random Quotes</Typography>
        <Box mt={4} mb={4}>
          <Button
            data-testid="new-quote-button"
            variant="contained"
            onClick={getQuote}
          >
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
              <Typography data-testid="quote">"{randomQuote.quote}"</Typography>
              <Typography data-testid="author" mb={2} fontSize={12}>
                - {randomQuote.author}
              </Typography>
              <Button
                disabled={randomQuote.id !== undefined || quoteExists}
                variant="contained"
                onClick={async () => {
                  randomQuote.id = (
                    await QuoteManager.saveQuote(randomQuote)
                  ).id;

                  // Now update the state
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
