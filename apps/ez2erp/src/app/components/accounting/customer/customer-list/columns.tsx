'use client';

import DeletePopover from '@core/components/delete-popover';
import { getStockStatus } from '@core/components/table-utils/get-stock-status';
import { routes } from '@/config/routes';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import { CustomerType } from '@/types/customer-type';

const columnHelper = createColumnHelper<CustomerType>();

export const customersListCols = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Product',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.image}
        name={row.original.name}
        // description={row.original.category}
        avatarProps={{
          name: row.original.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),
  columnHelper.display({
    id: 'email',
    size: 150,
    header: 'EMAIL',
    cell: ({ row }) => <Text className="text-sm">{row.original.email}</Text>,
  }),
  columnHelper.display({
    id: 'address',
    size: 150,
    header: 'ADDRESS',
    cell: ({ row }) => <Text className="text-sm">{row.original.address.address_1}</Text>,
  }),
  columnHelper.display({
    id: 'contact_no',
    size: 150,
    header: 'PHONES',
    cell: ({ row }) => <Text className="text-sm">{row.original.address.address_1}</Text>,
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content={'Edit Product'}
          placement="top"
          color="invert"
        >
          <Link href={routes.inventory.ediProduct(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Product'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.original.id} product?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
