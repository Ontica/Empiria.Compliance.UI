/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View, Layout } from '../common-models/common';

import { ROUTES_LIBRARY } from './permissions-config';

import { ProcessesViews, UnauthorizedViews } from './views-config';


export const APP_VIEWS: View[] = ProcessesViews.concat(UnauthorizedViews);


export const APP_LAYOUTS: Layout[] = [
  {
    name: 'RegulatoryTrees',
    views: ProcessesViews,
    hint: 'Regulatory Trees',
    defaultTitle: 'Regulatory Trees',
    url: ROUTES_LIBRARY.regulatory_processes.fullpath,
    permission: ROUTES_LIBRARY.regulatory_processes.permission,
  },
  {
    name: 'Unauthorized',
    views: UnauthorizedViews,
    hint: '',
    defaultTitle: '401: Unauthorized',
    url: ROUTES_LIBRARY.unauthorized.fullpath,
  },
];
