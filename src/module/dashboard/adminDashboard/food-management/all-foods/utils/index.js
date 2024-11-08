export const Query =(page,searchValue) => {
    const queryArray = [
        { name: "status", value: "pending" },
        { name: "page", value: page },
        { name: "limit", value: 5 },
        { name: "searchTerm", value: searchValue },
        { name: "sort", value: "-createdAt" },
      ];
      
    return queryArray
} 
