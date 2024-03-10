import React from 'react';
import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';

const page = () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/backoffice' },
          {
            label: 'Create Product',
            href: '/backoffice/product/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
};

export default page;
