
/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Assertion, isEmpty } from '@app/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { MainUIStateAction, MainUIStateSelector } from '@app/presentation/exported.presentation.types';

import { DefaultViewAction } from '@app/main-layout';

import { ObligationsDataService } from '@app/data-services';

import { MessageBoxService } from '@app/shared/containers/message-box';

import { EmptyObligation, EmptyObligationCommand, Obligation, ObligationCommand,
         ObligationDescriptor } from '@app/models';

import { ObligationsExplorerEventType } from '@app/views/obligations/obligations-explorer/obligations-explorer.component';

import { ObligationTabbedViewEventType } from '@app/views/obligations/obligation-tabbed-view/obligation-tabbed-view.component';


@Component({
  selector: 'emp-com-obligations-main-page',
  templateUrl: './obligations-main-page.component.html'
})
export class ObligationsMainPageComponent implements OnInit, OnDestroy {

  isLoading = false;

  isLoadingObligation = false;

  commandExecuted = false;

  obligationsCommand: ObligationCommand = Object.assign({}, EmptyObligationCommand);

  obligationsList: ObligationDescriptor[] = [];

  obligationSelected: Obligation = EmptyObligation;

  displayObligationCreator = false;

  displayObligationTabbedView = false;

  helper: SubscriptionHelper;


  constructor(private uiLayer: PresentationLayer,
              private obligationsData: ObligationsDataService,
              private messageBox: MessageBoxService) {
    this.helper = uiLayer.createSubscriptionHelper();
  }


  ngOnInit(): void {
    this.suscribeToAction();
    this.searchObligations(this.obligationsCommand);
  }


  ngOnDestroy() {
    this.helper.destroy();
  }


  onObligationsExplorerEvent(event) {
    switch (event.type as ObligationsExplorerEventType) {

      case ObligationsExplorerEventType.SEARCH_OBLIGATIONS:
        Assertion.assertValue(event.payload.command, 'event.payload.command');
        this.obligationsCommand = Object.assign({}, event.payload.command);
        this.searchObligations(event.payload.command as ObligationCommand);
        return;

      case ObligationsExplorerEventType.EXPORT_OBLIGATIONS:
        this.exportObligations();
        return;

      case ObligationsExplorerEventType.SELECT_OBLIGATION:
        Assertion.assertValue(event.payload.obligation, 'event.payload.obligation');
        Assertion.assertValue(event.payload.obligation.uid, 'event.payload.obligation.uid');
        this.getObligation(event.payload.obligation.uid);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onObligationTabbedViewEvent(event) {
    switch (event.type as ObligationTabbedViewEventType) {

      case ObligationTabbedViewEventType.CLOSE_BUTTON_CLICKED:
        this.setObligationSelected(EmptyObligation);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private suscribeToAction() {
    this.helper.select<any>(MainUIStateSelector.VIEW_ACTION)
      .subscribe(x => {
        if (x === 'ActionCreate') {
          this.openObligationCreator();
        }

        if (x !== 'None') {
          // TODO: consult and implement in the presentation layer a utility that allows us to
          // emit a value without saving it in the state
          setTimeout(() => this.uiLayer.dispatch(MainUIStateAction.SET_VIEW_ACTION, DefaultViewAction));
        }
      });
  }


  private openObligationCreator() {
    this.displayObligationCreator = true;
    this.messageBox.showInDevelopment('Agregar obligación');
  }


  private searchObligations(command: ObligationCommand) {
    this.resetObligationsList();
    this.setLoading(true);

    this.obligationsData.searchObligations(command)
      .toPromise()
      .then(x => this.obligationsList = x )
      .finally(() => {
        this.setLoading(false);
      });
  }


  private exportObligations() {
    this.messageBox.showInDevelopment('Exportar obligaciones', this.obligationsCommand);
  }


  private getObligation(obligationUID: string) {
    this.isLoadingObligation = true;

    this.obligationsData.getObligation(obligationUID)
      .toPromise()
      .then(x => this.setObligationSelected(x))
      .finally(() => this.isLoadingObligation = false);
  }


  private setLoading(loading: boolean) {
    this.isLoading = loading;
    this.commandExecuted = !loading;
  }


  private resetObligationsList() {
    this.obligationsList = [];
    this.setObligationSelected(EmptyObligation);
  }


  private setObligationSelected(obligation: Obligation) {
    this.obligationSelected = obligation;
    this.displayObligationTabbedView = !isEmpty(this.obligationSelected);
  }

}
