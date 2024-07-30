import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QuoteManager, BASE_URL, RANDOM_QUOTE_URL } from '../quote-manager.js';

// Default random quote
const AUTHOR = 'Jane Doe';
const QUOTE = 'A famous quote';

// Default saved quotes
const SAVED_QUOTES = [
  {
    id: 1,
    author: 'Sally Anne',
    quote: 'A quote by Sally',
  },
  {
    id: 2,
    author: 'Clark Kent',
    quote: 'A qoute by Clark',
  },
  {
    id: 3,
    author: 'Mary Jane',
    quote: 'A quote by Mary',
  },
  {
    id: 4,
    author: 'Sally Anne',
    quote: 'Another quote by Sally',
  },
];

const handlers = [
  http.get(RANDOM_QUOTE_URL, () => {
    return HttpResponse.json({
      _id: 'some-random-id',
      author: AUTHOR,
      content: QUOTE,
    });
  }),
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url);
    const author = url.searchParams.get('author');
    const quote = url.searchParams.get('quote');

    if (author && quote) {
      // Checking for already saved
      return HttpResponse.json(
        SAVED_QUOTES.filter((q) => q.author === author && q.quote === quote)
      );
    } else if (author) {
      // Get quotes by author
      return HttpResponse.json(SAVED_QUOTES.filter((q) => q.author === author));
    } else {
      // Get all saved quotes
      return HttpResponse.json(SAVED_QUOTES);
    }
  }),
  http.post(BASE_URL, async ({ request }) => {
    const data = await request.json();
    if (data.author === undefined || data.quote === undefined) {
      throw Error('Incompatible data - missing author or quote');
    }

    data.id = SAVED_QUOTES.length + 1;

    return HttpResponse.json(data);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
