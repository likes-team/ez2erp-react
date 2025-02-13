import CreateCategory from '@/app/components/inventory/product-category/create-category';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Create a Category'),
};

const pageHeader = {
  title: 'Create A Category',
  breadcrumb: [
    {
      href: routes.inventory.products,
      name: 'Inventory',
    },
    {
      href: routes.inventory.productCategories,
      name: 'Product Categories',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateCategoryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.inventory.productCategories}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      <CreateCategory />
    </>
  );
}
