'use client';

import { categories } from '@/data/product-categories';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { categoriesColumns } from './columns';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getProductCategories } from '@/server/inventory/product-category-server';
import { ProductCategoryType } from '@/types/product-category-type';


export default function CategoryTable() {
  const [productCategories, setProductCategories] = useState([]);
  const [isDataFetching, setDataFetching] = useState(true);
  const memoizedProductCategoriesData = useMemo(() => productCategories, [productCategories]);

  const { table, setData } = useTanStackTable<ProductCategoryType>({
    tableData: memoizedProductCategoriesData,
    columnConfig: categoriesColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  const initialized = useRef(false);

  useEffect(() => {
    let isMounted = true; // note mutable flag
    if (!initialized.current) {
      initialized.current = true
      getProductCategories().then((data: any) =>{
        if (isMounted){
          setProductCategories(data);
          setDataFetching(false);
        } 
      });
    }

    if (isMounted && isDataFetching === false){
      setData(productCategories);
    }
    return () => { isMounted = false };
  }, [isDataFetching]);

  console.log('productCategories:', productCategories);
  return (
    <>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </>
  );
}
