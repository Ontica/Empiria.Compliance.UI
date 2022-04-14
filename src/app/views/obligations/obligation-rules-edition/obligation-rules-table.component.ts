/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { EventInfo } from '@app/core';

import { ObligationRule } from '@app/models';

import { sendEvent } from '@app/shared/utils';

export enum ObligationRulesTableEventType {
  UPDATE_OBLIGATION_RULE_CLICKED = 'ObligationRulesTableComponent.Event.UpdateObligationRuleClicked',
  REMOVE_OBLIGATION_RULE_CLICKED = 'ObligationRulesTableComponent.Event.RemoveObligationRuleClicked',
}

@Component({
  selector: 'emp-com-obligation-rules-table',
  templateUrl: './obligation-rules-table.component.html',
})
export class ObligationRulesTableComponent implements OnChanges {

  @Input() obligationRulesList: ObligationRule[] = [];

  @Output() obligationRulesTableEvent = new EventEmitter<EventInfo>();

  displayedColumns: string[] = ['context', 'ruleType', 'notes'];

  dataSource: MatTableDataSource<ObligationRule>;


  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.obligationRulesList);
  }


  onObligationRuleClicked(obligationRule: ObligationRule) {
    if (window.getSelection().toString().length <= 0) {
      sendEvent(this.obligationRulesTableEvent, ObligationRulesTableEventType.UPDATE_OBLIGATION_RULE_CLICKED,
        {obligationRule});
    }
  }

}
