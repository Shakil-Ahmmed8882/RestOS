export type TFoodCategory = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  imagePublicId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type TFoodCategoryListResponse = {
  data: {
    result: TFoodCategory[];
  };
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};
