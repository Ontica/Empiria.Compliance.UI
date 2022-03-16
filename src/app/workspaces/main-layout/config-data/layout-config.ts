/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View, Layout } from '../common-models/common';

import {
  ProcessesViews,
  UnauthorizedViews
} from './views.config';


export const APP_VIEWS: View[] = ProcessesViews.concat(UnauthorizedViews);


export const APP_LAYOUTS: Layout[] = [
  {
    name: 'RegulatoryTrees',
    views: ProcessesViews,
    hint: 'Regulatory Trees',
    defaultTitle: 'Regulatory Trees'
  },
  {
    name: 'Unauthorized',
    views: UnauthorizedViews,
    hint: '',
    defaultTitle: ''
  },
];
