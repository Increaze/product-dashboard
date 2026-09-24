import type {
  Product,
  ProductCategory,
  ProductsResponse,
  UpdateProductInput,
} from "@/types/product";

const API_BASE_URL = "https://dummyjson.com";

interface GetProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts({
  limit = 10,
  skip = 0,
  search,
  category,
  sortBy,
  order = "asc",
}: GetProductsParams = {}): Promise<ProductsResponse> {
  if (search && category) {
    const searchParams = new URLSearchParams();

    searchParams.set("q", search);
    searchParams.set("limit", "0");

    const response = await fetch(
      `${API_BASE_URL}/products/search?${searchParams.toString()}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    const data = await handleResponse<ProductsResponse>(response);

    let filteredProducts = data.products.filter(
      (product) => product.category === category,
    );

    if (sortBy) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        const aValue = a[sortBy as keyof Product];
        const bValue = b[sortBy as keyof Product];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    const total = filteredProducts.length;
    const products = filteredProducts.slice(skip, skip + limit);

    return {
      products,
      total,
      skip,
      limit,
    };
  }

  let endpoint = `${API_BASE_URL}/products`;

  if (search) {
    endpoint = `${API_BASE_URL}/products/search`;
  } else if (category) {
    endpoint = `${API_BASE_URL}/products/category/${encodeURIComponent(
      category,
    )}`;
  }

  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set("skip", String(skip));

  if (search) {
    params.set("q", search);
  }

  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  const response = await fetch(`${endpoint}?${params.toString()}`, {
    next: {
      revalidate: 60,
    },
  });

  return handleResponse<ProductsResponse>(response);
}
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  return handleResponse<Product>(response);
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    next: {
      revalidate: 300,
    },
  });

  return handleResponse<ProductCategory[]>(response);
}

export async function updateProduct(
  id: number,
  data: UpdateProductInput,
): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Product>(response);
}
