import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/components/inventory/product/product-list/table';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';

export const metadata = {
  ...metaObject('Products'),
};

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.mainDashboard,
      name: 'Inventory',
    },
    {
      href: routes.inventory.products,
      name: 'Products',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.inventory.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
        </div>
      </PageHeader>

      <ProductsTable pageSize={10} />
    </>
  );
}
