import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductDetails from '@/app/shared/inventory/product/product-details';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Product Details'),
};

export default async function ProductDetailsPage({ params }: any) {
  const slug = (await params).slug;

  const pageHeader = {
    title: 'Inventory',
    breadcrumb: [
      {
        href: routes.inventory.products,
        name: 'Product',
      },
      {
        href: routes.inventory.products,
        name: 'Details',
      },
      {
        name: slug,
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetails />
    </>
  );
}
