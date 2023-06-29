export default function CanonicalUrl({ path }: { path: string }) {
  const siteUrl = 'https://clickhouse.com'

  const canonicalUrl = `${siteUrl}` + (path === '/' ? '' : path)

  return <link rel='canonical' href={canonicalUrl} />
}
