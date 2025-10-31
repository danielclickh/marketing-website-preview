import { all } from '@/lib/indexing'
import { defaultLanguage, getPathLang } from '@/lib/utils/internationalisation'

export async function GET() {
  const siteURL = 'https://clickhouse.com'

  const indexedItems = await all()

  let text = `# ClickHouse

> ClickHouse is a fast open-source column-oriented database management system (DBMS) optimized for real-time analytical queries using SQL. It powers large-scale data analytics, supports ClickHouse Cloud as a managed service, and integrates with BI tools, data pipelines, and modern data stacks.

## Get started for free
To start using ClickHouse Cloud, sign up here: https://console.clickhouse.cloud/signUp

A free trial is available with $300 in credits over 30 days.

To install ClickHouse locally (MacOS, Linux, FreeBSD):
curl https://clickhouse.com/ | sh

## Pages

`

  indexedItems.forEach((item) => {
    if (getPathLang(item.path) === defaultLanguage) {
      if (item.title?.length) {
        text += `- [${item.title}](${siteURL}${item.path})\n`
      } else {
        text += `- ${siteURL}${item.path}\n`
      }
    }
  })

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
