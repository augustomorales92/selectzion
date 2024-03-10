import { sql } from '@vercel/postgres';
import { Product, ProductForEdit, ProductsTable, User } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const products = await sql<ProductsTable>`
  SELECT
    products.id,
    products.name,
    products.amount,
    products.description,
    products.date,
    products.status,
    ARRAY_AGG(photos.photo_url) AS photoUrl
  FROM products
  LEFT JOIN photos ON products.id = photos.product_id
  WHERE
    products.name ILIKE ${`%${query}%`} OR
    products.description ILIKE ${`%${query}%`}
    GROUP BY
    products.id,
    products.name,
    products.amount,
    products.description,
    products.date,
    products.status
  ORDER BY products.date DESC
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
`;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
    products.name ILIKE ${`%${query}%`} OR
    products.description ILIKE ${`%${query}%`} OR
    products.amount::text ILIKE ${`%${query}%`} OR
      products.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchProductById(id: string) {
  noStore();

  try {
    const data = await sql<Product>`
      SELECT
        products.id,
        products.name,
        products.description,
        products.amount,
        products.status
      FROM products
      WHERE products.id = ${id};
    `;

    const photoData = await sql`SELECT *
    FROM photos
    WHERE product_id = ${id};`;
    const product = data?.rows?.map((product) => ({
      ...product,
      amount: product.amount / 100,
    }));
    return { ...product[0], photo_urls: photoData.rows };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function deleteProductById(id: string) {
  try {
    const result = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *;`;

    if (result.rowCount === 0) {
      throw new Error('Product not found.');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete product.');
  }
}

export async function fetchProducts() {
  noStore();
  try {
    const data = await sql<Product>`
    SELECT
      products.id,
      products.name,
      products.description,
      products.amount,
      products.status,
      products.sold_date,
      CASE 
        WHEN COUNT(photos.photo_url) > 0 THEN ARRAY_AGG(photos.photo_url)
        ELSE ARRAY[]::TEXT[]
      END AS photo_urls
    FROM products
    LEFT JOIN photos ON products.id = photos.product_id
    GROUP BY products.id, products.name, products.description, products.amount, products.status
    ORDER BY products.name ASC;
    `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
