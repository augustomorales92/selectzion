import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function Footer() {
  return (
    <footer className="flex h-20 shrink-0 items-end justify-center rounded-lg bg-gray-50 p-4 md:h-32">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <p>© 2024 SelectZion</p>
          <p>
            Creado por <span className="font-bold">Augusto Morales</span>
          </p>
        </div>
        <div className="flex space-x-4">
          <SocialIcon network="instagram" className="ml-1 w-5 md:w-6" />
          <SocialIcon network="facebook" className="ml-1 w-5 md:w-6" />
          <SocialIcon network="whatsapp" className="ml-1 w-5 md:w-6" />
        </div>
        <div>
          <button className="hidden rounded-md px-4 py-2 text-white md:inline-block">
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-transparent px-6 py-3 text-sm font-medium text-gray-400 text-white transition-colors hover:bg-gray-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </button>
        </div>
      </div>
    </footer>
  );
}
