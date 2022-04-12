/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Empty, Identifiable } from "@app/core";


export interface ObligationCommand {
  keywords: string;
  topics: string[];
  regulators: string[];
}


export interface ObligationDescriptor {
  uid: string;
  name: string;
  topics: string;
  regulator: string;
  procedureCode: string;
}


export interface Obligation {
  uid: string;
  name: string;
  description: string;
  topics: string;
  tags: string;
  legalBasis: string;
  regulator: Identifiable;
  procedure: Procedure;
}


export interface Procedure {
  uid: string;
  code: string;
  name: string;
  topics: string;
  regulator: string;
}


export const EmptyProcedure: Procedure = {
  uid: '',
  code: '',
  name: '',
  topics: '',
  regulator: '',
}


export const EmptyObligation: Obligation = {
  uid: '',
  name: '',
  description: '',
  topics: '',
  tags: '',
  legalBasis: '',
  regulator: Empty,
  procedure: EmptyProcedure,
}


export const EmptyObligationCommand: ObligationCommand = {
  keywords: '',
  topics: [],
  regulators: [],
}
