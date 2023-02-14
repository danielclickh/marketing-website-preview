import React, { ReactNode } from 'react'
import Glider from 'react-glider'
import 'glider-js/glider.min.css'

const CompanyImages = ({ children }: { children: ReactNode }) => {
  return (
    <Glider hasArrows={false} slidesToShow='auto' draggable itemWidth={320}>
      {children}
    </Glider>
  )
}

export default CompanyImages
