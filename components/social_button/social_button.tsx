import Link from 'next/link'
import Image from 'next/image'

type SocialButtonProps = {
  path: string
  name: string
}

export function SocialButton(props: SocialButtonProps) {
  const { path, name } = props

  return (
    <Link href={path}>
      <div className='flex w-full xl:w-52 bg-web-light-c1 dark:bg-web-dark-c1 rounded-lg py-6 justify-center hover:shadow-xl ease-in-out duration-200 cursor-pointer'>
        <Image
          src={`/contact/logo_${name}.svg`}
          alt={name}
          width='46'
          height='46'
        />
      </div>
    </Link>
  )
}
