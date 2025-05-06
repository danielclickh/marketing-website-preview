import { CommonProps, Feature } from './homepage'
import {
  StrapiButton,
  StrapiIconButton,
  StrapiImageType
} from '@/lib/api/strapi/types'

export interface ClickhouseHero {
  title: string
  description: string
  mainButton: StrapiButton
  secondaryButton: StrapiButton
  gitButton: StrapiIconButton
  backgroundPng: StrapiImageType
}

export interface ClickhouseFeatures2Item {
  title: string
  description: string
  iconSvg: StrapiImageType
}

export interface ClickhouseFeatures2 {
  pretitle: string
  title: string
  items: Array<ClickhouseFeatures2Item>
}

export interface ClickhouseFeatures3Item {
  title: string
  description: string
}

export interface ClickhouseFeatures3 {
  pretitle: string
  iconSvg: StrapiImageType
  mainItem: ClickhouseFeatures3Item
  items: Array<ClickhouseFeatures3Item>
}

export interface ClickhouseFeatures4Item {
  title: string
  description: string
}

interface ClickhouseFeatures4 {
  pretitle: string
  title: string
  items: Array<ClickhouseFeatures4Item>
}

export interface ClickhouseFeatures5Item {
  text: string
}

export interface ClickhouseFeatures5 {
  pretitle: string
  title: string
  description: string
  iconSvg: StrapiImageType
  second_title: string
  second_description: string
  items: Array<ClickhouseFeatures5Item>
}

export interface ClickHouseFeatures1 {
  title: string
  items: Array<Feature>
}

export interface ClickhouseData extends CommonProps {
  hero: ClickhouseHero
  features1: ClickHouseFeatures1
  features2: ClickhouseFeatures2
  features3: ClickhouseFeatures3
  features4: ClickhouseFeatures4
  features5: ClickhouseFeatures5
}
