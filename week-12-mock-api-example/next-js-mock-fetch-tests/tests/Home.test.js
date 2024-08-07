import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuoteManager } from '../utils/quote-manager.js';

import Home from '../pages/index.js';

// Default random quote
const AUTHOR = 'Jane Doe';
const QUOTE = 'A famous quote';

// Setup QuoteManager mocks
const originalGetRandomQuote = QuoteManager.getRandomQuote;
const originalQuoteExists = QuoteManager.quoteExists;

beforeAll(() => {
  QuoteManager.getRandomQuote = jest
    .fn()
    .mockResolvedValue({ author: AUTHOR, quote: QUOTE })
    .mockName('mockGetRandomQuote');

  QuoteManager.quoteExists = jest
    .fn()
    .mockResolvedValue(false)
    .mockName('mockQuoteExists');
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  QuoteManager.getRandomQuote = originalGetRandomQuote;
  QuoteManager.quoteExists = originalQuoteExists;
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

    // check the calls to quote manager
    expect(QuoteManager.getRandomQuote.mock.calls.length).toEqual(1);
    expect(QuoteManager.quoteExists.mock.calls.length).toEqual(1);
    expect(QuoteManager.quoteExists.mock.calls).toContainEqual([
      { author: AUTHOR, quote: QUOTE },
    ]);
  });

  test('Loads a new random quote when "Get a Quote" button is clicked', async () => {
    // wait for the home page to render
    await act(() => {
      render(<Home />);
    });

    // define new values
    const NEW_AUTHOR = 'Clark Kent';
    const NEW_QUOTE = 'Up, up, and away!';

    // require a new mock for this test
    const origMock = QuoteManager.getRandomQuote;

    QuoteManager.getRandomQuote = jest
      .fn()
      .mockResolvedValue({ author: NEW_AUTHOR, quote: NEW_QUOTE });

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

    // reset the origMock
    QuoteManager.getRandomQuote = origMock;
  });
});
