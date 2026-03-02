import OpenhouseButton from './Button'
import logo from './assets/logo.svg'
import navGradientTop from './assets/nav-gradient-top.png'
import Image from 'next/image'
import Link from 'next/link'

export default function OpenhouseHeader({
  agenda,
  speakers,
  faqs,
  register,
  applyToSpeak,
  registerLabel
}: {
  agenda: boolean
  speakers: boolean
  faqs: boolean
  register: boolean
  applyToSpeak: null | string
  registerLabel: string
}) {
  return (
    <header className='fixed inset-x-0 top-0 z-50 py-4 md:py-9'>
      <div
        className='absolute inset-x-0 top-0 z-0 h-24 bg-contain md:h-32'
        style={{ backgroundImage: `url(${navGradientTop.src})` }}
      />
      <Image
        src={logo}
        width={222}
        height={48}
        alt='Open House by ClickHouse'
        className='absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block'
      />
      <div className='section-container relative z-10 flex items-center justify-between lg:block'>
        <Image
          src={logo}
          width={222}
          height={48}
          alt='Open House by ClickHouse'
          className='w-full max-w-44 flex-shrink flex-grow-0 lg:hidden'
        />
        <nav className='flex-shrink-0'>
          <ul className='flex items-center gap-6 font-medium uppercase leading-loose tracking-wider'>
            {agenda && (
              <li className='hidden lg:block'>
                <Link href='#agenda' className='underline hover:text-ch-yellow'>
                  Agenda
                </Link>
              </li>
            )}
            {speakers && (
              <li className='hidden lg:block'>
                <Link
                  href='#speakers'
                  className='underline hover:text-ch-yellow'>
                  Speakers
                </Link>
              </li>
            )}
            {faqs && (
              <li className='hidden lg:block'>
                <Link href='#faqs' className='underline hover:text-ch-yellow'>
                  FAQ
                </Link>
              </li>
            )}
            <li className='mx-auto hidden lg:block' />
            {applyToSpeak && (
              <li className='hidden lg:block'>
                <Link
                  href={applyToSpeak}
                  target='_blank'
                  className='underline hover:text-ch-yellow'>
                  Apply to speak
                </Link>
              </li>
            )}
            <li>
              <OpenhouseButton
                href={register ? '#register' : '/company/contact'}>
                {register ? registerLabel : 'Get in touch'}
              </OpenhouseButton>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
