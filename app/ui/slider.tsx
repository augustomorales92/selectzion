'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export function Slider({
  images,
  isSold,
}: {
  images: string[];
  isSold: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="duration-700 ease-in-out" data-carousel-item>
          <Image
            src={images?.[currentIndex] || '/logo.jpeg'}
            className="absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2"
            alt="..."
            placeholder="empty"
            width={500}
            height={500}
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        {isSold ? (
          <div className=" bg-red-500 origin-top float-right mt-9 mr-9 w-72 text-center" style={{transform:'translateX(50%) rotate(45deg) '}}>
            <span className="text-shadow block bg-red-500 p-3 uppercase text-white shadow-md">
              Vendido
            </span>
          </div>
        ) : null}
      </div>
      {images.length ? (
        <>
          <button
            type="button"
            className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            data-carousel-prev
            onClick={goToPreviousImage}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
              <ChevronLeftIcon className="w-5 md:w-6" />

              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            data-carousel-next
            onClick={goToNextImage}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
              <ChevronRightIcon className="w-5 md:w-6" />
              <span className="sr-only">Next</span>
            </span>
          </button>
        </>
      ) : null}
    </div>
  );
}
