/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { STATE_HANDLERS } from '@app/core/presentation/presentation.state';

import { MainLayoutPresentationHandler } from './main-layout/main-layout.presentation.handler';

import { ObligationsPresentationHandler } from './compliance/obligations.presentation.handler';

@NgModule({

  providers: [
    MainLayoutPresentationHandler,
    ObligationsPresentationHandler,

    { provide: STATE_HANDLERS, useExisting: MainLayoutPresentationHandler, multi: true },
    { provide: STATE_HANDLERS, useExisting: ObligationsPresentationHandler, multi: true },
  ]

})
export class StateHandlersModule { }
