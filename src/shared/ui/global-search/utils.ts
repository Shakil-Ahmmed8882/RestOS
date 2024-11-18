// src/utils/hasValidResults.ts

export const hasValidResults = (results: any[]) =>
    results.some((item) => item.source !== null && item.data.length > 0);
  