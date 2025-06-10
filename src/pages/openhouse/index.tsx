import imageGallery from './assets/gallery.png'
import imageIconBinary from './assets/icon-binary.svg'
import imageIconFaq from './assets/icon-faq.svg'
import imageIconMegaphone from './assets/icon-megaphone.svg'
import imageIconNetwork from './assets/icon-network.svg'
import imageOpenhouseLogo from './assets/logo.svg'
import navigationArrow from './assets/navigation-arrow.svg'
import playButton from './assets/play-button.svg'
import speakerAaronKatz from './assets/speaker-aaron-katz.png'
import speakerAkshayNanavati from './assets/speaker-akshay-nanavati.png'
import speakerAlanBraithwaite from './assets/speaker-alan-braithwaite.png'
import speakerAlexyMilovidov from './assets/speaker-alexey-milovidov.png'
import speakerAlonTal from './assets/speaker-alon-tal.png'
import speakerArunmozhiRa from './assets/speaker-arunmozhi-ra.png'
import speakerArupMalakar from './assets/speaker-arup-malakar.png'
import speakerChloeCarassoDitCarson from './assets/speaker-chloe-carasso-dit-carson.png'
import speakerChrisCrane from './assets/speaker-chris-crane.png'
import speakerDaleMcDiarmid from './assets/speaker-dale-mcdiarmid.png'
import speakerJeanaChoi from './assets/speaker-jeana-choi.png'
import speakerJohananOttensooser from './assets/speaker-johanan-ottensooser.png'
import speakerKaushikIska from './assets/speaker-kaushik-iska.png'
import speakerKrithikaBalagurunathan from './assets/speaker-krithika-balagurunathan.png'
import speakerLukasBiewald from './assets/speaker-lukas-biewald.png'
import speakerMartinCasado from './assets/speaker-martin-casado.png'
import speakerMaruthGoyal from './assets/speaker-maruth-goyal.png'
import speakerMelvynPeignon from './assets/speaker-melvyn-peignon.png'
import speakerMihirGokhale from './assets/speaker-mihir-gokhale.png'
import speakerMikeDriscoll from './assets/speaker-mike-driscoll.png'
import speakerMikeShi from './assets/speaker-mike-shi.png'
import speakerNikitaMikhailov from './assets/speaker-nikita-mikhailov.png'
import speakerPoomChiarawongse from './assets/speaker-poom-chiarawongse.png'
import speakerRiteshVaryani from './assets/speaker-ritesh-varyani.png'
import speakerRobertSchulze from './assets/speaker-robert-schulze.png'
import speakerRyadhDahimene from './assets/speaker-ryadh-dahimene.png'
import speakerSaiSrirampur from './assets/speaker-sai-srirampur.png'
import speakerSrinivasNarayanan from './assets/speaker-srinivas-narayanan.png'
import speakerTanyaBragin from './assets/speaker-tanya-bragin.png'
import speakerVinayakSaokar from './assets/speaker-vinayak-saokar.png'
import speakerVladSeliverstov from './assets/speaker-vlad-seliverstov.png'
import speakerYuryIzrailevsky from './assets/speaker-yury-izrailevsky.png'
import speakerZachNaimon from './assets/speaker-zach-naimon.png'
import speakerZoeSteinkamp from './assets/speaker-zoe-steinkamp.png'
import styles from './styles.module.scss'
import CategorySelector from '@/components/CategorySelector'
import FontSohne from '@/components/FontSohne'
import FontSohneBreit from '@/components/FontSohneBreit'
import Footer from '@/components/Footer'
import MarketingVideoThumbnail from '@/components/MarketingVideoThumbnail'
import Modal from '@/components/Modal'
import OpenHouseAccordionItem from '@/components/OpenHouseAccordionItem'
import OpenHouseButton from '@/components/OpenHouseButton'
import OpenHouseHeader from '@/components/OpenHouseHeader'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import SeoContainer from '@/components/SeoContainer'
import { fetchAll, getStagingOnlyFilters } from '@/lib/api/strapi'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { limitStringByWord, stripHtmlTags } from '@/lib/utils/strings'
import { BlogPost } from '@/types/blogs'
import { CommonProps } from '@/types/homepage'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isValidElement, Children } from 'react'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

interface OpenHousePageProps extends CommonProps {
  blogs: Array<
    Pick<
      BlogPost,
      | 'id'
      | 'category'
      | 'title'
      | 'slug'
      | 'date'
      | 'shortDescription'
      | 'content'
      | 'thumbnailPng'
      | 'publishedAt'
    >
  >
}

export const getStaticProps: GetStaticProps<OpenHousePageProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    const blogs: OpenHousePageProps['blogs'] = await fetchAll('blog-posts', {
      filters: {
        tags: {
          slug: {
            $eq: 'open-house'
          }
        },
        $or: getStagingOnlyFilters()
      },
      populate: ['thumbnailPng'],
      sort: ['date:DESC', 'publishedAt:DESC']
    })

    return {
      props: {
        seo: {
          title:
            'Open House User Conference - Free conference in San Francisco, CA.',
          path: '/openhouse',
          image: [{ url: '/images/social-open-house.png' }]
        },
        blogs,
        ...commonProps
      }
    }
  }

const INITIAL_NUMBER_OF_SPEAKERS = 8

