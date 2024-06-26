const BASE_URL = 'http://localhost:3001/quotes';

/**
 * Manages the 'quotes' API with the backend
 */
const QuoteManager = {
  /**
   * Fetches all quotes from the backend
   * @returns {Promise<[]>} an array of quote objects
   */
  getSavedQuotes: async function () {
    const res = await fetch(BASE_URL);
    return await res.json();
  },

  /**
   * Creates a new quote in the backend
   * @param {{quote, author}} quote
   * @returns {Promise<{quote, author, id}>} the newly added quote with id
   */
  saveQuote: async function (quote) {
    if (!quote.quote || !quote.author) {
      throw new Error('Incompatible type');
    }

    const res = await fetch(BASE_URL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quote),
    });

    return await res.json();
  },
};

export { QuoteManager };
