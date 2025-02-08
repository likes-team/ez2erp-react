import { IconType } from 'react-icons/lib';
import { atom } from 'jotai';
import {
  PiFolder,
  PiHouse,
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

export const berylliumMenuItems: MenuItemsType[] = [
  {
    id: '1',
    name: 'Home',
    title: 'Overview1',
    icon: PiHouse,
    menuItems: [
      {
        name: 'File Manager',
        href: '/',
        icon: PiFolder,
      }
    ],
  },
];
export const berylliumMenuItemAtom = atom(berylliumMenuItems[0]);
