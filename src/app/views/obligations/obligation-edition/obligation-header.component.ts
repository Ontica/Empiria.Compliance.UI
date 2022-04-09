/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest } from 'rxjs';

import { Assertion, EventInfo, Identifiable, isEmpty } from '@app/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { ObligationsStateSelector } from '@app/presentation/exported.presentation.types';

import { FormHandler, sendEvent } from '@app/shared/utils';

import { MessageBoxService } from '@app/shared/containers/message-box';

import { EmptyObligation, Obligation } from '@app/models';

export enum ObligationHeaderEventType {
  CREATE_OBLIGATION_CLICKED = 'ObligationHeaderComponent.Event.CreateObligationClicked',
  UPDATE_OBLIGATION_CLICKED = 'ObligationHeaderComponent.Event.UpdateObligationClicked',
  DELETE_OBLIGATION_CLICKED = 'ObligationHeaderComponent.Event.DeleteObligationClicked',
}

enum ObligationHeaderFormControls {
  name = 'name',
  description = 'description',
  regulators = 'regulators',
  topics = 'topics',
  associatedProcedure = 'associatedProcedure',
  legalBasis = 'legalBasis',
}

@Component({
  selector: 'emp-com-obligation-header',
  templateUrl: './obligation-header.component.html',
})
export class ObligationHeaderComponent implements OnChanges, OnInit, OnDestroy {

  @Input() obligation: Obligation = EmptyObligation;

  @Output() obligationHeaderEvent = new EventEmitter<EventInfo>();

  formHandler: FormHandler;

  controls = ObligationHeaderFormControls;

  editionMode = false;

  isLoading = false;

  regulatorsList: Identifiable[] = [];

  topicsList: string[] = [];

  associatedProcedures: any [] = [];

  helper: SubscriptionHelper;


  constructor(private uiLayer: PresentationLayer,
              private messageBox: MessageBoxService) {
    this.helper = uiLayer.createSubscriptionHelper();
    this.initForm();
    this.enableEditor(true);
  }


  ngOnChanges() {
    this.enableEditor(false);
    console.log(this.formHandler.form.value);
  }


  ngOnInit() {
    this.loadDataLists();
  }


  ngOnDestroy() {
    this.helper.destroy();
  }


  get isSaved(): boolean {
    return !isEmpty(this.obligation);
  }


  enableEditor(enable) {
    this.editionMode = enable;

    if (!this.editionMode) {
      this.setFormData();
    }

    this.formHandler.disableForm(!this.editionMode);
  }


  onSubmitForm() {
    if (!this.formHandler.validateReadyForSubmit()) {
      this.formHandler.invalidateForm();
      return;
    }

    let eventType = ObligationHeaderEventType.CREATE_OBLIGATION_CLICKED;

    if (this.isSaved) {
      eventType = ObligationHeaderEventType.UPDATE_OBLIGATION_CLICKED;
    }

    sendEvent(this.obligationHeaderEvent, eventType, {obligation: this.getFormData()});
  }


  onDeleteButtonClicked() {
    this.showConfirmMessage();
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


  private initForm() {
    if (this.formHandler) {
      return;
    }

    this.formHandler = new FormHandler(
      new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        regulators: new FormControl('', Validators.required),
        topics: new FormControl('', Validators.required),
        legalBasis: new FormControl('', Validators.required),
        associatedProcedure: new FormControl(''), //, Validators.required
      })
    );
  }


  private setFormData() {
    this.formHandler.form.reset({
      name: this.obligation.name,
      description: this.obligation.description,
      regulators: isEmpty(this.obligation.regulator) ? [] : [this.obligation.regulator.uid],
      topics: this.obligation.topics ? [this.obligation.topics] : [],
      legalBasis: this.obligation.legalBasis || '',
      associatedProcedure: '' ,// this.obligation.associatedProcedure || '',
    });
  }


  private getFormData(): any {
    Assertion.assert(this.formHandler.form.valid,
      'Programming error: form must be validated before command execution.');

    const formModel = this.formHandler.form.getRawValue();

    const data: any = {
      name: formModel.name ?? '',
      description: formModel.description ?? '',
      regulators: formModel.regulators ?? '',
      topics: formModel.topics ?? '',
      legalBasis: formModel.legalBasis ?? '',
      associatedProcedure: formModel.associatedProcedure ?? '',
    };

    return data;
  }


  private showConfirmMessage() {
    const title   = 'Eliminar obligación';
    const message = `Esta operación eliminara la obligación
                    <strong> ${this.obligation.name}</strong>.
                    <br><br>¿Elimino la obligación?`;
    this.messageBox.confirm(message, title, 'DeleteCancel', 'Eliminar')
      .toPromise()
      .then(x => {
        if (x) {
          sendEvent(this.obligationHeaderEvent, ObligationHeaderEventType.DELETE_OBLIGATION_CLICKED,
            {obligation: this.obligation});
        }
      });
  }

}
