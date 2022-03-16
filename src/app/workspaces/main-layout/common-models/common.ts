/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

export type LayoutType = 'RegulatoryTrees' | 'Library' | 'Unauthorized';


export interface Layout {
  name: LayoutType;
  views: View[];
  hint: string;
  defaultTitle: string;
}


export interface View {
  name: string;
  title: string;
  url: string;
  menuTitle?: string;
  disabled?: boolean;
  permission?: string;
}


export const DefaultView: View = {
  name: 'Default view',
  title: 'Default view',
  url: '/',
};
