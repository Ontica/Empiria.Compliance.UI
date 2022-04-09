/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


import { MainLayoutActions, MainLayoutSelectors } from './main-layout/_main-layout.presentation.types';
export * from './main-layout/_main-layout.presentation.types';

import { ComActions, ComCommands, ComEffects, ComSelectors } from './compliance/_compliance.presentation.types';
export * from './compliance/_compliance.presentation.types';


/* Exportation types */

export type ActionType = MainLayoutActions | ComActions;

export type CommandType = ComCommands;

export type StateEffect = ComEffects;

export type StateSelector = MainLayoutSelectors | ComSelectors;
