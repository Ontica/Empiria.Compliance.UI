/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View, Layout } from '../common-models/common';

import { ROUTES_LIBRARY } from './permissions-config';

import { ObligationsViews, UnauthorizedViews } from './views-config';


export const APP_VIEWS: View[] = UnauthorizedViews.concat(ObligationsViews);


export const APP_LAYOUTS: Layout[] = [
  {
    name: 'Obligations',
    views: ObligationsViews,
    hint: 'Obligaciones',
    defaultTitle: 'Obligaciones',
    url: ROUTES_LIBRARY.obligations.fullpath,
    permission: ROUTES_LIBRARY.obligations.permission,
  },
  {
    name: 'Unauthorized',
    views: UnauthorizedViews,
    hint: '',
    defaultTitle: '401: Unauthorized',
    url: ROUTES_LIBRARY.unauthorized.fullpath,
  },
];
