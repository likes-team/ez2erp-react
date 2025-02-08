'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import FormNav, {
  formParts,
} from '@/app/shared/inventory/product/create-edit/form-nav';
import ProductSummary from '@/app/shared/inventory/product/create-edit/product-summary';
import { defaultValues } from '@/app/shared/inventory/product/create-edit/form-utils';
import PricingInventory from '@/app/shared/inventory/product/create-edit/pricing-inventory';
import FormFooter from '@core/components/form-footer';
import {
  CreateProductInput,
  productFormSchema,
} from '@/validators/create-product.schema';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { createProduct } from '@/server/inventory/product-server';
import { lambdaUrls } from '@/config/lambda-urls';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.pricingInventory]: PricingInventory,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
}

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    setLoading(true);

    const payload = {
      'name': data.name,
      'sku': data.sku,
      'product_type': data.productType,
      'category_id': data.category,
      'description': data.description,
      'cost_price': data.costPrice,
      'sale_price': data.salePrice
    }

    const productData: any = await fetch(lambdaUrls.createProduct, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then((response) => {
      return response.json();
    })
    console.log('successs');
    console.log(productData);

    setTimeout(() => {
      setLoading(false);

      if (productData.status == "success"){
        toast.success(
          <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
        );
      } else {
        toast.error(
          <Text as="b">messages.requestError</Text>
        );
      }
      methods.reset();
    }, 600);
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
