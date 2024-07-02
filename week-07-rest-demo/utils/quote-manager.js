const BASE_URL = 'http://localhost:3001/quotes';

/**
 * Manages the 'quotes' API with the backend
 */
const QuoteManager = {
  /**
   * Fetches all quotes from the backend
   * @returns {Promise<Array<{id:string, author:string, quote:string}>>} - an array of quote objects
   */
  getSavedQuotes: async function () {
    const res = await fetch(BASE_URL);
    return await res.json();
  },

  /**
   * Creates a new quote in the backend
   * @param {{quote:string, author:string}} quote - the quote to add
   * @returns {Promise<{quote:string, author:string, id:string}>} the newly added quote with id
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
