/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { Assertion, isEmpty } from '@app/core';

import { EmptyObligationRule, ObligationRule } from '@app/models';

import { MessageBoxService } from '@app/shared/containers/message-box';

import { ObligationRuleEditorEventType } from './obligation-rule-editor.component';

import { ObligationRulesTableEventType } from './obligation-rules-table.component';

@Component({
  selector: 'emp-com-obligation-rules-edition',
  templateUrl: './obligation-rules-edition.component.html',
})
export class ObligationRulesEditionComponent {

  @Input() obligationRuleList: ObligationRule[] = [];

  displayObligationRuleEditor = false;

  obligationRuleSelected = EmptyObligationRule;

  constructor(private messageBox: MessageBoxService) {

  }


  get obligationRuleDefault(): ObligationRule {
    return this.obligationRuleList.find(x => x.isDefault) ?? EmptyObligationRule;
  }


  get additionalObligationRulesList(): ObligationRule[] {
    return this.obligationRuleList.filter(x => !x.isDefault);
  }


  get isObligationRuleSelectedNew(): boolean {
    return isEmpty(this.obligationRuleSelected);
  }


  onObligationRuleEditorEvent(event) {
    switch (event.type as ObligationRuleEditorEventType) {

      case ObligationRuleEditorEventType.ADD_NEW_OBLIGATION_RULE_CLICKED:
        this.setObligationRuleSelected(EmptyObligationRule, true);

        return;

      default:
        this.messageBox.showInDevelopment('Edición de reglas', {event});
        return;
    }
  }


  onCloseObligationRuleEditorEvent() {
    this.setObligationRuleSelected(EmptyObligationRule, false);
  }


  onObligationRulesTableEvent(event) {
    switch (event.type as ObligationRulesTableEventType) {

      case ObligationRulesTableEventType.UPDATE_OBLIGATION_RULE_CLICKED:
        Assertion.assertValue(event.payload.obligationRule, 'event.payload.obligationRule');
        this.setObligationRuleSelected(event.payload.obligationRule, !isEmpty(event.payload.obligationRule));
        return;

      default:
        this.messageBox.showInDevelopment('Edición de reglas', {event});
        return;
    }
  }


  private setObligationRuleSelected(obligationRule: ObligationRule, display: boolean){
    this.obligationRuleSelected = obligationRule;
    this.displayObligationRuleEditor = display;
  }
}
