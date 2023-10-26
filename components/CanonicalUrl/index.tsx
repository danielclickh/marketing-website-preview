export default function CanonicalUrl({ path }: { path: string }) {
  const siteUrl = 'https://clickhouse.com'
  // Check if the path is "forecasting-using-clickhouse"
  const canonicalUrl =
    path === '/blog/forecasting-using-clickhouse'
      ? 'https://ensembleanalytics.io/blog/forecasting-using-clickhouse'
      : `${siteUrl}${path}`

  return <link rel='canonical' href={canonicalUrl} />
}
