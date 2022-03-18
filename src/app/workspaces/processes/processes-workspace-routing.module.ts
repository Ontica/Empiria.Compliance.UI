/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ROUTES_LIBRARY } from '@app/main-layout';

import { ProcessTreeMainPageComponent } from './process-tree-main-page.component';


const routes: Routes = [
  {
    data: { permission: ROUTES_LIBRARY.regulatory_processes_obligations_tree.permission },
    path: ROUTES_LIBRARY.regulatory_processes_obligations_tree.path,
    component: ProcessTreeMainPageComponent,
  },
  {
    path: '',
    redirectTo: ROUTES_LIBRARY.regulatory_processes_obligations_tree.path,
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesWorkspaceRoutingModule { }
