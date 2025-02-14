'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  productTypeOption,
} from '@/app/shared/inventory/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import QuillLoader from '@core/components/loader/quill-loader';
import { useEffect, useState } from 'react';
// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });
const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function CustomerGeneralInfo({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="General Info"
      description="Edit your product description and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Name"
        placeholder="Customer name"
        {...register('name')}
        error={errors.name?.message as string}
      />
      <Input
        label="Email"
        placeholder="Email address"
        {...register('email')}
        error={errors.sku?.message as string}
      />

      <Controller
        name="productType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={productTypeOption}
            value={value}
            onChange={(e) => {
              console.log(e);
            }}
            label="Product Type"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
}
