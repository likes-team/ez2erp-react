import { routes } from '@/config/routes';
import CategoryTable from '@/app/components/inventory/product-category/category-list/table';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import Link from 'next/link';
import { Button } from 'rizzui/button';
import { PiPlusBold } from 'react-icons/pi';

export const metadata = {
  ...metaObject('Product Categories'),
};

const pageHeader = {
  title: 'Product Categories',
  breadcrumb: [
    {
      href: routes.inventory.products,
      name: 'Inventory',
    },
    {
      href: routes.inventory.products,
      name: 'Product Categories',
    },
    {
      name: 'List',
    },
  ],
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.inventory.createProductCategory}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product Category
            </Button>
          </Link>
        </div>
      </PageHeader>
      <CategoryTable />
    </>
  );
}
