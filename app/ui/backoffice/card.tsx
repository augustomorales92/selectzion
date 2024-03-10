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
    <div className="max-w-sm rounded-lg rounded-xl border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="h-164 p-2 shadow-sm">
        <div className="flex p-4">
          <h5 className="mb-2 h-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </div>
        <Slider images={photo_urls} isSold={status === 'sold'} />
        <div className="flex h-10 items-center justify-end p-4 mt-4">
        <h5 className="text-2xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
          {`$ ${amount}`}
        </h5>
        </div>
        <div className="h-64 p-5">
          <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description?.split('-')?.map((e, i) => (
              <li key={i} className="truncate">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex h-16 items-center justify-end p-4 mb-4">
        <button
          onClick={sendWhatsApp}
          disabled={status === 'sold'}
          className={`md:w-50 flex items-center justify-between rounded-lg px-3 py-2 text-center text-l font-medium  focus:outline-none focus:ring-4  ${
            status === 'sold'
              ? 'cursor-not-allowed bg-gray-400 text-gray-600'
              : 'bg-green-700 text-white hover:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800'
          }`}
        >
          Quiero saber mas
          <SocialIcon network="whatsapp" className="ml-1 w-5 md:w-6" bgColor='transparent'/>
        </button>
      </div>
    </div>
  );
}