const ALL_SPEAKERS: Array<{
  name: string
  title: string
  image: ImageProps['src']
}> = [
  {
    name: 'Aaron Katz',
    title: 'Founder, CEO, ClickHouse',
    image: speakerAaronKatz
  },
  {
    name: 'Tanya Bragin',
    title: 'VP Product & Marketing, ClickHouse',
    image: speakerTanyaBragin
  },
  {
    name: 'Alexey Milovidov',
    title: 'Founder, CTO, ClickHouse',
    image: speakerAlexyMilovidov
  },
  {
    name: 'Srinivas Narayanan',
    title: 'VP of Engineering, OpenAI',
    image: speakerSrinivasNarayanan
  },
  {
    name: 'Jeana Choi',
    title: 'Sr Software Engineer, Lyft',
    image: speakerJeanaChoi
  },
  {
    name: 'Maruth Goyal',
    title: 'Member of Technical Staff, Anthropic',
    image: speakerMaruthGoyal
  },
  {
    name: 'Krithika Balagurunathan',
    title: 'Sr Director, PM, ClickHouse',
    image: speakerKrithikaBalagurunathan
  },
  {
    name: 'Alon Tal',
    title: 'Senior Staff Software Engineer, Tesla',
    image: speakerAlonTal
  },
  {
    name: 'Yury Izrailevsky',
    title: 'Founder, President, ClickHouse',
    image: speakerYuryIzrailevsky
  },
  {
    name: 'Ritesh Varyani',
    title: 'Staff Software Engineer, Lyft',
    image: speakerRiteshVaryani
  },
  {
    name: 'Akshay Nanavati',
    title: 'Engineering Manager, OpenAI',
    image: speakerAkshayNanavati
  },
  {
    name: 'Poom Chiarawongse',
    title: 'Member of Technical Staff, OpenAI',
    image: speakerPoomChiarawongse
  },
  {
    name: 'Vinayak Saokar',
    title: 'VP of Engineering, Exabeam',
    image: speakerVinayakSaokar
  },
  {
    name: 'Arunmozhi RA',
    title: 'Senior Software Engineer, Exabeam',
    image: speakerArunmozhiRa
  },
  {
    name: 'Arup Malakar',
    title: 'Software Engineer, Sierra',
    image: speakerArupMalakar
  },
  {
    name: 'Martin Casado',
    title: 'Partner, Andreessen Horowitz',
    image: speakerMartinCasado
  },
  {
    name: 'Chris Crane',
    title: 'Co-Founder & CPO, FiveOneFour',
    image: speakerChrisCrane
  },
  {
    name: 'Johanan Ottensooser',
    title: 'AI Product Manager, FiveOneFour',
    image: speakerJohananOttensooser
  },
  {
    name: 'Lukas Biewald',
    title: 'Founder, CEO, Weights & Biases',
    image: speakerLukasBiewald
  },
  {
    name: 'Alan Braithwaite',
    title: 'Co-Founder & CTO, RunReveal',
    image: speakerAlanBraithwaite
  },
  {
    name: 'Mike Driscoll',
    title: 'Co-Founder, CEO, Rill Data',
    image: speakerMikeDriscoll
  },
  {
    name: 'Robert Schulze',
    title: 'Core Engineering Lead, ClickHouse',
    image: speakerRobertSchulze
  },
  {
    name: 'Melvyn Peignon',
    title: 'Principal PM, ClickHouse',
    image: speakerMelvynPeignon
  },
  {
    name: 'Zoe Steinkamp',
    title: 'Senior Developer Advocate, ClickHouse',
    image: speakerZoeSteinkamp
  },
  {
    name: 'Chloé Carasso dit Carson',
    title: 'Senior PM, ClickHouse',
    image: speakerChloeCarassoDitCarson
  },
  {
    name: 'Nikita Mikhailov',
    title: 'Director of Engineering, ClickHouse',
    image: speakerNikitaMikhailov
  },
  {
    name: 'Zach Naimon',
    title: 'Principal PM, ClickHouse',
    image: speakerZachNaimon
  },
  {
    name: 'Kaushik Iska',
    title: 'Engineering Manager, ClickHouse',
    image: speakerKaushikIska
  },
  {
    name: 'Mihir Gokhale',
    title: 'PM, ClickHouse',
    image: speakerMihirGokhale
  },
  {
    name: 'Mike Shi',
    title: 'Principal PM, ClickHouse',
    image: speakerMikeShi
  },
  {
    name: 'Vlad Seliverstov',
    title: 'Engineering Manager, ClickHouse',
    image: speakerVladSeliverstov
  },
  {
    name: 'Ryadh Dahimene',
    title: 'Director, PM, ClickHouse',
    image: speakerRyadhDahimene
  },
  {
    name: 'Sai Srirampur',
    title: 'Director, PM, ClickHouse',
    image: speakerSaiSrirampur
  },
  {
    name: 'Dale McDiarmid',
    title: 'Principal PME, ClickHouse',
    image: speakerDaleMcDiarmid
  }
]

type Video = {
  title: string
  youtubeId: string
  category: string
}

const VIDEOS: Array<Video> = [
  {
    title: 'ClickHouse Open House keynote 2025',
    youtubeId: 'N_THorP0HbM',
    category: 'Keynote'
  },
  {
    title: 'Weights & Biases + ClickHouse: Powering developer tools for AI',
    youtubeId: 'yJJF41oz9Wk',
    category: 'Keynote'
  },
  {
    title: 'Scaling Clickhouse to petabytes of logs at OpenAI',
    youtubeId: 'yIVz0NKwQvA',
    category: 'Keynote'
  },
  {
    title: 'Postgres and ClickHouse: the default data stack',
    youtubeId: 'pwOEYtNtk9k',
    category: 'Real-time analytics'
  },
  {
    title: 'ClickHouse core database innovations for real-time analytics',
    youtubeId: 'UN0RM56uiFI',
    category: 'Real-time analytics'
  },
  {
    title: 'Tesla-scale metrics with ClickHouse',
    youtubeId: 'z5t3b3EAc84',
    category: 'Real-time analytics'
  },
  {
    title: 'How Sierra.ai unifies observability & analytics with ClickHouse',
    youtubeId: 'Hr2t7SvzV6A',
    category: 'Real-time analytics'
  },
  {
    title: 'ClickHouse at Exabeam: Scalable search for security analytics',
    youtubeId: 'T87D6FTDGX0',
    category: 'Real-time analytics'
  },
  {
    title: 'ClickHouse observability: Introducing ClickStack',
    youtubeId: 'qb87h5ScI5k',
    category: 'Observability'
  },
  {
    title: 'LogHouse: How ClickHouse built our internal logging platform',
    youtubeId: 'PagFmmCziYE',
    category: 'Observability'
  },
  {
    title: 'How ClickHouse helps Anthropic scale observability',
    youtubeId: 'SrLKbzdFEWA',
    category: 'Observability'
  },
  {
    title: 'ClickHouse and JOINs',
    youtubeId: 'gd3OyQzB_Fc',
    category: 'Data warehousing'
  },
  {
    title: 'Lakehouse with ClickHouse',
    youtubeId: 'V6C6zyR4rq0',
    category: 'Data warehousing'
  },
  {
    title:
      'Batch and real-time analytics at Lyft: Powering decisions with ClickHouse',
    youtubeId: 'DWkuhCBA7B4',
    category: 'Data warehousing'
  },
  {
    title: 'ClickHouse internal data warehouse',
    youtubeId: '950P-QEd-rc',
    category: 'Data warehousing'
  },
  {
    title: 'ClickHouse for AI/ML: An overview',
    youtubeId: 'GfvZHSdJ4CU',
    category: 'AI/ML'
  },
  {
    title: 'MCP for real-time anaytics panel discussion',
    youtubeId: '-K64C-iKHwM',
    category: 'AI/ML'
  },
  {
    title: 'Data infrastructure for AI at scale',
    youtubeId: 'QCrZNqJ9AHU',
    category: 'Fireside chat'
  }
]

