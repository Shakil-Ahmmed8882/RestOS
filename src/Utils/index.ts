/**
 * Creates a query parameter array with specific values.
 *
 * @param status - The status of the query.
 * @param email - The email to filter by (optional).
 * @param page - The page number for pagination.
 * @param searchValue - The search term for filtering (optional).
 *
 * @returns An array of objects with `name` and `value` keys.
 */
export const QueryGenerator = (status, email, page, searchValue= undefined) => {
  const queryArray = [
    { name: "status", value: status },
    email && { name: "user", value: "672f74a765cd583c7eab9185" },
    { name: "page", value: page },
    { name: "limit", value: 5 },
    searchValue && { name: "searchTerm", value: searchValue },
    { name: "sort", value: "-createdAt" },
  ].filter(Boolean);

  return queryArray;
};


