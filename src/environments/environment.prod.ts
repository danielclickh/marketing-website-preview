export const environment = {
  production: true,
  ssrApiStrapiBaseUrl: 'http://localhost:1337', // This is used for the prerenderer
  strapiBaseUrl: '', // Keeping it empty because CloudFront redirects from /uploads to the CMS
  workatoApiBaseUrl: 'https://apim.workato.com/clickhouse/marketing-api-v0-1/form',
  workatoToken: 'b5825bafb02a8e854ac7252952d2394f73aa39dc39cc5228d63490ced2926b5a',
  segmentKey: 'dZuEnmCPmWqDuSEzCvLUSBBRt8Xrh2el'
};