const AGENDA: Array<{
  time: string
  title: string
  description?: string | React.ReactNode
  videoCategory?: string
}> = [
  { time: '8:00 a.m.', title: 'Registration and light refreshments' },
  {
    time: '9:00 a.m.',
    title: 'Keynote: Product vision and roadmap',
    videoCategory: 'Keynote',
    description: (
      <>
        <ul className='list-disc space-y-2 pl-4'>
          <li>
            <strong>
              <u>Alexey Milovidov</u>
            </strong>
            , ClickHouse CTO and the creator of the ClickHouse open source
            project, will share the origin story of ClickHouse.
          </li>
          <li>
            <strong>
              <u>Aaron Katz</u>
            </strong>
            , ClickHouse CEO, will talk about the founding of ClickHouse, Inc.
            and the trajectory of the company.
          </li>
          <li>
            <strong>
              <u>Yury Izrailevsky</u>
            </strong>
            , ClickHouse President of Engineering, and{' '}
            <strong>
              <u>Krithika Balagurunathan</u>
            </strong>
            , Head of Product for ClickHouse Cloud, will dive into the details
            of ClickHouse Cloud.
          </li>
          <li>
            <strong>
              <u>Tanya Bragin</u>
            </strong>
            , VP Product & Marketing at ClickHouse, will cover the latest
            product announcements and product roadmap.
          </li>
          <li>
            Thought-leading customers, including{' '}
            <strong>
              <u>Lukas Biewald</u>
            </strong>
            , Founder & CEO Weights & Biases; and{' '}
            <strong>
              <u>Akshay Nanavati</u>
            </strong>{' '}
            and{' '}
            <strong>
              <u>Poom Chiarawongse</u>{' '}
            </strong>
            from OpenAI, will walk through their use cases and how ClickHouse
            helped them in their journey.
          </li>
        </ul>
      </>
    )
  },
  { time: '10:30 a.m.', title: 'Break: AMA booth and demo stations' },
  {
    time: '11:00 a.m.',
    title: 'Real-time analytics: technical deep dives and user stories',
    videoCategory: 'Real-time analytics',
    description: (
      <>
        <ul className='list-disc space-y-2 pl-4'>
          <li>
            <strong>
              <u>Zach Naimon</u>
            </strong>
            , Principal Product Manager at ClickHouse, will lead you through
            ClickHouse for real-time analytics.
          </li>
          <li>
            <strong>
              <u>Sai Srirampur</u>
            </strong>{' '}
            and{' '}
            <strong>
              <u>Kaushik Iska</u>
            </strong>
            , founders of PeerDB, will cover the evolving better together story
            for Postgres users and the future of change data capture (CDC) at
            ClickHouse.
          </li>
          <li>
            <strong>
              <u>Nikita Mikhailov</u>
            </strong>
            , Director Engineering at ClickHouse and one of the original
            ClickHouse developers, will talk about the latest core database
            innovations for real-time analytics.
          </li>
          <li>
            <strong>
              <u>Arup Malakar</u>
            </strong>
            , Software Engineer at Sierra will share how{' '}
            <Link
              href='https://sierra.ai/'
              target='_blank'
              className='underline'>
              Sierra.ai
            </Link>{' '}
            powers their customer service AI agents with ClickHouse.
          </li>
          <li>
            <strong>
              <u>Vinayak Saokar</u>
            </strong>
            , VP Engineering, and{' '}
            <strong>
              <u>Arunmozhi RA</u>
            </strong>
            , Sr Software Engineer at Exabeam will present how they scale
            ClickHouse for their security operations platform.
          </li>
        </ul>
      </>
    )
  },
  { time: '12:00 a.m.', title: 'Lunch' },
  {
    time: '1:00 p.m.',
    title: 'Observability: technical deep dives and user stories',
    videoCategory: 'Observability',
    description: (
      <>
        <ul className='list-disc space-y-2 pl-4'>
          <li>
            <strong>
              <u>Mike Shi</u>
            </strong>
            , founder of HyperDX, and{' '}
            <strong>
              <u>Dale McDiarmid</u>
            </strong>
            , Principal PME at ClickHouse, will share a perspective on how the
            observability market is evolving and how the stack based on
            OpenTelemetry + ClickHouse + HyperDX enables turnkey open source
            observability for all.
          </li>
          <li>
            <strong>
              <u>Vlad Seliverstov</u>
            </strong>
            , Engineering Manager at ClickHouse, will share the story of the
            ClickHouse observability team moving off Datadog to ClickHouse +
            Grafana + HyperDX.
          </li>
          <li>
            <strong>
              <u>Maruth Goyal</u>
            </strong>
            , Member of Technical Staff at Anthropic will share how ClickHouse
            is used to improve observability.
          </li>
        </ul>
      </>
    )
  },
  {
    time: '2:00 p.m.',
    title: 'Data warehousing: technical deep dives and user stories',
    videoCategory: 'Data warehousing',
    description: (
      <>
        <ul className='list-disc space-y-2 pl-4'>
          <li>
            <strong>
              <u>Chlo&eacute; Carasso dit Carson</u>
            </strong>
            , Senior Product Manager at ClickHouse, will cover how the data
            warehousing landscape has been transformed by open standards and
            open source alternatives to traditional data warehouses.
          </li>
          <li>
            <strong>
              <u>Robert Schulze</u>
            </strong>
            , Engineering Manager at ClickHouse, will share the latest core
            database product innovations for the data warehousing use case.
          </li>
          <li>
            <strong>
              <u>Melvyn Peignon</u>
            </strong>
            , Principal Product Manager at ClickHouse, will cover how ClickHouse
            is evolving to be the query engine of choice on top of data lakes.
          </li>
          <li>
            <strong>
              <u>Jeana Choi</u>
            </strong>{' '}
            and{' '}
            <strong>
              <u>Ritesh Varyani</u>
            </strong>
            , Software Engineers at Lyft, will share why they adopted ClickHouse
            for business analytics.
          </li>
          <li>
            <strong>
              <u>Mihir Gorkale</u>
            </strong>
            , Product Manager at ClickHouse, will share how ClickHouse is
            running our internal data warehouse on ClickHouse and tools we use
            for dashboarding and Agentic BI.
          </li>
        </ul>
      </>
    )
  },
  { time: '3:00 p.m.', title: 'Break: AMA booth and demo stations' },
  {
    time: '3:30 p.m.',
    title: 'AI/ML: technical deep dives and user stories',
    videoCategory: 'AI/ML',
    description: (
      <>
        <ul className='list-disc space-y-2 pl-4'>
          <li>
            <strong>
              <u>Alexey Milovidov</u>
            </strong>
            , ClickHouse CTO and{' '}
            <strong>
              <u>Ryadh Dahimene</u>
            </strong>
            , Director PM at ClickHouse, will share a perspective on evolution
            of AI/ML use cases and how ClickHouse fits into the data landscape
            as the market evolves.
          </li>
          <li>
            <strong>
              <u>Ryadh Dahimene</u>
            </strong>
            , Director PM at ClickHouse will lead a discussion on MCP servers +
            AI Agents with{' '}
            <strong>
              <u>Alan Braithwaite</u>
            </strong>
            , Co-Founder of RunReveal,{' '}
            <strong>
              <u>Chris Crane</u>
            </strong>
            , Co-Founder of FiveOneFour,{' '}
            <strong>
              <u>Johanan Ottensooser</u>
            </strong>
            , AI Product Lead at FiveOneFour,{' '}
            <strong>
              <u>Mike Driscoll</u>
            </strong>
            , Co-Founder, CEO, Rill Data, and{' '}
            <strong>
              <u>Mihir Gorkale</u>
            </strong>
            , Product Manager at ClickHouse.
          </li>
        </ul>
      </>
    )
  },
  {
    time: '4:30 p.m.',
    title: 'Fireside chat',
    videoCategory: 'Fireside chat',
    description: (
      <p>
        As AI and ML workloads explode, data requirements are evolving quickly.
        Hear from{' '}
        <strong>
          <u>Srinivas Narayanan</u>
        </strong>
        , VP of Engineering at OpenAI,{' '}
        <strong>
          <u>Martin Casado</u>
        </strong>
        , Partner at Andreessen Horowitz, and{' '}
        <strong>
          <u>Aaron Katz</u>
        </strong>
        , CEO at ClickHouse, on the future of data infrastructure for AI at
        scale.
      </p>
    )
  },
  { time: '5:15 p.m.', title: 'Networking and rooftop reception' }
]

