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
      className="w-74 relative md:w-full"
      data-carousel="static"
    >
      <div className="h-80 w-72 rounded-t-xl object-cover">
        <div className="duration-700 ease-in-out" data-carousel-item>
          <Image
            src={images?.[currentIndex] || '/logo.jpeg'}
            className="absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-xl"
            alt="..."
            placeholder="empty"
            width={500}
            height={500}
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        {isSold ? (
          <div
            className=" float-right mr-9 mt-9 w-72 origin-top bg-red-500 text-center"
            style={{ transform: 'translateX(50%) rotate(45deg) ' }}
          >
            <span className="text-shadow block bg-red-500 p-3 uppercase text-white shadow-md">
              Vendido
            </span>
          </div>
        ) : null}
      </div>
      {images.length ? (
        <>
          <div className="group absolute start-0 top-0 z-30 flex h-full  items-center justify-center px-4 focus:outline-none">
            <span
              className=" inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
              onClick={goToPreviousImage}
              data-carousel-prev
            >
              <ChevronLeftIcon className="w-5 md:w-6" />

              <span className="sr-only">Previous</span>
            </span>
          </div>
          <div className="group absolute end-0 top-0 z-30 flex h-full  items-center justify-center px-4 focus:outline-none">
            <span
              className="inline-flex h-10  w-10 cursor-pointer items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
              data-carousel-next
              onClick={goToNextImage}
            >
              <ChevronRightIcon className="w-5 md:w-6" />
              <span className="sr-only">Next</span>
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
