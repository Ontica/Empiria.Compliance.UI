/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Assertion, EventInfo } from '@app/core';

import { MessageBoxService } from '@app/shared/containers/message-box';

import { EmptyObligation, Obligation } from '@app/models';

import { ObligationHeaderEventType } from './obligation-header.component';

export enum ObligationEditorEventType {
  OBLIGATION_UPDATED = 'ObligationEditorComponent.Event.ObligationUpdated',
  OBLIGATION_DELETED = 'ObligationEditorComponent.Event.ObligationDeleted',
}

@Component({
  selector: 'emp-com-obligation-editor',
  templateUrl: './obligation-editor.component.html',
})
export class ObligationEditorComponent {

  @Input() obligation: Obligation = EmptyObligation;

  @Output() oligationEditorEvent = new EventEmitter<EventInfo>();

  submitted = false;

  constructor(private messageBox: MessageBoxService) {

  }

  onObligationHeaderEvent(event) {
    if (this.submitted) {
      return;
    }

    switch (event.type as ObligationHeaderEventType) {

      case ObligationHeaderEventType.UPDATE_OBLIGATION_CLICKED:
        Assertion.assertValue(event.payload.obligation, 'event.payload.obligation');
        this.updateObligation(event.payload.obligation as any);
        return;

      case ObligationHeaderEventType.DELETE_OBLIGATION_CLICKED:
        Assertion.assertValue(event.payload.obligation.uid, 'event.payload.obligation.uid');
        this.deleteObligation(event.payload.obligation.uid);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private updateObligation(obligationFields: any) {
    this.submitted = true;

    setTimeout(() => {
      this.messageBox.showInDevelopment('Actualizar obligación', obligationFields);
      this.submitted = false
    }, 500);
  }


  private deleteObligation(obligationUID: string) {
    this.submitted = true;

    setTimeout(() => {
      this.messageBox.showInDevelopment('Eliminar obligación', obligationUID);
      this.submitted = false
    }, 500);
  }

}
