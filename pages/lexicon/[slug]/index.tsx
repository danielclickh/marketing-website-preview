import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import Layout from '../../../components/Layout'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import { SeoPage, SeoPageProps } from '../../../components/SeoPage'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { getLexicon, getLexicons } from '../../../lib/lexicons'
import { Lexicon } from '../../../lib/lexicons/types'
import { CommonProps, NewsLetterData } from '../../../types/homepage'

interface LexiconPageProps extends CommonProps {
  lexicon: Lexicon,
  moreLikeThis: SeoPageProps['moreLikeThis'],
  newsLetterData: NewsLetterData
}

interface LexiconPageParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getLexicons().map(lexicon => {
      return {
        params: { slug: lexicon.slug }
      }
    }),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as LexiconPageParams
  const newsLetterData = await getNewsLetterData()

  const lexicon = getLexicon(slug);

  if (lexicon) {

    const moreLikeThis = getLexicons()
      .filter(item => item.slug !== lexicon.slug)
      .map(item => {
        return {
          link: `/lexicon/${item.slug}`,
          title: item.title
        }
      })
      .slice(0, 3); // Limit number of items to 3

    const props: LexiconPageProps = {
      lexicon,
      moreLikeThis,
      seo: {
        title: `${lexicon.title} | ClickHouse Videos`,
        description: lexicon.excerpt,
        path: `/lexicon/${lexicon.slug}`
      },
      newsLetterData,
      ...(await getCommonProps())
    };

    return {
      props,
      revalidate: REVALIDATE_SECONDS
    }
  }

  return {
    notFound: true,
    revalidate: REVALIDATE_SECONDS
  }
}

export default function Page({
  lexicon,
  moreLikeThis,
  seo,
  headerData,
  footerData,
  newsLetterData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <SeoPage
        title={lexicon.title}
        moreLikeThis={moreLikeThis}
        newsLetterData={newsLetterData}>
        {lexicon.body}
      </SeoPage>
    </Layout>
  )
}
