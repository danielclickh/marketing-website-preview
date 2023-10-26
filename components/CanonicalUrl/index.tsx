export default function CanonicalUrl({ path }: { path: string }) {
  const siteUrl = 'https://clickhouse.com'

  // Check if the path is "forecasting-using-clickhouse"
  const canonicalUrl =
    path === 'https://ensembleanalytics.io/blog/forecasting-using-clickhouse'
      ? path
      : `${siteUrl}${path}`

  return <link rel='canonical' href={canonicalUrl} />
}
