import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import CustomersTable from '@/app/components/accounting/customer/customer-list/table';

export const metadata = {
  ...metaObject('Customers'),
};

const pageHeader = {
  title: 'Customers',
  breadcrumb: [
    {
      href: routes.mainDashboard,
      name: 'Accounting',
    },
    {
      href: routes.inventory.products,
      name: 'Customers',
    },
    {
      name: 'List',
    },
  ],
};

export default function CustomersPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.accounting.createCustomer}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Customer
            </Button>
          </Link>
        </div>
      </PageHeader>

      <CustomersTable pageSize={10} />
    </>
  );
}
