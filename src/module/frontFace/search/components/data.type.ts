
export type SearchItem = {
    _id: string;
    title?: string;
    foodName?: string;
    name?: string;
    category?: string;
    foodCategory?: string;
    image?: string;
    foodImage?: string;
  };
  
  export type SearchResult = {
    source: string;
    data: SearchItem[];
  };