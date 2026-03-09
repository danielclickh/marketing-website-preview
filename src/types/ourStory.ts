import { CommonProps } from './homepage'
import { StrapiButton, StrapiImageType } from '@/lib/api/strapi/types'

interface OurStoryOffices {
  flagPng: StrapiImageType
  name: string
  location: string
}

interface OurStoryHero {
  title: string
  description: string
  imagePng: StrapiImageType
  offices: Array<OurStoryOffices>
}

interface OurStoryAboutUsItem {
  title?: string
  subtitle?: string
  description: string
  imagePng: StrapiImageType
}

interface OurStoryAboutUs {
  title: string
  items: Array<OurStoryAboutUsItem>
}

interface OurStoryOurHistoryItem {
  year: string
  text: string
}

interface OurStoryOurHistory {
  title: string
  items: Array<OurStoryOurHistoryItem>
}

interface OurStoryTeamMemberProfile {
  profileImagePng: StrapiImageType
  name: string
  role: string
}

export interface OurStoryTeam {
  foundersTitle: string
  investorsTitle: string
  founders: Array<OurStoryTeamMemberProfile>
  investors: Array<OurStoryTeamMemberProfile>
  darkInvestorLogosPng: Array<StrapiImageType>
  lightInvestorLogosPng: Array<StrapiImageType>
}

export interface OurStoryData extends CommonProps {
  hero: OurStoryHero
  aboutUs: OurStoryAboutUs
  ourHistory: OurStoryOurHistory
  hiring: {
    title: string
    description: string
    ctaButton: StrapiButton
  }
  team: OurStoryTeam
}
