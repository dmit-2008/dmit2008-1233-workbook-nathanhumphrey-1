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

function toProperNameCase(name) {
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ');
}

export async function getServerSideProps(ctx) {

  const author = toProperNameCase(ctx.query.author);
  const savedQuotes = await QuoteManager.getSavedQuotesByAuthor(author);

  return {
    props: {
      savedQuotes,
      author,
    }
  };
}

export default function QuotesByAuthor({ savedQuotes, author }) {
  return (
    <Box component="main">
      <NavBar />
      <Container maxWidth="lg" component="section">
        <Box mt={4}>
          <Typography variant="h2">Saved Quotes from {author}</Typography>
          <List>
            {savedQuotes.map((q) => (
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
