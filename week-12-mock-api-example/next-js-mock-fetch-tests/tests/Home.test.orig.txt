import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL, RANDOM_QUOTE_URL } from '../utils/quote-manager.js';

import Home from '../pages/index.js';

// Default random quote
const AUTHOR = 'Jane Doe';
const QUOTE = 'A famous quote';

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
      return HttpResponse.json(false);
    } else if (author) {
      // Get quotes by author
      return HttpResponse.json([]);
    } else {
      // Get all saved quotes
      return HttpResponse.json([]);
    }
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('Home page component', () => {
  test('Loads a random quote on mount', async () => {
    // wait for the home piece to render.
    await act(() => {
      render(<Home />);
    });
    // get the author and quote element
    let quoteElement = screen.getByTestId('quote');
    let authorElement = screen.getByTestId('author');

    // check to see that they are equal to the new values.
    expect(quoteElement).toHaveTextContent(QUOTE);
    expect(authorElement).toHaveTextContent(AUTHOR);
  });

  test('Loads a new random quote when "Get a Quote" button is clicked', async () => {
    // wait for the home page to render
    await act(() => {
      render(<Home />);
    });

    // define new values
    const NEW_AUTHOR = 'Clark Kent';
    const NEW_QUOTE = 'Up, up, and away!';

    // create a new request with the new quote and author
    server.use(
      http.get(RANDOM_QUOTE_URL, () => {
        return HttpResponse.json({
          _id: 'some-random-id',
          author: NEW_AUTHOR,
          content: NEW_QUOTE,
        });
      })
    );

    // get the button element
    let buttonElement = screen.getByTestId('new-quote-button');

    // click the new button and wait for the state to change
    await act(() => {
      buttonElement.click();
    });

    // get the author and quote elements
    let quoteElement = screen.getByTestId('quote');
    let authorElement = screen.getByTestId('author');

    // check to see that they are equal to the expected values
    expect(quoteElement).toHaveTextContent(NEW_QUOTE);
    expect(authorElement).toHaveTextContent(NEW_AUTHOR);

    // remove the newly added handler
    server.resetHandlers();
  });
});
