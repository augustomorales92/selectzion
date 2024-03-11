'use client';
import { Suspense } from 'react';
import { ProductForEdit } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import { updateProduct } from '@/app/lib/actions';
import { UploadDropzone } from '../uploadButtons';
import { QueryResultRow } from '@vercel/postgres';
import { CardSkeleton } from '../skeletons';
import { ImagesToEdit } from './imagesToEdit';

export default function EditInvoiceForm({
  product,
}: {
  product: ProductForEdit;
}) {
  const [newImages, setNewImages] = useState<QueryResultRow[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const createProductWithId = updateProduct.bind(
    null,
    product.id,
    newImages,
    deletedImages,
  );

  const handleDeletedImages = (image_key: string) => {
    setDeletedImages([...deletedImages, image_key]);
  };
  return (
    <form action={createProductWithId}>
      <input type="hidden" name="id" value={product.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="string"
              step="juan"
              placeholder="Enter Product name"
              defaultValue={product.name}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Product Description */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              placeholder="Enter Product description"
              defaultValue={product.description}
              className="peer block h-[10rem] w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Product images*/}

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Choose images
          </label>
          <div className="relative">
            <Suspense fallback={<CardSkeleton />}>
              <UploadDropzone
                className="m-2"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setNewImages(res);
                }}
                onUploadError={(error: Error) => {
                  console.error(`ERROR! ${error.message}`)
                  alert(`Ups algo salio mal! Por favor intente nuevamente`);
                }}
              />
            </Suspense>
            <ImagesToEdit photoUrls={product.photo_urls} deletedImages={deletedImages} handleDeletedImages={handleDeletedImages}/>
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={product.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Product status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={product.status === 'pending'}
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sold"
                  name="status"
                  type="radio"
                  value="sold"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={product.status === 'sold'}
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Sold <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/backoffice"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          className={`flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors`}
        >
          Edit Product
        </Button>
      </div>
    </form>
  );
}
