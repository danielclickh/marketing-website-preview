/** Angular 'environment' structure for the website. */
export interface WebsiteEnvironment {
  /** Web site URL. Example: https://clickhouse.com. */
  siteUrl: string;
  production: boolean;
  ssrApiStrapiBaseUrl: string;
  strapiBaseUrl: string;
  workatoApiBaseUrl: string;
  workatoToken: string;
  segmentKey: string;
  googleTagManagerId: string;
}
