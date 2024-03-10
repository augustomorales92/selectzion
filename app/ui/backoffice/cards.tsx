import { fetchProducts } from '@/app/lib/data';
import { Card } from './card';

export default async function CardWrapper() {
  const products = await fetchProducts();
  return (
    <>
      {products.map((product) => (
        <Card
          key={product.id}
          name={product.name}
          description={product.description}
          photo_urls={product.photo_urls}
          status={product.status}
          amount={product.amount}
        />
      ))}
    </>
  );
}


