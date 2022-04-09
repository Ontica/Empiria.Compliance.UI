/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { EventInfo } from '@app/core';

import { sendEvent } from '@app/shared/utils';

import { EmptyObligation, Obligation, ObligationDescriptor } from '@app/models';

import { ObligationsFilterEventType } from './obligations-filter.component';

import { ObligationsListEventType } from './obligations-list.component';

import { ObligationsControlsEventType } from './obligations-controls.component';

export enum  ObligationsExplorerEventType {
  SEARCH_OBLIGATIONS = 'ObligationsExplorerComponent.Event.SearchObligations',
  EXPORT_OBLIGATIONS = 'ObligationsExplorerComponent.Event.ExportObligations',
  SELECT_OBLIGATION = 'ObligationsExplorerComponent.Event.SelectObligation',
}

@Component({
  selector: 'emp-com-obligations-explorer',
  templateUrl: './obligations-explorer.component.html',
})
export class ObligationsExplorerComponent implements OnChanges {

  @Input() obligationsList: ObligationDescriptor[] = [];

  @Input() obligationSelected: Obligation = EmptyObligation;

  @Input() commandExecuted = false;

  @Input() isLoading = false;

  @Output() obligationsExplorerEvent = new EventEmitter<EventInfo>();

  hint = 'Selecciona los filtros';

  textNotFound = 'No se ha invocado la búsqueda de obligaciones.';


  ngOnChanges() {
    this.setTexts();
  }


  onObligationsFilterEvent(event) {
    switch (event.type as ObligationsFilterEventType) {

      case ObligationsFilterEventType.SEARCH_CLICKED:
        sendEvent(this.obligationsExplorerEvent, ObligationsExplorerEventType.SEARCH_OBLIGATIONS,
          event.payload);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onObligationsControlsEvent(event) {
    if (!this.commandExecuted) {
      return;
    }

    switch (event.type as ObligationsControlsEventType) {

      case ObligationsControlsEventType.EXPORT_BUTTON_CLICKED:
        sendEvent(this.obligationsExplorerEvent, ObligationsExplorerEventType.EXPORT_OBLIGATIONS);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onObligationsListEvent(event) {
    switch (event.type as ObligationsListEventType) {

      case ObligationsListEventType.ITEM_CLICKED:
        sendEvent(this.obligationsExplorerEvent, ObligationsExplorerEventType.SELECT_OBLIGATION,
          event.payload);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private setTexts() {
    if (this.isLoading) {
      this.textNotFound = 'Buscando obligaciones...';
      this.hint = 'Buscando obligaciones...';
      return;
    }

    this.hint = this.commandExecuted ?
      `${this.obligationsList.length} registros encontrados` :
      'Selecciona los filtros';

    this.textNotFound = this.commandExecuted ?
      'No se encontraron obligaciones con el filtro proporcionado.' :
      'No se ha invocado la búsqueda de obligaciones.';
  }

}
