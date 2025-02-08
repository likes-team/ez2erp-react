import { routes } from '@/config/routes';
import CategoryTable from '@/app/shared/inventory/category/category-list/table';
import CategoryPageHeader from './category-page-header';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Categories'),
};

const pageHeader = {
  title: 'Categories',
  breadcrumb: [
    {
      href: routes.inventory.products,
      name: 'E-Commerce',
    },
    {
      href: routes.inventory.products,
      name: 'Categories',
    },
    {
      name: 'List',
    },
  ],
};

export default function CategoriesPage() {
  return (
    <>
      <CategoryPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      <CategoryTable />
    </>
  );
}
