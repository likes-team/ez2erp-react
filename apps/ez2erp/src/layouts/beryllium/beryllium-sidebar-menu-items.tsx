import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';

import {
  PiFolder,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const berylliumSidebarMenuItems = [
  // label start
  {
    name: 'Overview2',
  },
  // label end
  {
    name: 'File Manager',
    href: '/',
    icon: <PiFolder />,
  }
];
