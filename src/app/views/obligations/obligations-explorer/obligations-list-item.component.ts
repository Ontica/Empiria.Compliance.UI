/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EventInfo } from '@app/core';

import { ObligationDescriptor } from '@app/models';

import { sendEvent } from '@app/shared/utils';

export enum ObligationsListItemEventType {
  OBLIGATION_CLICKED = 'ObligationsListItemComponent.Event.ObligationClicked',
}


@Component({
  selector: 'emp-com-obligations-list-item',
  templateUrl: './obligations-list-item.component.html',
})
export class ObligationsListItemComponent {

  @Input() obligation: ObligationDescriptor;

  @Input() isSelected = false;

  @Output() obligationsListItemEvent = new EventEmitter<EventInfo>();


  onObligationClicked(){
    sendEvent(this.obligationsListItemEvent, ObligationsListItemEventType.OBLIGATION_CLICKED,
      {obligation: this.obligation});
  }

}
