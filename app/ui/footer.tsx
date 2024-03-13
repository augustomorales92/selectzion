import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function Footer() {
  return (
<footer className="flex flex-col items-center justify-center bg-gray-50 p-4 md:flex-row md:h-32">
  <div className="text-center md:text-left md:w-1/3 mb-4 md:mb-0 md:mr-4">
    <p className="mb-2">© 2024 SelectZion</p>
    <p>
      Creado por <span className="font-bold">Augusto Morales</span>
    </p>
  </div>
  <div className="flex justify-center space-x-4 md:justify-between md:w-1/3 md:mx-auto md:mb-4">
    <SocialIcon network="instagram" className="w-5 md:w-6" />
    <SocialIcon network="facebook" className="w-5 md:w-6" />
    <SocialIcon network="whatsapp" className="w-5 md:w-6" />
  </div>
  <div className="mt-4 md:mt-0 md:w-1/3 md:flex md:justify-end">
    <button className="rounded-md px-4 py-2 text-white md:inline-block bg-transparent hover:bg-gray-600">
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-lg bg-transparent text-sm font-medium text-gray-400 text-white transition-colors hover:bg-gray-400 md:text-base"
      >
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </button>
  </div>
</footer>

  );
}
