import { routes } from '@/config/routes';
import {
  PiFolderDuotone,
  PiWrenchDuotone
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // Ez2erp menu
  {
    name: 'Dashboards',
  },
  {
    name: 'Main Dashboard',
    href: '/',
    icon: <PiFolderDuotone />,
    badge: 'DEV',
  },
  {
    name: 'Accounting',
  },
  {
    name: 'Customers',
    href: '/accounting/customers',
    icon: <PiFolderDuotone />,
    badge: 'NEW',
  },
  {
    name: 'POS',
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: <PiFolderDuotone />,
    badge: 'DEV',
  },
  {
    name: 'Inventory',
  },
  {
    name: 'Products',
    href: '/inventory/products',
    icon: <PiFolderDuotone />,
    badge: 'NEW',
  },
  {
    name: 'Configuration',
    href: '#',
    icon: <PiWrenchDuotone />,
    badge: 'NEW',
    dropdownItems: [
      {
        name: 'Product Categories',
        href: routes.inventory.productCategories,
        badge: 'NEW',
      },
    ],
  },
];
