/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */



import { PermissionsLibrary as Permissions, ROUTES_LIBRARY } from './permissions-config';

import { View } from '../common-models/common';


export const ObligationsViews: View[] = [
  {
    name: 'ObligationsViews.ObligationsExplorer',
    title: 'Explorador de Obligaciones',
    url: ROUTES_LIBRARY.obligations_obligations_explorer.fullpath,
    permission: ROUTES_LIBRARY.obligations_obligations_explorer.permission,
    actions: [
      {action: 'ActionCreate', name: 'Agregar', icon: 'add', permission: Permissions.ALL},
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
