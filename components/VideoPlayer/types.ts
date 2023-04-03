export type SourceType = {
  type: string
  path: string
}

export interface HTML5Props extends Omit<Plyr.Options, 'sources'> {
  provider: 'html5'
  sources: Array<SourceType>
  videoId?: never
}

export interface EmbededProps extends Omit<Plyr.Options, 'sources'> {
  videoId: string
  provider: 'youtube' | 'vimeo'
  sources?: never
}

export type Props = HTML5Props | EmbededProps
