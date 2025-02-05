import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/inventory/product/create-edit';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Product',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.products,
      name: 'Products',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.inventory.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
        </Link>
      </PageHeader>

      <CreateEditProduct />
    </>
  );
}
