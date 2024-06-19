const BASE_URL = 'http://localhost:3001/quotes';

const QuoteManager = {
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
