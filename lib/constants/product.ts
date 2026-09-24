export const PRODUCTS_PER_PAGE = 10;

export const PRODUCT_SORT_OPTIONS = [
  {
    label: "Title: A-Z",
    value: "title-asc",
    sortBy: "title",
    order: "asc",
  },
  {
    label: "Title: Z-A",
    value: "title-desc",
    sortBy: "title",
    order: "desc",
  },
  {
    label: "Price: Low to High",
    value: "price-asc",
    sortBy: "price",
    order: "asc",
  },
  {
    label: "Price: High to Low",
    value: "price-desc",
    sortBy: "price",
    order: "desc",
  },
  {
    label: "Rating: High to Low",
    value: "rating-desc",
    sortBy: "rating",
    order: "desc",
  },
] as const;