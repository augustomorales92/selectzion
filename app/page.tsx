import { Suspense } from 'react';
import Image from 'next/image';
import Pagination from '@/app/ui/products/pagination';
import Search from '@/app/ui/search';
import CardWrapper from './ui/backoffice/cards';
import { fetchProductsPages } from './lib/data';
import { HomeSkeleton, CardsSkeleton } from './ui/skeletons';
import { Footer } from './ui/footer';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);
  return (
    <main className="flex min-h-screen flex-col p-3">
      <Suspense fallback={<HomeSkeleton />}>
        <header className="flex shrink-0 items-end justify-center rounded-lg bg-gray-50 p-4 md:h-full">
          <Image
            src="/selectzion.png"
            alt={'logo'}
            width={500}
            height={500}
            priority
          />
        </header>
        <div className="mb-4 mt-4 flex grow flex-col gap-2 md:flex-col">
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search products..." />
          </div>
          <div className="w-fit mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-between gap-y-14 gap-x-20 mt-10 mb-5 scale-75 sm:transform-none">
            <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
              <CardWrapper />
            </Suspense>
          </div>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
        <Footer />
      </Suspense>
    </main>
  );
}
