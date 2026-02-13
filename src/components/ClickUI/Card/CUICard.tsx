import React, { HTMLAttributes } from 'react'
import Tilt from 'react-parallax-tilt'

type CardElementType = HTMLAttributes<HTMLDivElement> & {
  hFull?: boolean
}
type CardComponent = React.FunctionComponent<CardElementType> & {
  Header: React.FunctionComponent<HTMLAttributes<HTMLDivElement>>
  Body: React.FunctionComponent<HTMLAttributes<HTMLDivElement>>
  Footer: React.FunctionComponent<HTMLAttributes<HTMLDivElement>>
}

const CUICard: CardComponent = ({
  children,
  className,
  hFull = true,
  ...props
}): JSX.Element => (
  <Tilt
    tiltEnable={false}
    glareEnable={true}
    glareMaxOpacity={0.4}
    glareColor='rgba(251, 255, 70, 0.08)'
    glarePosition='all'
    className={hFull ? 'h-full' : undefined}>
    <div
      className={`cui-card flex h-full flex-col items-center justify-between rounded-lg border border-neutral-700/80 bg-neutral-900/50 shadow-card hover:shadow-lg ${className}`}
      {...props}>
      {children}
    </div>
  </Tilt>
)

const Header = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`cui-card-header w-full ${className}`} {...props}>
    {children}
  </div>
)

CUICard.Header = Header

const Body = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`cui-card-body w-full ${className}`} {...props}>
    {children}
  </div>
)
CUICard.Body = Body

const Footer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`cui-card-footer w-full ${className}`} {...props}>
    {children}
  </div>
)
CUICard.Footer = Footer

export default CUICard
