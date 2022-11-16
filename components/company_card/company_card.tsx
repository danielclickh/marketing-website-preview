import Link from 'next/link'
import { ReactElement } from 'react'

type CompanyCardProps = {
  path: string
  image: ReactElement
}

export function CompanyCard(props: CompanyCardProps) {
  const { path, image } = props

  return (
    <Link href={path}>
      <div className='flex w-full xl:w-52 bg-web-light-c1 dark:bg-web-dark-c1 rounded-lg py-6 justify-center hover:shadow-xl ease-in-out duration-200 cursor-pointer'>
        {image}
      </div>
    </Link>
  )
}
