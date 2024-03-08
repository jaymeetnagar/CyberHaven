export default fetchWithToken = (url, options = {}) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  // If token exists, add it to the headers
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    };
  }

  // Make the fetch request with the modified options
  return fetch(url, options);
};