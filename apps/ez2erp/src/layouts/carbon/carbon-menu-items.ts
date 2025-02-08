import { atom } from 'jotai';
import { IconType } from 'react-icons/lib';
import {
  PiBrowser,
  PiFolder
} from 'react-icons/pi';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}

export const carbonMenuItems: MenuItemsType[] = [
  {
    id: '1',
    name: 'Dashboard',
    title: 'Overview3',
    icon: PiBrowser,
    menuItems: [
      {
        name: 'File Manager',
        href: '/',
        icon: PiFolder,
      },
    ]
  }
];

export const carbonMenuItemAtom = atom(carbonMenuItems[0]);
