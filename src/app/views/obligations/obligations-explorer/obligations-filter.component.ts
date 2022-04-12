/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { combineLatest } from 'rxjs';

import { EventInfo, Identifiable } from '@app/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { EmptyObligationCommand, ObligationCommand } from '@app/models';

import { ObligationsStateSelector } from '@app/presentation/exported.presentation.types';

import { sendEvent } from '@app/shared/utils';

export enum ObligationsFilterEventType {
  SEARCH_CLICKED = 'ObligationsFilterComponent.Event.SearchClicked',
}

@Component({
  selector: 'emp-ng-obligations-filter',
  templateUrl: './obligations-filter.component.html',
  styles: [`:host { width: 100%; }`]
})

export class ObligationsFilterComponent implements OnInit, OnDestroy  {

  @Output() obligationsFilterEvent = new EventEmitter<EventInfo>();

  isLoading = false;

  submitted = false;

  formData: ObligationCommand = Object.assign({}, EmptyObligationCommand);

  topicsList: string[] = [];

  regulatorsList: Identifiable[] = [];

  helper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer) {
    this.helper = uiLayer.createSubscriptionHelper();
  }

  ngOnInit() {
    this.loadDataLists();
  }


  ngOnDestroy() {
    this.helper.destroy();
  }


  onSearchClicked() {
    this.submitted = true;

    const payload = { command: this.getObligationCommand() };

    sendEvent(this.obligationsFilterEvent, ObligationsFilterEventType.SEARCH_CLICKED, payload);
  }


  private loadDataLists() {
    this.isLoading = true;

    combineLatest([
      this.helper.select<string[]>(ObligationsStateSelector.TOPICS_LIST),
      this.helper.select<Identifiable[]>(ObligationsStateSelector.REGULATORS_LIST),
    ])
    .subscribe(([x, y]) => {
      this.topicsList = x;
      this.regulatorsList = y;
      this.isLoading = false;
    });
  }


  private getObligationCommand(): ObligationCommand {
    const data: ObligationCommand = {
      topics:  this.formData.topics,
      regulators: this.formData.regulators,
      keywords: this.formData.keywords || '',
    };

    return data;
  }

}