export default function Page({ seo, footerData, blogs }: OpenHousePageProps) {
  const speakersToggleRef = useRef<HTMLDivElement | null>(null)
  const [displayAllSpeakers, setDisplayAllSpeakers] = useState(false)

  const initialSpeakers = ALL_SPEAKERS.slice(0, INITIAL_NUMBER_OF_SPEAKERS)
  const overflowSpeakers = ALL_SPEAKERS.slice(INITIAL_NUMBER_OF_SPEAKERS)

  const scrollToSpeakersToggle = useCallback(() => {
    const speakersToggle = speakersToggleRef.current
    if (speakersToggle) {
      const timer = window.setTimeout(() => {
        const boundingRect = speakersToggle.getBoundingClientRect()
        const isInView =
          boundingRect.top >= 0 &&
          boundingRect.left >= 0 &&
          boundingRect.bottom <= window.innerHeight &&
          boundingRect.right <= window.innerWidth

        // Only scroll into view if it's not already in view
        if (!isInView) {
          speakersToggle.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      }, 100)

      return () => window.clearTimeout(timer)
    }
  }, [speakersToggleRef])

  const hasBlogs = blogs.length > 0

  const blogsRef = useRef<HTMLDivElement | null>(null)
  const scrollToBlogs = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const blogsEl = blogsRef.current
      if (!blogsEl) return
      event.preventDefault()
      blogsEl.scrollIntoView({
        behavior: 'smooth'
      })
    },
    [blogsRef]
  )

  const [videoFilter, setVideoFilter] = useState<null | string>(null)
  const [activeVideo, setActiveVideo] = useState<null | Video>(null)
  const videosRef = useRef<HTMLDivElement | null>(null)
  const scrollToVideos = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, category?: string | null) => {
      const videosEl = videosRef.current
      if (!videosEl) return
      if (category !== undefined) setVideoFilter(category)
      event.preventDefault()
      videosEl.scrollIntoView({
        behavior: 'smooth'
      })
    },
    [videosRef, setVideoFilter]
  )

  const videoCategoryList = useMemo(() => {
    const unique = [...new Set(VIDEOS.map((video) => video.category))]

    const list = unique.map((category) => ({
      text: category,
      onClick: () => {
        setVideoFilter(category)
      },
      selected: videoFilter === category
    }))

    list.unshift({
      text: 'View all',
      onClick: () => {
        setVideoFilter(null)
      },
      selected: !videoFilter
    })

    return list
  }, [VIDEOS, videoFilter, setVideoFilter])

  const filteredVideos = useMemo(() => {
    return videoFilter
      ? VIDEOS.filter((video) => video.category === videoFilter)
      : VIDEOS
  }, [VIDEOS, videoFilter])

  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <FontSohne>
        <div className='readable-content'>
          {/* Header */}
          <OpenHouseHeader>
            <OpenHouseButton
              href='/company/contact'
              variant='primary'
              size='sm'>
              Get in touch
            </OpenHouseButton>
          </OpenHouseHeader>

          {/* Hero */}
          <section className='relative overflow-hidden bg-black'>
            <div className='relative mx-auto max-w-6xl px-6 pt-16 lg:px-12'>
              <div
                className={`absolute bottom-0 left-1/2 top-0 -translate-x-1/2 gradient-mask-to-b-[rgba(0,0,0,1)_0%,rgba(0,0,0,0.2)_70%] md:gradient-mask-to-r-[rgba(0,0,0,1)_0%,rgba(0,0,0,0.2)_70%] ${styles.gridBackground} w-dvw opacity-50 bg-blend-luminosity mix-blend-luminosity`}
              />

              <div className='relative z-10 flex flex-col gap-16 py-24 md:min-h-[680px] md:flex-row md:justify-between md:py-0'>
                <div className='flex-shrink-1 relative flex flex-grow-0 items-center px-8 md:w-max md:self-stretch md:px-0'>
                  <div className='absolute -bottom-20 -top-20 left-1/2 -z-10 aspect-square -translate-x-1/2 scale-150 rounded-full bg-ch-teal/60 mix-blend-multiply blur-[100px] md:scale-100' />
                  <Image
                    src={imageOpenhouseLogo}
                    alt='Open House By ClickHouse'
                    width={590}
                    height={289}
                    loading='eager'
                    priority
                  />
                </div>
                <div className='flex-shrink-0 flex-grow-0 text-center md:self-center md:text-left'>
                  <h2 className='text-2xl font-bold leading-loose'>
                    May 28-29, 2025
                  </h2>
                  <p className='mb-4 text-xl leading-loose'>
                    Free conference in San Francisco, CA
                  </p>
                  {hasBlogs && (
                    <OpenHouseButton
                      href='#whats-new'
                      variant='primary'
                      size='lg'
                      className='min-w-48'
                      onClick={scrollToBlogs}>
                      See what's new
                    </OpenHouseButton>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <div className='relative hidden justify-center bg-white px-2 md:flex md:py-10 xl:py-24'>
            <Image
              src={imageGallery}
              width={3602 / 2}
              height={960 / 2}
              alt='Gallery Desktop'
              className=''
            />
          </div>

          {/* Blogs */}
          {hasBlogs && (
            <>
              <section
                ref={blogsRef}
                id='whats-new'
                className='overflow-hidden bg-[#EFEFEF] py-10 text-black md:py-20 xl:py-24'>
                <div className='section-container'>
                  <h2 className='mb-10 text-center text-4xl md:mb-14 lg:mb-20'>
                    Whats been announced
                  </h2>
                  <ContentCarousel>
                    {blogs.map((blog, blogIndex) => {
                      return (
                        <div
                          key={blogIndex}
                          className='group/blogItem relative flex h-full flex-col bg-white text-black'>
                          <Image
                            src={blog.thumbnailPng.url}
                            alt={blog.title}
                            width={310}
                            height={160}
                            loading='lazy'
                            className='aspect-[31/16] h-auto w-full flex-shrink-0 flex-grow-0 object-cover'
                          />
                          <div className='flex flex-1 flex-col p-4 lg:p-6'>
                            <p className='mb-3 flex justify-start gap-2 text-sm opacity-60'>
                              {blog.category} <span>·</span>
                              {convertDateToString(
                                blog.date || blog.publishedAt
                              )}
                            </p>
                            <h3 className='mb-3 text-xl'>
                              <Link href={`/blog/${blog.slug}`}>
                                <span className='absolute inset-0' />
                                {blog.title}
                              </Link>
                            </h3>
                            <p className='mb-3 hidden lg:block'>
                              {limitStringByWord(
                                stripHtmlTags(
                                  blog.shortDescription || blog.content
                                ),
                                140,
                                '...'
                              )}
                            </p>
                            <strong className='mt-auto group-hover/blogItem:underline'>
                              Read more
                            </strong>
                          </div>
                        </div>
                      )
                    })}
                  </ContentCarousel>
                </div>
              </section>

              {/* Videos */}
              <section className='relative bg-neutral-900 py-10 text-white md:py-20 xl:py-24'>
                <div
                  className={`absolute -top-8 left-0 right-0 h-8 bg-neutral-900 ${styles.textureMaskTop}`}
                />
                <div
                  className={`absolute -bottom-8 left-0 right-0 h-8 bg-neutral-900 ${styles.textureMaskBottom}`}
                />
                <Modal
                  isOpen={!!activeVideo}
                  onClose={() => setActiveVideo(null)}>
                  <div className='w-full flex-shrink-0'>
                    {activeVideo && (
                      <>
                        <h3 className='mb-6 mt-1 text-2xl md:-mt-1'>
                          {activeVideo.title}
                        </h3>
                        <ResponsiveEmbed>
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&autoplay=1`}
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowFullScreen
                          />
                        </ResponsiveEmbed>
                      </>
                    )}
                  </div>
                </Modal>
                <div className='overflow-hidden' ref={videosRef}>
                  <div className='section-container'>
                    <h2 className='mb-10 text-center text-4xl'>
                      Open House videos
                    </h2>
                    <CategorySelector
                      className='mb-10 md:mb-14 lg:mb-20'
                      options={videoCategoryList}
                      activeClassName='bg-ch-yellow text-neutral-800'
                      inactiveClassName='text-neutral-0 hover:border-ch-yellow'
                    />
                    <ContentCarousel mode='dark'>
                      {filteredVideos.map((video, videoIndex) => {
                        return (
                          <div
                            key={videoIndex}
                            className='group/videoItem relative flex h-full flex-col bg-white text-black'>
                            <div className='relative'>
                              <MarketingVideoThumbnail
                                videoId={video.youtubeId}
                                className='z-0'
                              />
                              <Image
                                src={playButton}
                                width={89}
                                height={89}
                                alt='Play'
                                className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover/videoItem:scale-105'
                              />
                            </div>
                            <div className='flex flex-1 flex-col p-4 lg:p-6'>
                              <p className='mb-3 flex justify-start gap-2 text-sm opacity-60'>
                                {video.category}
                              </p>
                              <h3 className='mb-3 text-xl'>
                                <Link
                                  target='_blank'
                                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    setActiveVideo(video)
                                  }}>
                                  <span className='absolute inset-0 z-10' />
                                  {video.title}
                                </Link>
                              </h3>
                              <strong className='mt-auto group-hover/videoItem:underline'>
                                Watch now
                              </strong>
                            </div>
                          </div>
                        )
                      })}
                    </ContentCarousel>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Table */}
          <section className={`bg-neutral-950 py-20 ${styles.dotBackground}`}>
            <div className='mx-auto max-w-6xl px-6 lg:px-12'>
              <h2 className='mb-14 text-center text-4xl lg:mb-20'>
                What’s happening at Open House?
              </h2>
              <div className='divide-y-2 divide-ch-yellow'>
                {(
                  [
                    {
                      title: 'News & roadmap',
                      description:
                        'Hear from company founders and product leaders about latest company and product news and the future of ClickHouse.',
                      icon: imageIconMegaphone
                    },
                    {
                      title: 'Technical track',
                      description:
                        'Dive deep into the newest features for real-time analytics, data warehousing, observability, and AI/ML use cases.',
                      icon: imageIconBinary
                    },
                    {
                      title: 'Networking',
                      description:
                        'Hear talks and see demos from other users and network during breakfast, lunch, and evening reception.',
                      icon: imageIconNetwork
                    },
                    {
                      title: 'Ask me anything',
                      description:
                        'ClickHouse experts from core database developers to support around every day to answer questions in a dedicated AMA area.',
                      icon: imageIconFaq
                    }
                  ] satisfies Array<{
                    title: string
                    description: string
                    icon: Pick<ImageProps, 'src'>
                  }>
                ).map((row, rowIndex) => {
                  return (
                    <div
                      key={rowIndex}
                      className='grid-cols-[repeat(15,_minmax(0,_1fr))] space-y-6 divide-white py-6 lg:grid lg:space-y-0 lg:divide-x-2 lg:py-0'>
                      <div className='col-span-2 items-center justify-center sm:float-start sm:mr-4 lg:float-none lg:mr-0 lg:flex lg:py-8 lg:pr-2'>
                        <Image
                          src={row.icon}
                          width={75}
                          height={75}
                          alt={row.title}
                        />
                      </div>
                      <div className='col-span-5 items-center justify-center text-2xl font-bold uppercase lg:flex lg:px-2 lg:py-8 lg:text-center'>
                        {row.title}
                      </div>
                      <div className='col-span-8 items-center text-left text-lg lg:flex lg:py-8 lg:pl-8'>
                        {row.description}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Agenda */}
          <section className='relative bg-ch-yellow py-20 text-black'>
            <div
              className={`absolute -top-8 left-0 right-0 h-8 bg-ch-yellow ${styles.textureMaskTop}`}
            />
            <div className='mx-auto max-w-6xl px-6 lg:px-12' id='agenda'>
              <h2 className='mb-10 text-center text-4xl'>Agenda at a glance</h2>
              {/* Agenda overview */}
              <div className='mb-20 grid-cols-2 gap-6 space-y-16 lg:mb-24 lg:grid lg:space-y-0'>
                <div className='relative space-y-6 bg-neutral-950 px-6 pb-4 pt-2 text-white lg:px-12 lg:pb-6 lg:pt-4 lg:text-lg'>
                  <div
                    className={`absolute -bottom-8 left-0 right-0 h-8 bg-neutral-950 ${styles.textureMaskBottom}`}
                  />
                  <FontSohneBreit>
                    <h3 className='text-4xl'>
                      <small className='text-2xl font-bold uppercase'>
                        MAY 28
                      </small>
                      <br />
                      Workshops
                    </h3>
                  </FontSohneBreit>
                  <p>Free training workshops</p>
                  <ul className='!mt-0 list-disc pl-8'>
                    <li>ClickHouse Developer Training</li>
                    <li>ClickHouse Query Optimization </li>
                  </ul>
                  <p>Hyatt Regency, Embarcadero, San Francisco</p>
                </div>
                <div className='relative space-y-6 bg-neutral-950 px-6 pb-4 pt-2 text-white lg:px-12 lg:pb-6 lg:pt-4 lg:text-lg'>
                  <div
                    className={`absolute -bottom-8 left-0 right-0 h-8 bg-neutral-950 ${styles.textureMaskBottom}`}
                  />
                  <FontSohneBreit>
                    <h3 className='text-4xl'>
                      <small className='text-2xl font-bold uppercase'>
                        MAY 29
                      </small>
                      <br />
                      Conference
                    </h3>
                  </FontSohneBreit>
                  <p>Main conference day</p>
                  <ul className='!mt-0 list-disc pl-8'>
                    <li>Full day of content, AMA booths, and more</li>
                    <li>Rooftop after party</li>
                  </ul>
                  <p>The Pearl, San Francisco</p>
                </div>
              </div>

              {/* Agenda deepdive */}
              <div className='mb-2.5 bg-neutral-950 py-6 text-center text-2xl font-bold text-white lg:px-12 lg:text-left'>
                Conference day agenda
              </div>
              <div className='relative flex flex-col gap-2.5'>
                <div className='bg-gradient-checkered absolute bottom-0 left-52 top-0 z-10 hidden w-0.5 from-neutral-950 bg-[length:1rem_1rem] lg:block' />
                {AGENDA.map((row, rowIndex) => {
                  return (
                    <AgendaItem
                      key={rowIndex}
                      title={row.title}
                      time={row.time}>
                      {(row.description ||
                        (row.videoCategory && VIDEOS.length > 0)) && (
                        <>
                          {row.description}
                          {row.videoCategory && VIDEOS.length > 0 && (
                            <button
                              onClick={(event) =>
                                scrollToVideos(event, row.videoCategory)
                              }
                              className='group mt-6 inline-flex items-center rounded-full border-2 border-neutral-950 bg-neutral-950 text-white transition-colors hover:bg-transparent hover:text-neutral-950'>
                              <Image
                                src={playButton}
                                width={50}
                                height={50}
                                alt='Icon'
                                className='rounded-full border-2 border-white'
                              />
                              <FontSohneBreit
                                as='span'
                                className='inline-block pl-4 pr-6'>
                                Watch session replays
                              </FontSohneBreit>
                            </button>
                          )}
                        </>
                      )}
                    </AgendaItem>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Speakers */}
          <section className='relative bg-white py-20 text-black'>
            <div
              className={`absolute -bottom-8 left-0 right-0 z-20 h-8 bg-white ${styles.textureMaskBottom}`}
            />
            <div className='mx-auto max-w-[1413px] px-6'>
              <h2 className='mb-4 text-center text-4xl'>Speakers</h2>
              <p className='mb-10 text-center text-2xl'>
                We have an exciting line-up of speakers, and more announcements
                on the way
              </p>
              <div className='-mx-2 -my-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {initialSpeakers.map((profile, profileIndex) => {
                  return <SpeakerProfile {...profile} key={profileIndex} />
                })}
              </div>

              {overflowSpeakers.length > 0 && (
                <div
                  className={`relative transition-all duration-300 ${displayAllSpeakers ? 'mt-4' : 'mt-14'}`}>
                  <div className='-mx-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    <AnimatePresence onExitComplete={scrollToSpeakersToggle}>
                      {displayAllSpeakers &&
                        overflowSpeakers.map((profile, profileIndex) => {
                          return (
                            <motion.div
                              key={profileIndex}
                              variants={{
                                closed: {
                                  opacity: 0,
                                  height: 0,
                                  transition: {
                                    delay: 0
                                  }
                                },
                                open: {
                                  opacity: 1,
                                  height: 'auto',
                                  transition: {
                                    delay: (profileIndex + 1) / 10
                                  }
                                }
                              }}
                              initial='closed'
                              animate='open'
                              exit='closed'
                              transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.5
                              }}>
                              <SpeakerProfile {...profile} />
                            </motion.div>
                          )
                        })}
                    </AnimatePresence>
                  </div>
                  <div
                    ref={speakersToggleRef}
                    className='sticky bottom-0 z-40 -mx-6 bg-white/60 px-6 py-2 text-center backdrop-blur sm:relative sm:bg-transparent sm:backdrop-blur-0'>
                    <OpenHouseButton
                      href='#'
                      onClick={(event) => {
                        event.preventDefault()
                        setDisplayAllSpeakers((old) => !old)
                      }}
                      variant='dark'
                      size='lg'
                      className='w-full min-w-48 sm:w-auto'>
                      {!displayAllSpeakers && 'View all speakers'}
                      {displayAllSpeakers && 'Collapse all speakers'}
                    </OpenHouseButton>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTAs */}
          <section
            className={`relative flex bg-[#2F3032] pb-20 pt-24 text-black bg-blend-screen lg:min-h-[700px] ${styles.patternBackground}`}>
            <div className='mx-auto my-auto w-full max-w-xl px-6 lg:px-12'>
              <div className='grid-cols-1 gap-6 space-y-6 md:grid md:space-y-0'>
                <div className='space-y-8 bg-white px-6 py-8 text-center text-lg lg:px-12 lg:py-10'>
                  <FontSohneBreit>
                    <h3 className='text-4xl'>Open House</h3>
                  </FontSohneBreit>
                  <p>
                    The Pearl
                    <br />
                    San Francisco, California
                    <br />
                    FREE
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className='relative bg-white py-20 text-black'>
            <div className='mx-auto max-w-6xl px-6 lg:px-12'>
              <h2 className='mb-4 text-center text-4xl'>FAQs</h2>
              <OpenHouseAccordionItem handle='What is Open House 2025 by ClickHouse?'>
                <p className='max-w-3xl'>
                  Open House 2025 is the first ever ClickHouse User Conference!
                  It is a premier one-day event for ClickHouse users,
                  contributors, enthusiasts, and customers, hosted in the heart
                  of San Francisco on 29 May. For those unable to join in
                  person, the event will be streamed to multiple locations
                  worldwide, ensuring everyone can be part of this global
                  gathering.
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='What can I expect from the agenda?'>
                <p className='max-w-3xl'>
                  At a glance the agenda and initial speaker lineup is above,
                  and we’ll be announcing more details as the event shapes up.
                  It will include:
                </p>
                <ul className='mt-4 list-disc pl-8'>
                  <li>Insights from company founders</li>
                  <li>
                    In-depth technical sessions from builders and practitioners
                  </li>
                  <li>ClickHouse users sharing their stories</li>
                  <li>Demos and AMA</li>
                </ul>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Will you be offering in-person training?'>
                <p className='mb-4 max-w-3xl'>
                  We are offering free in-person training workshops on May 28,
                  the day before the main event. Workshops will be held at the
                  Hyatt Regency Embarcadero.
                </p>
                <p className='mb-4 max-w-3xl'>
                  Join us for one of two training options: a full day course
                  open to all levels, and a half day advanced course. Whether
                  you're just starting with ClickHouse or refining an advanced
                  deployment, these workshops will empower you with the tools
                  and techniques to unlock the full potential of your data.
                </p>
                <p className='max-w-3xl'>
                  Register for Open House and check the box for training on the
                  registration form to receive more information.
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Will there be a CFP process for speakers?'>
                <p className='max-w-3xl'>
                  Yes! Please apply to be a speaker{' '}
                  <Link
                    href='https://sessionize.com/clickhouse-user-conference-2025/'
                    target='_blank'
                    className='underline hover:decoration-2'>
                    here
                  </Link>
                  .
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Are you accepting sponsorships for the event?'>
                <p className='max-w-3xl'>
                  We do not plan to have a formal sponsor expo at this event,
                  but if you’d like to collaborate with us on this event, please
                  share your ideas with the organizers at{' '}
                  <Link
                    href='mailto:openhouse@clickhouse.com'
                    target='_blank'
                    className='underline hover:decoration-2'>
                    openhouse@clickhouse.com
                  </Link>
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Will you have a code of conduct?'>
                <p className='max-w-3xl'>
                  Yes. ClickHouse is committed to providing a safe and
                  harassment-free experience for participants at all of our
                  events. All attendees are required to comply with the{' '}
                  <Link
                    href='/events-code-of-conduct'
                    className='underline hover:decoration-2'>
                    Code of Conduct
                  </Link>
                  .
                </p>
              </OpenHouseAccordionItem>
            </div>
          </section>

          {/* Get in touch */}
          <section className='relative bg-white pb-20 text-black'>
            <div className='mx-auto max-w-6xl px-6 lg:px-12'>
              <div className='flex flex-col items-center gap-x-20 gap-y-10 rounded bg-neutral-900 p-8 text-white lg:flex-row lg:px-14 lg:py-16'>
                <div className='w-full lg:w-auto'>
                  <h2 className='mb-4 text-4xl'>Get in touch</h2>
                  <p className='text-lg'>
                    For questions about the event or general inquiries,
                    <br />
                    please reach out to{' '}
                    <Link
                      href='mailto:openhouse@clickhouse.com'
                      target='_blank'
                      className='underline hover:decoration-2'>
                      openhouse@clickhouse.com
                    </Link>
                  </p>
                </div>
                <div className='w-full flex-1 text-center lg:w-auto'>
                  <OpenHouseButton
                    href='/company/contact'
                    variant='primary'
                    size='lg'
                    className='w-full flex-1 sm:mx-auto sm:w-auto sm:min-w-48'>
                    Get in touch
                  </OpenHouseButton>
                </div>
              </div>
            </div>
          </section>
        </div>
      </FontSohne>
      <Footer {...footerData} />
    </>
  )
}

function AgendaItem({
  time,
  title,
  children
}: {
  time: string
  title: string
  children?: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='relative overflow-hidden bg-white p-4 lg:p-0'>
      <div className='flex'>
        <div className='flex flex-1 flex-wrap lg:flex-nowrap'>
          <div className='flex w-full flex-shrink-0 flex-grow-0 items-center text-lg font-bold lg:h-20 lg:w-52 lg:justify-center lg:text-center lg:text-2xl'>
            {time}
          </div>
          <div className='text-lg lg:flex-1 lg:py-6 lg:pl-12 lg:text-2xl'>
            {title}
          </div>
        </div>
        {!!children && (
          <button
            type='button'
            className='group/agenda-button flex aspect-square w-12 items-center justify-center lg:w-20'
            onClick={(event) => {
              event.preventDefault()
              setIsOpen((old) => !old)
            }}>
            <span className='absolute inset-0 block' />
            <span className='sr-only'>
              {isOpen ? 'Close agenda item' : 'Open agenda item'}
            </span>
            <span className='flex aspect-square flex-1 items-center justify-center rounded-full transition-colors group-hover/agenda-button:bg-neutral-900/5 lg:m-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='18'
                fill='none'
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <path
                  stroke='#171618'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7.03 1v14.99M13.02 10l-6 6.04L1 10'
                />
              </svg>
            </span>
          </button>
        )}
      </div>
      <AnimatePresence>
        {!!children && isOpen && (
          <motion.div
            variants={{
              closed: {
                opacity: 0,
                height: 0,
                y: '1rem',
                transition: {
                  delay: 0
                }
              },
              open: {
                opacity: 1,
                height: 'auto',
                y: '0rem'
              }
            }}
            initial='closed'
            animate='open'
            exit='closed'
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.5
            }}>
            <div className='pt-4 lg:pb-6 lg:pl-64 lg:pr-12 lg:pt-0'>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SpeakerProfile({
  name,
  title,
  image
}: {
  name: string
  title: string
  image: ImageProps['src']
}) {
  return (
    <div className='group/speaker'>
      <div className='px-2 py-4'>
        <div className='relative mb-4 aspect-square bg-[#EFEFEF]'>
          <Image
            src={image}
            alt={name}
            width={353}
            height={505}
            className='absolute inset-0 z-10 h-full w-full max-w-none grayscale transition group-hover/speaker:grayscale-0'
          />
        </div>
        <h3 className='text-lg md:text-xl lg:text-2xl'>{name}</h3>
        <p className='text-sm md:text-base lg:text-lg'>{title}</p>
      </div>
    </div>
  )
}

function ContentCarousel({
  children,
  mode = 'light'
}: {
  children: React.ReactNode
  mode?: 'dark' | 'light'
}) {
  const prevRef = useRef<null | HTMLButtonElement>(null)
  const nextRef = useRef<null | HTMLButtonElement>(null)
  const swiperRef = useRef<null | SwiperClass>(null)

  const modeButtonClasses: Record<'dark' | 'light', string> = {
    dark: 'bg-ch-yellow ring-neutral-900 ring-offset-neutral-900',
    light: 'bg-neutral-900 ring-neutral-900 ring-offset-ch-yellow'
  }

  const modeArrowClasses: Record<'dark' | 'light', string> = {
    dark: 'saturate-0 brightness-0',
    light: ''
  }

  useEffect(() => {
    const swiperClass = swiperRef.current
    const prev = prevRef.current
    const next = nextRef.current
    if (
      swiperClass &&
      swiperClass.params &&
      swiperClass.params.navigation &&
      swiperClass.navigation &&
      prev &&
      next
    ) {
      // Assign the navigation elements
      if (swiperClass.params.navigation === true) {
        swiperClass.params.navigation = {}
      }
      swiperClass.params.navigation.prevEl = prevRef.current
      swiperClass.params.navigation.nextEl = nextRef.current

      // Initialize navigation
      swiperClass.navigation.destroy()
      swiperClass.navigation.init()
      swiperClass.navigation.update()
    }
  }, [swiperRef, prevRef, nextRef])

  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={6}
        speed={600}
        watchSlidesProgress={true}
        allowTouchMove={true}
        breakpoints={{
          480: {
            slidesPerView: 1.25,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 32
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32
          }
        }}
        navigation={true}
        className='!overflow-visible'
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}>
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return (
              <SwiperSlide key={index} className='!h-auto'>
                {({ isVisible }) => (
                  <div
                    className={`h-full transition-opacity ${isVisible ? '' : 'pointer-events-none opacity-50'}`}>
                    {child}
                  </div>
                )}
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
      <div className='pointer-events-none z-10 mt-4 flex items-center justify-center gap-4 lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:justify-between'>
        <button
          ref={prevRef}
          type='button'
          className={`pointer-events-auto flex aspect-square w-12 rounded-full ring-0 transition hover:ring hover:ring-offset-2 disabled:pointer-events-none disabled:opacity-20 lg:w-14 lg:-translate-x-2/3 lg:disabled:opacity-0 ${modeButtonClasses[mode]}`}>
          <span className='sr-only'>Previous slide</span>
          <Image
            src={navigationArrow}
            width={24}
            height={16}
            alt='Previous slide'
            className={`m-auto w-5 rotate-180 lg:w-6 ${modeArrowClasses[mode]}`}
          />
        </button>
        <button
          ref={nextRef}
          type='button'
          className={`pointer-events-auto flex aspect-square w-12 rounded-full ring-0 transition hover:ring hover:ring-offset-2 disabled:pointer-events-none disabled:opacity-20 lg:w-14 lg:translate-x-2/3 lg:disabled:opacity-0 ${modeButtonClasses[mode]}`}>
          <span className='sr-only'>Next slide</span>
          <Image
            src={navigationArrow}
            width={24}
            height={16}
            alt='Next slide'
            className={`m-auto w-5 lg:w-6 ${modeArrowClasses[mode]}`}
          />
        </button>
      </div>
    </div>
  )
}
