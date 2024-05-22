/**
 * Fetch JSON data from an endpoint url
 * @param {string} url - the URL to fetch
 * @returns {object} the returned JSON object
 */
export const getJSON = async (url) => {
  const res = await fetch(url);
  return await res.json();
};
