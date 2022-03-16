/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { SecurityGuard } from '@app/core';

import { MainLayoutComponent, NoContentComponent } from '@app/workspaces/main-layout';

import { DEFAULT_URL, ROUTES_LIBRARY } from '@app/workspaces/main-layout/config-data';

const routes: Routes = [
  {
    data: { permission: ROUTES_LIBRARY.regulatory_processes.permission },
    path: ROUTES_LIBRARY.regulatory_processes.path,
    component: MainLayoutComponent,
    canActivate: [SecurityGuard],
    canActivateChild: [SecurityGuard],
    loadChildren: () => import('./workspaces/processes/processes-workspace.module')
                              .then((m) => m.ProcessesWorkspaceModule)
  },
  {
    path: ROUTES_LIBRARY.unauthorized.path,
    canActivate: [SecurityGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./views/unauthorized/unauthorized.module')
                              .then(m => m.UnauthorizedModule)
  },
  {
    path: ROUTES_LIBRARY.security.path,
    loadChildren: () => import('./views/security/security-ui.module')
                              .then(m => m.SecurityUIModule)
  },
  { path: '', redirectTo: DEFAULT_URL, pathMatch: 'full' },
  { path: '**', component: NoContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
