/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AbstractPresentationHandler, StateValues } from '@app/core/presentation/presentation.handler';

import { ObligationsDataService } from '@app/data-services';


export enum SelectorType {
  REGULATORS_LIST = 'Com.Obligations.Selector.Regulators.List',
  TOPICS_LIST     = 'Com.Obligations.Selector.Topics.List',
}


const initialState: StateValues = [
  { key: SelectorType.REGULATORS_LIST, value: [] },
  { key: SelectorType.TOPICS_LIST, value: [] },
];


@Injectable()
export class ObligationsPresentationHandler extends AbstractPresentationHandler {

  constructor(private data: ObligationsDataService) {
    super({
      initialState,
      selectors: SelectorType,
    });
  }


  select<U>(selectorType: SelectorType, params?: any): Observable<U> {

    let provider: () => any;

    switch (selectorType) {

      case SelectorType.REGULATORS_LIST:
        provider = () => this.data.getRegulators();

        return super.selectFirst<U>(selectorType, provider);

      case SelectorType.TOPICS_LIST:
        provider = () => this.data.getTopics();

        return super.selectFirst<U>(selectorType, provider);

      default:
        return super.select<U>(selectorType, params);

    }
  }

}
