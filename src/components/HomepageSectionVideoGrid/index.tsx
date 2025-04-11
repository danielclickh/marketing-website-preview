import HomepageCustomerVideos from '../HomepageVideos'

export default function HomepageSectionVideoGrid(
  props: React.HTMLProps<HTMLDivElement>
) {
  return (
    <div {...props}>
      <div className='section-container mx-auto max-w-7xl px-3 xl:px-0'>
        <HomepageCustomerVideos
          videos={[
            {
              videoId: '863656593',
              type: 'vimeo',
              vimeoCode: 'ff50bb0ffb',
              quote:
                'Moving over to ClickHouse we were basically able to cut that (Redshift) bill in half.',
              personName: 'Brooke McKim',
              personTitleAndCompany: 'Co-founder and CTO, Vantage',
              image: '/images/vantage-tile.png'
            },
            {
              videoId: '863656379',
              type: 'vimeo',
              vimeoCode: 'ec5de7be6d',
              quote:
                "There is that feeling of new tech where everything just feels like it's going right.",
              personName: 'Harlow Ward',
              personTitleAndCompany: 'Co-founder and CTO, Clearbit',
              image: '/images/clearbit-tile.png'
            },
            {
              videoId: '863656471',
              type: 'vimeo',
              vimeoCode: '72825b3c5e',
              quote:
                'We wanted something not only just simple to use, but also simple to manage.',
              personName: 'Jason Wang',
              personTitleAndCompany: 'Software Engineer, Statsig',
              image: '/images/statsig-tile.png'
            },
            {
              videoId: '903236689',
              type: 'vimeo',
              vimeoCode: '62b37e3795',
              quote:
                'ClickHouse has been great for us. It has solved all the use cases we have thrown at it',
              personName: 'Ritesh Varyani',
              personTitleAndCompany: 'Senior Software Engineer, Lyft',
              image: '/images/lyft-tile.png'
            }
          ]}
        />
      </div>
    </div>
  )
}
