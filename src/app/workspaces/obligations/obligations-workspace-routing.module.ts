/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ROUTES_LIBRARY } from '@app/main-layout';

import { ObligationsMainPageComponent } from './obligations-main-page.component';


const routes: Routes = [
  {
    data: { permission: ROUTES_LIBRARY.obligations_obligations_explorer.permission },
    path: ROUTES_LIBRARY.obligations_obligations_explorer.path,
    component: ObligationsMainPageComponent,
  },
  {
    path: '',
    redirectTo: ROUTES_LIBRARY.obligations_obligations_explorer.path,
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObligationsWorkspaceRoutingModule { }
