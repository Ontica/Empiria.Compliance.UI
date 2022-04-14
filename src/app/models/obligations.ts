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
  rules: ObligationRule[];
}


export interface Procedure {
  uid: string;
  code: string;
  name: string;
  topics: string;
  regulator: string;
}


export interface ObligationRule {
  uid: string;
  isDefault: boolean;
  executionMode: string;
  isMandatory: boolean;
  isController: boolean;
  duration: number;
  durationUnit: string;
  context: string[];
  dueOn: {
    term: number;
    termUnit: string;
    condition: string;
    controllerUID: string;
    controllerName: string;
  },
  prevention: {
    term: number;
    termUnit: string;
    extensionTerm: number;
    extensionTermUnit: string;
  },
  requirementsAttention: {
    term: number;
    termUnit: string;
    extensionTerm: number;
    extensionTermUnit: string;
  },
  periodicityRule: {
    notes: string;
    each: {
      value: number;
      unit: string;
    },
    dueOn: {
      type: string;
      month: number;
      day: number;
    },
  }
}


export const EmptyProcedure: Procedure = {
  uid: '',
  code: '',
  name: '',
  topics: '',
  regulator: '',
}


export const EmptyObligationRule: ObligationRule = {
  uid: '',
  isDefault: false,
  executionMode: '',
  isMandatory: false,
  isController: false,
  duration: 0,
  durationUnit: '',
  context: [],
  dueOn: {
    term:  0,
    termUnit:  '',
    condition:  '',
    controllerUID:  '',
    controllerName:  '',
  },
  prevention: {
    term: 0,
    termUnit:  '',
    extensionTerm: 0,
    extensionTermUnit:  '',
  },
  requirementsAttention: {
    term: 0,
    termUnit:  '',
    extensionTerm: 0,
    extensionTermUnit:  '',
  },
  periodicityRule: {
    each: {
      value: 0,
      unit:  '',
    },
   dueOn: {
      type:  '',
      month: 0,
      day: 0,
    },
    notes: '',
  }
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
  rules: [],
}


export const EmptyObligationCommand: ObligationCommand = {
  keywords: '',
  topics: [],
  regulators: [],
}
