/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { Assertion, EventInfo, isEmpty } from '@app/core';

import { EmptyObligationRule, ObligationRule } from '@app/models';

import { FormHandler, sendEvent } from '@app/shared/utils';

export enum ObligationRuleEditorEventType {
  CREATE_OBLIGATION_RULE          = 'ObligationRuleEditorComponent.Event.CreateObligationRule',
  UPDATE_OBLIGATION_RULE          = 'ObligationRuleEditorComponent.Event.UpdateObligationRule',
  ADD_NEW_OBLIGATION_RULE_CLICKED = 'ObligationRuleEditorComponent.Event.AddNewObligationRuleClicked',
}

enum ObligationRuleEditorFormControls {
  workflowModel = 'workflowModel',
  executionMode = 'executionMode',
  isMandatory = 'isMandatory',
  isController = 'isController',
  context = 'context',
  whenStartsAskFor = 'whenStartsAskFor',
  whenEndsAskFor = 'whenEndsAskFor',
  dueOnTerm = 'dueOnTerm',
  dueOnTermUnit = 'dueOnTermUnit',
  dueOnCondition = 'dueOnCondition',
  dueOnController = 'dueOnController',
  preventionTerm = 'preventionTerm',
  preventionTermUnit = 'preventionTermUnit',
  preventionExtensionTerm = 'preventionExtensionTerm',
  preventionExtensionTermUnit = 'preventionExtensionTermUnit',
  preventionAttentionTerm = 'preventionAttentionTerm',
  preventionAttentionTermUnit = 'preventionAttentionTermUnit',
  preventionAttentionExtensionTerm = 'preventionAttentionExtensionTerm',
  preventionAttentionExtensionTermUnit = 'preventionAttentionExtensionTermUnit',
  periodicityRuleEachValue = 'periodicityRuleEachValue',
  periodicityRuleEachUnit = 'periodicityRuleEachUnit',
  periodicityRuleDueOnType = 'periodicityRuleDueOnType',
  periodicityRuleDueOnMonth = 'periodicityRuleDueOnMonth',
  periodicityRuleDueOnDay = 'periodicityRuleDueOnDay',
  periodicityRuleNotes = 'periodicityRuleNotes',
}

@Component({
  selector: 'emp-com-obligation-rule-editor',
  templateUrl: './obligation-rule-editor.component.html',
})
export class ObligationRuleEditorComponent implements OnChanges {

  @Input() obligationRule: ObligationRule = EmptyObligationRule;

  @Input() isObligationRuleDefault: boolean = false;

  @Output() obligationRuleEditorEvent = new EventEmitter<EventInfo>();

  formHandler: FormHandler;
  controls = ObligationRuleEditorFormControls;
  editionMode = false;
  isLoading = false;

  constructor() {
    this.initForm();
  }


  ngOnChanges() {
    this.setEditionMode();
  }


  get isSaved(): boolean {
    return !isEmpty(this.obligationRule) || this.isObligationRuleDefault;
  }


  get showPeriodicityRule(): boolean {
    return this.formHandler.getControl(this.controls.executionMode).value  === 'Periodic';
  }


  onAddRuleClicked() {
    sendEvent(this.obligationRuleEditorEvent, ObligationRuleEditorEventType.ADD_NEW_OBLIGATION_RULE_CLICKED);
  }


  enableEditor(enable) {
    this.editionMode = enable;

    if (!this.editionMode) {
      this.setFormData(this.obligationRule);
    }

    this.formHandler.disableForm(!this.editionMode);
  }


  onSubmitForm() {
    if (!this.formHandler.validateReadyForSubmit()) {
      this.formHandler.invalidateForm();
      return;
    }

    const eventType = this.isSaved ?
      ObligationRuleEditorEventType.UPDATE_OBLIGATION_RULE :
      ObligationRuleEditorEventType.CREATE_OBLIGATION_RULE;

    const payload = {
      obligationRule: this.getFormData(),
      obligationRuleUID: this.obligationRule.uid,
    };

    sendEvent(this.obligationRuleEditorEvent, eventType, payload);
  }


  private setEditionMode() {
    this.editionMode = !this.isObligationRuleDefault;

    if (!isEmpty(this.obligationRule)) {
      this.setFormData(this.obligationRule);
    }

    this.formHandler.disableForm(this.isObligationRuleDefault);
  }


