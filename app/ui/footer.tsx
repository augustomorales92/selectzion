import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function Footer() {
  return (
    <footer className="md:p4 flex flex-col items-center justify-center rounded-lg bg-gray-50 p-1 md:h-32 md:flex-row">
      <div className="mb-4 text-center text-xs md:mb-0 md:mr-4 md:w-1/3 md:text-left md:text-sm">
        <p className="mb-2">© 2024 SelectZion</p>
        <p>
          Creado por <span className="font-bold">Augusto Morales</span>
        </p>
      </div>
      <div className="flex scale-75 justify-center space-x-4 md:mx-auto md:mb-4 md:w-1/3 md:transform-none md:justify-center">
        <SocialIcon network="instagram" className="w-5 md:w-6" />
        <SocialIcon network="facebook" className="w-5 md:w-6" />
        <SocialIcon network="whatsapp" className="w-5 md:w-6" />
      </div>
      <div className="mt-4 scale-75 md:mt-0 md:flex md:w-1/3 md:transform-none  md:justify-end">
        <button className=" rounded-md bg-transparent px-2 px-4 py-1 text-white hover:bg-gray-600 md:inline-block md:py-2">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-transparent text-sm font-medium text-gray-50 text-white transition-colors hover:bg-gray-400 md:text-gray-50"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </button>
      </div>
    </footer>
  );
}
