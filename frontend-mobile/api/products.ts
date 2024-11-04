const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
  console.log('fetching...', `${API_URL}/products`);

  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Error fetching products');
  }

  return data;
}

export async function fetchProductsById(id: number) {
  console.log('fetching...', `${API_URL}/products/${id}`);

  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Error fetching products');
  }

  return data;
}
