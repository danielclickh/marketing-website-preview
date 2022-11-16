import { GetStarted } from '../../components/get_started_area'
import { BaseLayout } from '../../components/layout'
import {
  SuiSpacer,
  SuiText,
  SuiTextField,
  SuiTitle
} from '../../components/sui'
import { BlogPost } from '../../components/blog_post'

export default function Blog() {
  return (
    <BaseLayout title='Blog • ClickHouse'>
      <div className='bg-web-light-c1 dark:bg-dark_hero_background pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='web'>
              <h1>Our blog</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>
                  Read updates on our products, our industry, our company, and
                  our culture.
                </p>
              </SuiText>
            </div>
          </div>
        </div>

        {/* <div className='w-full mx-auto bg-strain_background bg-cover mt-16 mb-12 h-24 md:h-40 bg-no-repeat 2xl:h-52' /> */}

        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 justify-between pt-24'>
          <div className='flex md:w-64 md:pr-8 pb-8 md:pb-0 flex-col'>
            <SuiTextField placeholder='Search' htmlFor='search' />
            <SuiSpacer size='lg' />
            <SuiTitle size='xxs'>
              <h4>Blog categories</h4>
            </SuiTitle>
            <ul className='mt-4'>
              <li className='bg-primary text-web-light-c1 dark:text-web-dark-c1 text-sm font-medium px-4 py-2 rounded-md'>
                View all
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Product
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Engineering
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Customer stories
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Company and culture
              </li>
            </ul>
          </div>
          <div className='flex flex-col md:flex-row md:w-3/4 md:space-x-16 justify-center'>
            <div className='flex flex-col space-y-12'>
              <div className='flex-col md:flex-row flex md:space-x-12 space-y-8 md:space-y-0'>
                <BlogPost
                  author_avatar='author_rich.png'
                  author_name='Rich Raposa'
                  date='May 3, 2022'
                  image='docs-post.png'
                  title='ClickHouse Docs have a new look and feel!'
                  tag='Product'
                  abstract='ClickHouse is impressively fast, in fact, that is core to our engineering ethos and the goals of the project. Understanding ClickHouse (or any new product) and using it effectively'
                />
                <BlogPost
                  author_avatar='author_christoph.png'
                  author_name='Christoph Wurm'
                  date='April 14, 2022'
                  image='blog_post_newsletter.png'
                  title='ClickHouse Newsletter April 2022: JSON, JSON, JSON'
                  tag='Product'
                  abstract='Greetings from Amsterdam, where tulips are in full bloom this time of year. Here is your April newsletter for all things ClickHouse. We have a new release with a really'
                />
                <BlogPost
                  author_avatar='author_alexey.png'
                  author_name='Alexey Milovidov'
                  date='April 4, 2022'
                  image='blog_post_release.png'
                  title='ClickHouse 22.3 LTS Released'
                  tag='Product'
                  abstract='The new ClickHouse release 22.3 is ready! This is a long-term support release (LTS) — it will receive security updates and important bug fixes through March 2023'
                />
              </div>

              <div className='flex-col md:flex-row flex md:space-x-12 md:pb-24'>
                <BlogPost
                  author_avatar='author_alexey.png'
                  author_name='Alexey Milovidov'
                  date='April 1, 2022'
                  image='blog_post_copy.png'
                  title='Building a Paste Service With ClickHouse'
                  tag='Engineering'
                  abstract='I like to test ClickHouse in unusual scenarios. Whenever someone (including myself) says that ClickHouse is not good for a particular task, I immediately go and test it on exactly'
                />

                <BlogPost
                  author_avatar='author_alexey.png'
                  author_name='Alexey Milovidov'
                  date='April 1, 2022'
                  image='blog_post_scribble.png'
                  title='Building a Paste Service With ClickHouse'
                  tag='Engineering'
                  abstract='I like to test ClickHouse in unusual scenarios. Whenever someone (including myself) says that ClickHouse is not good for a particular task, I immediately go and test it on exactly'
                />

                <BlogPost
                  author_avatar='author_christoph.png'
                  author_name='Christoph Wurm'
                  date='April 1, 2022'
                  image='blog_post_science.jpeg'
                  title='ClickHouse Newsletter May 2022: Explain Statement – Query Optimization'
                  tag='Engineering'
                  abstract='A warm welcome to you all. It has been a busy few weeks at the ClickHouse office in Amsterdam – we have launched the private preview phase of our'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetStarted />
    </BaseLayout>
  )
}
