/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Assertion, HttpService, Identifiable } from '@app/core';

import { Obligation, ObligationCommand, ObligationDescriptor } from '@app/models';


@Injectable()
export class ObligationsDataService {

  constructor(private http: HttpService) { }

  getRegulators(): Observable<Identifiable[]> {
    const path = 'v3/compliance/regulators';

    return this.http.get<Identifiable[]>(path);
  }


  getTopics(): Observable<string[]> {
    const path = 'v3/compliance/topics';

    return this.http.get<string[]>(path);
  }


  searchObligations(obligationCommand: ObligationCommand): Observable<ObligationDescriptor[]> {
    Assertion.assertValue(obligationCommand, 'obligationCommand');

    const path = 'v3/compliance/obligations';

    return this.http.post<ObligationDescriptor[]>(path, obligationCommand);
  }


  getObligation(obligationUID: string): Observable<Obligation> {
    Assertion.assertValue(obligationUID, 'obligationUID');

    const path = `v3/compliance/obligations/${obligationUID}`;

    return this.http.get<Obligation>(path);
  }

}
