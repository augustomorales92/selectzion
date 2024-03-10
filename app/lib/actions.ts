'use server';

import { z } from 'zod';
import { ProductForm } from './definitions';
import { QueryResultRow, sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UploadFileResponse } from 'uploadthing/client';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DeleteImages } from '../../pages/api/uploadthing/route';

const CreateProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'sold']),
});

const CreateProductFromSchema = CreateProductSchema.omit({ id: true });

export async function createProduct(
  images: UploadFileResponse<{ uploadedBy: string }>[],
  formData: FormData,
) {
  const { name, description, amount, status } = CreateProductFromSchema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  try {
    const product =
      await sql`INSERT INTO products (name, description, amount,status) 
    VALUES (${name}, ${description}, ${amount}, ${status}) RETURNING id;`;

    images.forEach(async (photo) => {
      try {
        await sql`
      INSERT INTO photos (product_id, photo_url, photo_key)
      VALUES (${product.rows?.[0]?.id}, ${photo.url}, ${photo.key})
      `;
        console.log('Photo inserted successfully');
      } catch (error) {
        console.error('Error inserting photo:', error);
      }
    });
  } catch (e) {
    return { message: 'Product creation error' };
  }
  revalidatePath('/backoffice');
  revalidatePath('/');
  redirect('/backoffice');
}

export async function deleteProduct(id: string) {
  try {
    const photoData = await sql`SELECT JSON_AGG(photo_key) AS photo_keys
    FROM photos
    WHERE product_id = ${id};`;
    const { photo_keys } = photoData?.rows?.[0];
    if (photo_keys && photo_keys.length) await DeleteImages(photo_keys);
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath('/backoffice');
    revalidatePath('/');
    return { message: 'Deleted Product' };
  } catch (e) {
    return { message: 'Database Error: Failed to Delete Product' };
  }
}

export async function soldProduct(id: string) {
  try {
    const date = new Date();
    await sql`UPDATE products SET sold_date = ${date.toISOString()}, status = ${'sold'} 
    WHERE id = ${id}`;
    revalidatePath('/backoffice');
    revalidatePath('/');
    return { message: 'Sold Product' };
  } catch (e) {
    console.error(e);
    return { message: 'Database Error: Failed to Sold Product' };
  }
}

const UpdateProduct = CreateProductSchema.omit({ id: true });

export async function updateProduct(
  id: string,
  images: QueryResultRow[],
  deletedImages: string[],
  formData: FormData,
) {
  const { name, description, amount, status } = UpdateProduct.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  try {
    await sql`
  UPDATE products
  SET name = ${name}, description = ${description}, status = ${status}, amount = ${amountInCents}
  WHERE id = ${id}
  `;
    if (images?.length) {
      images?.forEach(async (photo) => {
        try {
          await sql`
          INSERT INTO photos (product_id, photo_url, photo_key)
          VALUES (${id}, ${photo.url}, ${photo.key})
          `;
          console.log('Photo inserted successfully');
        } catch (error) {
          console.error('Error inserting photo:', error);
        }
      });
    }
    if (deletedImages?.length) {
      await deletePhoto(deletedImages);
    }
  } catch (e) {
    console.error(e);
    return { message: 'Database Error: Failed to Delete Product' };
  }
  revalidatePath('/backoffice');
  revalidatePath('/');
  redirect('/backoffice');
}

export async function deletePhoto(images: string[]) {
  try {
    images.forEach(async (id) => {
      await DeleteImages(id);
      await sql`DELETE FROM photos WHERE photo_key = ${id}`;
    });
    return { message: 'Deleted Image' };
  } catch (e) {
    console.error(e);
    return { message: 'Database Error: Failed to Delete Image' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
