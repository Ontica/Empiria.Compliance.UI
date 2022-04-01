/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { AppConfig } from '../common-models/common';


export const APP_CONFIG: AppConfig = {
  data: {
    name: 'Regulatory Compliance',
    hint: 'Oil & Gas Regtech Solution',
    organization: 'Talanza Energy Consulting',
    description: 'Regulatory Compliance Solution for the Oil & Gas Industry',
  },
  layout: {
    enablePermissions: false,
    displayNavbarHeader: false,
    displayMenuUser: true,
    displayChangeLanguage: true,
    displayChangePassword: true,
    displayAsideLeft: false,
    displaySubMenu: false,
    displayHeader: true,
    displayFooter: true,
  }
};
