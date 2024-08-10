export const RANDOM_QUOTE_URL = 'https://api.quotable.io/random';
export const BASE_URL = 'http://localhost:3001/quotes';

const QuoteManager = {
  /**
   * Fetches a random quote from the quotable API
   * @returns {Promise<{author:string, quote:string}} a random quote from the API
   */
  getRandomQuote: async function () {
    const res = await fetch(RANDOM_QUOTE_URL);
    const json = await res.json();
    return {
      author: json.author,
      quote: json.content,
    };
  },

  quoteExists: async function (quote) {
    const res = await fetch(
      `${BASE_URL}?author=${quote.author}&quote=${quote.quote}`
    );
    const json = await res.json();
    return json.length == 1;
  },

  /**
   * Fetches all quotes by an author from the backend
   * @param {string} name - the name of the author to search for
   * @returns {Promise<Array<{id:string, author:string, quote:string}>>} an array of quote objects
   */
  getQuotesByAuthor: async function (name) {
    console.log('NAME', name);
    const res = await fetch(`${BASE_URL}?author=${name}`);
    return await res.json();
  },

  /**
   * Fetches all quotes from the backend
   * @returns {Promise<Array<{id:string, author:string, quote:string}>>} an array of quote objects
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quote),
    });

    return await res.json();
  },
};

export { QuoteManager };
