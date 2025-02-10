'use client';

import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { productsListColumns } from './columns';
import Filters from './filters';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { useEffect, useMemo, useRef, useState } from 'react';
import { deleteProduct, getProducts } from '@/server/inventory/product-server';
import { ProductType } from '@/types/product-type';


export default function ProductsTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: 'border border-muted rounded-md',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const [productData, setProductData] = useState([]);
  const [isDataFetching, setDataFetching] = useState(true);
  const memoizedProductData = useMemo(() => productData, [productData]);

  const { table, setData } = useTanStackTable<ProductType>({
    tableData: memoizedProductData,
    columnConfig: productsListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row: any) => {
          deleteProduct(row.id);
          setData((prev) => prev.filter((r) => r.id !== row.id));
        }
      },
      enableColumnResizing: false,
    },
  });

  const initialized = useRef(false);

  useEffect(() => {
    let isMounted = true; // note mutable flag
    if (!initialized.current) {
      initialized.current = true
      const products = getProducts().then((data: any) =>{
        if (isMounted){
          setProductData(data);
          setDataFetching(false);
        } 
      });
    }

    if (isMounted && isDataFetching === false){
      setData(productData);
    }
    return () => { isMounted = false };
  }, [isDataFetching]);

  console.log('productData:', productData);
  return (
    <>
      {!hideFilters && <Filters table={table} />}
      <Table
        table={table}
        isLoading={isDataFetching}
        variant="modern"
        classNames={classNames}
      />
      {/* {!hideFooter && <TableFooter table={table} onExport={handleExportData} />} */}
      {!hidePagination && (
        <TablePagination
          table={table}
          className={cn('py-4', paginationClassName)}
        />
      )}
    </>
  );
}
