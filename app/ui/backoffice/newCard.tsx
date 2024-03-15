'use client';
import { Slider } from '../slider';
import { ProductProps } from '@/app/lib/definitions';
import { sendWhatsApp } from '@/app/lib/utils';
import { SocialIcon } from 'react-social-icons';
export function Card({
  name,
  description,
  status,
  photo_urls,
  amount,
}: ProductProps) {
  return (
    <div className="w-80 scale-75 rounded-xl border-gray-200 bg-white shadow-md hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:transform-none ">
        <div className="rounded-t-lg p-2">
          <Slider images={photo_urls} isSold={status === 'sold'} />
        </div>
        <div className="px-5 pb-2">
          <div className="h-14 sm:h-16">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </div>
            <div className="h-24 overflow-auto p-1 no-scrollbar">
              <ul className="font-small mb-1 text-xs text-gray-700 dark:text-gray-400 md:font-normal ">
                {description?.split('-')?.map((e, i) => (
                  <li key={i} className="truncate">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          <div className="flex items-center justify-between">
            <span className="text-l font-bold text-gray-900 dark:text-white md:text-2xl">
              {amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
            </span>
            <button
              onClick={sendWhatsApp}
              disabled={status === 'sold'}
              className={`rounded-full text-center text-xs font-medium text-white focus:outline-none  focus:ring-4 md:text-sm ${
                status === 'sold'
                  ? 'cursor-not-allowed bg-gray-400 text-gray-600'
                  : ' bg-green-700 hover:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800'
              }`}
            >
              <SocialIcon
                network="whatsapp"
                className="w-3 md:w-6"
                bgColor="transparent"
              />
            </button>
          </div>
        </div>
    </div>
  );
}
