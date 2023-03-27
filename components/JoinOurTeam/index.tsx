import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import SocialIcon from '../SocialIcon'

function JoinOurTeam() {
  return (
    <div className='bg-primary-300 text-neutral py-16 flip-selection text-center px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-4 font-bold text-3xl'>
          Interested in joining our team?
        </div>
        <p className='text-base'>
          If you are looking for a place to build something new, be an agent of
          change, and have an opportunity to have a significant impact on the
          company’s success, this is the place for you.
        </p>
        <Link href='/company/careers'>
          <div className='mt-4 text-white bg-black rounded py-2 px-6 font-base inline-block'>
            <span className='flex justify-center items-center gap-2'>
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
