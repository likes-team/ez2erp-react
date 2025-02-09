import Link from 'next/link';
import { Metadata } from 'next';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/inventory/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';
import { getProduct } from '@/server/inventory/product-server';
import { ProductType } from '@/types/product-type';
import { CreateProductInput } from '@/validators/create-product.schema';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  return metaObject(`Edit ${slug}`);
}

const pageHeader = {
  title: 'Edit Product',
  breadcrumb: [
    {
      href: routes.inventory.products,
      name: 'E-Commerce',
    },
    {
      href: routes.inventory.products,
      name: 'Products',
    },
    {
      name: 'Edit',
    },
  ],
};

export default async function EditProductPage({ params }: any) {
  const slug = (await params).slug;
  console.log(slug);
  const product: ProductType = await getProduct(slug);
  console.log(product);
  const editProductObj: CreateProductInput = {...product};
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.inventory.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link>
      </PageHeader>

      <CreateEditProduct slug={slug} product={editProductObj} />
    </>
  );
}
