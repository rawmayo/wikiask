export const getSearchQuery = () => {
  const searchQuery = document.querySelector(".search-input").value;
  if (searchQuery.trim().length < 1) {
    return false;
  }
  return searchQuery.trim();
};

export const processQuery = async (query = "", limit = 30) => {
  const search = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrlimit=${limit}&prop=pageimages|extracts&exchars=190&pithumbsize=150&exintro&explaintext&exlimit=max&format=json&origin=*`;

  const encodedSearch = encodeURI(search);

  const response = await fetch(encodedSearch);

  return await response.json();
};
