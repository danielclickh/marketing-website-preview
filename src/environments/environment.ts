// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {WebsiteEnvironment} from './environment-type';

export const environment: WebsiteEnvironment = {
  siteUrl: 'http://localhost:4200',
  production: false,
  ssrApiStrapiBaseUrl: 'http://localhost:1337', // This is used for the prerenderer
  strapiBaseUrl: 'http://localhost:1337',
  workatoApiBaseUrl: 'https://apim.workato.com/clickhouse/marketing-api-v0-1/form',
  workatoToken: 'b5825bafb02a8e854ac7252952d2394f73aa39dc39cc5228d63490ced2926b5a',
  segmentKey: 'N60KaTd2DBTDYKUfGThvzkrcPZFj9hEu',
  googleTagManagerId: 'GTM-P52RCTZ'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
