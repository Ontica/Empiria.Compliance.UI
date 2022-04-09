/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export enum PermissionsLibrary {
  ALL = 'all',
}


export const ROUTES_LIBRARY = {

  // #region app-routing module

  obligations: {
    permission: PermissionsLibrary.ALL,
    parent: '',
    path: 'obligaciones',
    fullpath: '/obligaciones',
  },

  security: {
    parent: '',
    path: 'security',
    fullpath: '/security',
  },

  unauthorized: {
    parent: '',
    path: 'unauthorized',
    fullpath: '/unauthorized',
  },

  // #endregion

  // #region obligations-routing module

  obligations_obligations_explorer: {
    permission: PermissionsLibrary.ALL,
    parent: 'obligaciones',
    path: 'explorador-de-obligaciones',
    fullpath: '/obligaciones/explorador-de-obligaciones'
  },

  // #endregion

  // #region security-routing module

  security_login: {
    parent: 'security',
    path: 'login',
    fullpath: '/security/login'
  },

  // #endregion

};


export const DEFAULT_ROUTE = ROUTES_LIBRARY.obligations;


export const DEFAULT_URL = ( DEFAULT_ROUTE.parent ? DEFAULT_ROUTE.parent + '/' : '' ) + DEFAULT_ROUTE.path;


export const UNAUTHORIZED_ROUTE = ROUTES_LIBRARY.unauthorized.path;


export const ROUTES_LIST = Object.keys(ROUTES_LIBRARY)
                                 .map(key => ROUTES_LIBRARY[key])
                                 .filter(x => x.parent && x.permission);

export function getAllPermissions() {
    return Object.keys(PermissionsLibrary)
                 .map(key => PermissionsLibrary[key]);
}
