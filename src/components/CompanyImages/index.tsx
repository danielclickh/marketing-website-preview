import 'glider-js/glider.min.css'
import { ReactNode } from 'react'
import Glider from 'react-glider'

const CompanyImages = ({ children }: { children: ReactNode }) => {
  return (
    <Glider
      hasArrows={false}
      slidesToShow='auto'
      draggable
      itemWidth={400}
      exactWidth={true}>
      {children}
    </Glider>
  )
}

export default CompanyImages
