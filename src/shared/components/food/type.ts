export interface FoodItem {
    id: number;
    name: string;
    image: string;
  }
  
  export interface foodListProps {
    categories: FoodItem[]; 
    title?: string;
    onViewAll?: () => void;
    scrollSpeed?: number;
    onItemSelect?: (id: number, name: string) => void;
  }