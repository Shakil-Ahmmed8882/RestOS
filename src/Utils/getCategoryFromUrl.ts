export const getCategoryFromUrl = () => {
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get("category");
};


