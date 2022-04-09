/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFlexLayoutModule } from '@app/shared/angular-flex-layout.module';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { SharedModule } from '@app/shared/shared.module';

import { ObligationEditorComponent } from './obligation-edition/obligation-editor.component';
import { ObligationHeaderComponent } from './obligation-edition/obligation-header.component';
import { ObligationsControlsComponent } from './obligations-explorer/obligations-controls.component';
import { ObligationsExplorerComponent } from './obligations-explorer/obligations-explorer.component';
import { ObligationsFilterComponent } from './obligations-explorer/obligations-filter.component';
import { ObligationsListComponent } from './obligations-explorer/obligations-list.component';
import { ObligationsListItemComponent } from './obligations-explorer/obligations-list-item.component';
import { ObligationTabbedViewComponent } from './obligation-tabbed-view/obligation-tabbed-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularFlexLayoutModule,
    AngularMaterialModule,
    SharedModule,
  ],
  declarations: [
    ObligationEditorComponent,
    ObligationHeaderComponent,
    ObligationsControlsComponent,
    ObligationsExplorerComponent,
    ObligationsFilterComponent,
    ObligationsListComponent,
    ObligationsListItemComponent,
    ObligationTabbedViewComponent,
  ],
  exports: [
    ObligationsExplorerComponent,
    ObligationTabbedViewComponent,
  ]
})
export class ObligationsModule { }
