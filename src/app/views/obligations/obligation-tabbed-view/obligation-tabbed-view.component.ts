/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { sendEvent } from '@app/shared/utils';

import { Assertion, EventInfo } from '@app/core';

import { EmptyObligation, Obligation } from '@app/models';

import { ObligationEditorEventType } from '../obligation-edition/obligation-editor.component';

export enum ObligationTabbedViewEventType {
  CLOSE_BUTTON_CLICKED = 'ObligationTabbedViewComponent.Event.CloseButtonClicked',
  OBLIGATION_UPDATED   = 'ObligationTabbedViewComponent.Event.ObligationUpdated',
  OBLIGATION_DELETED   = 'ObligationTabbedViewComponent.Event.ObligationDeleted',
}

@Component({
  selector: 'emp-com-obligation-tabbed-view',
  templateUrl: './obligation-tabbed-view.component.html',
})
export class ObligationTabbedViewComponent implements OnChanges {

  @Input() obligation: Obligation = EmptyObligation;

  @Output() obligationTabbedViewEvent = new EventEmitter<EventInfo>();

  hintText = 'Hint Text de obligación x';


  ngOnChanges() {
    this.setTitle();
  }


  onCloseClicked() {
    sendEvent(this.obligationTabbedViewEvent, ObligationTabbedViewEventType.CLOSE_BUTTON_CLICKED);
  }


  onOligationEditorEvent(event) {
    switch (event.type as ObligationEditorEventType) {

      case ObligationEditorEventType.OBLIGATION_UPDATED:
        Assertion.assertValue(event.payload.obligation, 'event.payload.obligation');
        sendEvent(this.obligationTabbedViewEvent, ObligationTabbedViewEventType.OBLIGATION_UPDATED,
          event.payload);
        return;

      case ObligationEditorEventType.OBLIGATION_DELETED:
        Assertion.assertValue(event.payload.obligation, 'event.payload.obligation');
        sendEvent(this.obligationTabbedViewEvent, ObligationTabbedViewEventType.OBLIGATION_DELETED,
          event.payload);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private setTitle() {
    this.hintText =  `${this.obligation.topics}</strong> &nbsp; &nbsp; | &nbsp; &nbsp; ` +
      `${this.obligation.regulator.name}`;
  }

}
