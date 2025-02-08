import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  PiFolderDuotone,
  PiShoppingCartDuotone,
  PiPipeWrenchDuotone,
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
  },
  {
    name: 'Accounting',
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: <PiFolderDuotone />,
  },
  {
    name: 'POS',
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: <PiFolderDuotone />,
  },
  {
    name: 'Inventory',
  },
  {
    name: 'Products',
    href: '/inventory/products',
    icon: <PiFolderDuotone />,
  },
  {
    name: 'Configuration',
    href: '#',
    icon: <PiWrenchDuotone />,
    dropdownItems: [
      {
        name: 'Product Categories',
        href: routes.inventory.products,
      },
    ],
  },
];
