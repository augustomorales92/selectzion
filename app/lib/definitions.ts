import { QueryResultRow } from '@vercel/postgres';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ProductStatus = 'pending' | 'sold';

export type ProductsTable = {
  id: string;
  name: string;
  description: string;
  date: string;
  amount: number;
  status: ProductStatus;
  photoUrl: string[];
};

export type ProductForm = {
  id: string;
  name: string;
  description: string;
  amount: number;
  status: ProductStatus;
};

export type Product = ProductForm & { photo_urls: string[], sold_date?: string};

export type ProductForEdit = ProductForm & { photo_urls: QueryResultRow[] };

export type ProductProps = Omit<Product, 'id'>;