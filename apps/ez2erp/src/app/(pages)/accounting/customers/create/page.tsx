import Link from 'next/link';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditCustomer from '@/app/components/accounting/customer/create-edit';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Product',
  breadcrumb: [
    {
      href: routes.inventory.products,
      name: 'Accounting',
    },
    {
      href: routes.inventory.products,
      name: 'Customers',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateCustomerPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.inventory.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
        </Link>
      </PageHeader>

      <CreateEditCustomer />
    </>
  );
}
