import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

function JoinOurTeam() {
  return (
    <div className='flip-selection bg-primary-300 px-8 py-16 text-center text-neutral'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-4 text-3xl font-bold'>
          Interested in joining our team?
        </div>
        <p className='text-base'>
          If you are looking for a place to build something new, be an agent of
          change, and have an opportunity to have a significant impact on the
          company’s success, this is the place for you.
        </p>
        <Link href='/company/careers'>
          <div className='font-base mt-4 inline-block rounded bg-black px-6 py-2 text-white'>
            <span className='flex items-center justify-center gap-2'>
              View careers
              <ArrowRightIcon className='w-4' />
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default JoinOurTeam
