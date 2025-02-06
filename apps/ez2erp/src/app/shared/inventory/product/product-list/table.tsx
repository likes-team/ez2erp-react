'use client';

import { ProductType, productsData } from '@/data/products-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { ProductsDataType } from '@/app/shared/ecommerce/dashboard/stock-report';
import { productsListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import { lambdaUrls } from '@/config/lambda-urls';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';


export default function ProductsTable({
  tableData=[],
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
  tableData?: ProductType[]; 
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

  const { table, setData } = useTanStackTable<ProductsDataType>({
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
          setData((prev) => prev.filter((r) => r.id !== row.id));
        }
      },
      enableColumnResizing: false,
    },
  });

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      getProducts();
    }
    if (isDataFetching === false){
      setData(productData);
    }
  }, [isDataFetching]);

  // const selectedData = table
  //   .getSelectedRowModel()
  //   .rows.map((row) => row.original);

  // function handleExportData() {
  //   exportToCSV(
  //     selectedData,
  //     'ID,Name,Category,Sku,Price,Stock,Status,Rating',
  //     `product_data_${selectedData.length}`
  //   );
  // }

  const getProducts = () => fetch(lambdaUrls.getProducts, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((res: any) => res.json())
  .then((data) => {
    const result: any = [];
    console.log(data.data.length);
    for (let i=0; i < data.data.length; i++){
      const productJson = data.data[i];
      const product: ProductType = {
        id: productJson.id,
        sku: productJson.sku,
        category: productJson.category_id,
        name: productJson.name,
        image: '',
        stock: 0,
        price: '',
        status: '',
        rating: []
      }
      // console.log(product);
      result.push(product)
    }
    setProductData(result);
    setDataFetching(false);
  });
  

  // getProducts();
  console.log('productData:', productData);

  console.log(table.getPageCount());
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
