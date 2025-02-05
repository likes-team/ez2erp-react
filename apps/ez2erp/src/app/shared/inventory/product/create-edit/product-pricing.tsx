'use client';

import React, { useState } from "react";
import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';

export default function ProductPricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [salePriceStep, salePriceSetStep] = useState<any>(0.01);
  const [costPriceStep, costPriceSetStep] = useState<any>(0.01);

  return (
    <>
      <Input
        label="Sale Price"
        placeholder="1.00"
        {...register('salePrice')}
        error={errors.salePrice?.message as string}
        prefix={'$'}
        type="number"
        step={0.01}
        onChange={e => {
          salePriceSetStep(e.target.value);
        }}
        value={salePriceStep}
      />
      <Input
        label="Cost Price"
        placeholder="1.00"
        {...register('costPrice')}
        error={errors.costPrice?.message as string}
        prefix={'$'}
        type="number"
        step={0.01}
        onChange={e => {
          costPriceSetStep(e.target.value);
        }}
        value={costPriceStep}
      />
      {/* <Input
        label="Retail Price"
        placeholder="10"
        {...register('retailPrice')}
        error={errors.retailPrice?.message as string}
        prefix={'$'}
        type="number"
      /> */}
      {/* <Input
        label="Sale Price"
        placeholder="20"
        {...register('salePrice')}
        error={errors.salePrice?.message as string}
        prefix={'$'}
        type="number"
      /> */}
    </>
  );
}
