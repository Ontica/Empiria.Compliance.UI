/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */



import { ROUTES_LIBRARY } from '.';

import { View } from '../common-models/common';


export const ProcessesViews: View[] = [
  {
    name: 'RegulatoryTreesViews.ObligationsTree',
    title: 'Obligations Tree',
    url: ROUTES_LIBRARY.regulatory_processes_obligations_tree.fullpath,
    permission: ROUTES_LIBRARY.regulatory_processes_obligations_tree.permission,
    actions: [
      {action: 'ActionFilter', name: 'Filters', icon: 'filter_list'}
    ]
  },
];


export const UnauthorizedViews: View[] = [
  {
    name: 'Unauthorized',
    title: '',
    url: ROUTES_LIBRARY.unauthorized.fullpath,
  },
];
