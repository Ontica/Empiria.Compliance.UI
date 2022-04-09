/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { Assertion, EventInfo } from '@app/core';

import { sendEvent } from '@app/shared/utils';

import { EmptyObligation, Obligation, ObligationDescriptor } from '@app/models';

import { ObligationsListItemEventType } from './obligations-list-item.component';

export enum ObligationsListEventType {
  ITEM_CLICKED = 'ObligationsListComponent.Event.ItemClicked',
}

@Component({
  selector: 'emp-com-obligations-list',
  templateUrl: './obligations-list.component.html',
})
export class ObligationsListComponent implements OnChanges {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  @Input() obligationsList: ObligationDescriptor[] = [];

  @Input() obligationSelected: Obligation = EmptyObligation;

  @Input() textNotFound = 'No se ha invocado la búsqueda de obligaciones.';

  @Output() obligationsListEvent = new EventEmitter<EventInfo>();


  ngOnChanges(changes: SimpleChanges) {
    if (changes.obligationsList) {
      this.scrollToTop();
    }
  }


  isSelected(obligation: ObligationDescriptor) {
    return (this.obligationSelected.uid === obligation.uid);
  }


  onObligationsListItemEvent(event) {
    switch (event.type as ObligationsListItemEventType) {
      case ObligationsListItemEventType.OBLIGATION_CLICKED:
        Assertion.assertValue(event.payload.obligation, 'event.payload.obligation');
        sendEvent(this.obligationsListEvent, ObligationsListEventType.ITEM_CLICKED, event.payload);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private scrollToTop() {
    if (this.virtualScroll) {
      this.virtualScroll.scrollToIndex(0);
    }
  }

}
