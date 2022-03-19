/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { MainUIStateSelector } from '@app/presentation/exported.presentation.types';


@Component({
  selector: 'emp-com-process-tree-main-page',
  templateUrl: './process-tree-main-page.component.html'
})
export class ProcessTreeMainPageComponent implements OnInit, OnDestroy {

  displaySecondaryView = false;

  helper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer) {
    this.helper = uiLayer.createSubscriptionHelper();
  }


  ngOnInit(): void {
    this.suscribeToAction();
  }


  ngOnDestroy() {
    this.helper.destroy();
  }


  private suscribeToAction() {
    this.helper.select<any>(MainUIStateSelector.VIEW_ACTION)
      .subscribe(x => console.log(x));
  }

}
