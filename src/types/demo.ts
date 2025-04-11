import { Demo } from './demos'
import { CommonProps, NewsLetterData } from './homepage'

export interface DemoProps extends Demo, CommonProps {
  otherDemos: Demo[]
  newsLetterData: NewsLetterData
}