  private initForm() {
    if (this.formHandler) {
      return;
    }

    this.formHandler = new FormHandler(
      new FormGroup({
        workflowModel: new FormControl(),
        executionMode: new FormControl(),
        isMandatory: new FormControl(false),
        isController: new FormControl(false),
        context: new FormControl(),
        whenStartsAskFor: new FormControl(),
        whenEndsAskFor: new FormControl(),
        dueOnTerm: new FormControl(),
        dueOnTermUnit: new FormControl(),
        dueOnCondition: new FormControl(),
        dueOnController: new FormControl(),
        preventionTerm: new FormControl(),
        preventionTermUnit: new FormControl(),
        preventionExtensionTerm: new FormControl(),
        preventionExtensionTermUnit: new FormControl(),
        preventionAttentionTerm: new FormControl(),
        preventionAttentionTermUnit: new FormControl(),
        preventionAttentionExtensionTerm: new FormControl(),
        preventionAttentionExtensionTermUnit: new FormControl(),
        periodicityRuleEachValue: new FormControl(),
        periodicityRuleEachUnit: new FormControl(),
        periodicityRuleDueOnType: new FormControl(),
        periodicityRuleDueOnMonth: new FormControl(),
        periodicityRuleDueOnDay: new FormControl(),
        periodicityRuleNotes: new FormControl(),
      })
    );
  }


  private setFormData(obligationRule: ObligationRule) {
    this.formHandler.form.reset({
      workflowModel: obligationRule.workflowModel || '',
      executionMode: obligationRule.executionMode || '',
      isMandatory: obligationRule.isMandatory,
      isController: obligationRule.isController,
      context: obligationRule.context,
      whenStartsAskFor: obligationRule.whenStartsAskFor.map(x => x.name),
      whenEndsAskFor: obligationRule.whenEndsAskFor.map(x => x.name),
      dueOnTerm: obligationRule.dueOn.term,
      dueOnTermUnit: obligationRule.dueOn.termUnit,
      dueOnCondition: obligationRule.dueOn.condition,
      dueOnController: obligationRule.dueOn.controllerName,
      preventionTerm: obligationRule.prevention.term,
      preventionTermUnit: obligationRule.prevention.termUnit,
      preventionExtensionTerm: obligationRule.prevention.extensionTerm,
      preventionExtensionTermUnit: obligationRule.prevention.extensionTermUnit,
      preventionAttentionTerm: obligationRule.preventionAttention.term,
      preventionAttentionTermUnit: obligationRule.preventionAttention.termUnit,
      preventionAttentionExtensionTerm: obligationRule.preventionAttention.extensionTerm,
      preventionAttentionExtensionTermUnit: obligationRule.preventionAttention.extensionTermUnit,
      periodicityRuleEachValue: obligationRule.periodicityRule.each.value,
      periodicityRuleEachUnit: obligationRule.periodicityRule.each.unit,
      periodicityRuleDueOnType: obligationRule.periodicityRule.dueOn.type,
      periodicityRuleDueOnMonth: obligationRule.periodicityRule.dueOn.month,
      periodicityRuleDueOnDay: obligationRule.periodicityRule.dueOn.day,
      periodicityRuleNotes: obligationRule.periodicityRule.notes,
    });
  }


  private getFormData(): any {
    Assertion.assert(this.formHandler.form.valid,
      'Programming error: form must be validated before command execution.');

    const formModel = this.formHandler.form.getRawValue();

    const data: any = {
      workflowModel: formModel.workflowModel,
      executionMode: formModel.executionMode,
      isMandatory: formModel.isMandatory,
      isController: formModel.isController,
      context: formModel.context,
      whenStartsAskFor: formModel.whenStartsAskFor,
      whenEndsAskFor: formModel.whenEndsAskFor,
      dueOnTerm: formModel.dueOnTerm,
      dueOnTermUnit: formModel.dueOnTermUnit,
      dueOnCondition: formModel.dueOnCondition,
      dueOnController: formModel.dueOnController,
      preventionTerm: formModel.preventionTerm,
      preventionTermUnit: formModel.preventionTermUnit,
      preventionExtensionTerm: formModel.preventionExtensionTerm,
      preventionExtensionTermUnit: formModel.preventionExtensionTermUnit,
      preventionAttentionTerm: formModel.preventionAttentionTerm,
      preventionAttentionTermUnit: formModel.preventionAttentionTermUnit,
      preventionAttentionExtensionTerm: formModel.preventionAttentionExtensionTerm,
      preventionAttentionExtensionTermUnit: formModel.preventionAttentionExtensionTermUnit,
      periodicityRuleEachValue: formModel.periodicityRuleEachValue,
      periodicityRuleEachUnit: formModel.periodicityRuleEachUnit,
      periodicityRuleDueOnType: formModel.periodicityRuleDueOnType,
      periodicityRuleDueOnMonth: formModel.periodicityRuleDueOnMonth,
      periodicityRuleDueOnDay: formModel.periodicityRuleDueOnDay,
      periodicityRuleNotes: formModel.periodicityRuleNotes,
    };

    return data;
  }

}
