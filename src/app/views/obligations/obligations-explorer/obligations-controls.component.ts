/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EventInfo } from '@app/core';

import { sendEvent } from '@app/shared/utils';

export enum ObligationsControlsEventType {
  EXPORT_BUTTON_CLICKED = 'ObligationsControlsComponent.Event.ExportButtonClicked',
}

@Component({
  selector: 'emp-com-obligations-controls',
  templateUrl: './obligations-controls.component.html',
})
export class ObligationsControlsComponent {

  @Input() hint: string = '';

  @Input() commandExecuted = false;

  @Output() obligationsControlsEvent = new EventEmitter<EventInfo>();

  onExportButtonClicked() {
    sendEvent(this.obligationsControlsEvent, ObligationsControlsEventType.EXPORT_BUTTON_CLICKED);
  }

}
