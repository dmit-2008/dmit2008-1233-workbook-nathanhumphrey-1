const BASE_URL = 'http://localhost:3001/quotes';

const QuoteManager = {
  getSavedQuotes: async function () {
    const res = await fetch(BASE_URL);
    return await res.json();
  },

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
