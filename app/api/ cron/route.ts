import { sql } from '@vercel/postgres';
import { fetchProducts } from '@/app/lib/data';
import { checkIfProductSoldOver30Days } from '@/app/lib/utils';

export async function DeleteProducts() {
  try {
    const products = await fetchProducts();
    products.forEach(async (product) => {
      if (checkIfProductSoldOver30Days(product.sold_date || '')) {
        await sql`DELETE FROM products WHERE id = ${product.id}`;
        console.log('Product eliminado con titulo:', product.name);
      }
    });
  } catch (error) {
    console.error('Error al ejecutar la tarea periódica:', error);
  }
}
