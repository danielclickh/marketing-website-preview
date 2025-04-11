import CategorySelector from '../../CategorySelector'
import { SuiSearchField } from '../../sui/client'
import { BlogPostListProps } from './types'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

function BlogPostList({ categories, children }: BlogPostListProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)

  const filterBlogs = (
    search: string | null,
    selectedCategory: string | null
  ) => {
    const category = (selectedCategory ?? '').split(' ').join('-').toLowerCase()
    if (ref.current) {
      const blogs = ref.current?.querySelectorAll(
        `.blog-post-card${selectedCategory ? `.category-${category}` : ''}`
      )
      if (selectedCategory) {
        ref.current
          ?.querySelectorAll(`.blog-post-card:not(.category-${category})`)
          .forEach((blog) => {
            if (!blog.classList.contains('hidden')) {
              blog.classList.add('hidden')
            }
          })
      }
      blogs.forEach((blog) => {
        if (search) {
          const blogContent = (blog.textContent ?? '').toLowerCase()
          const showBlog = search
            .toLowerCase()
            .trim()
            .split(' ')
            .every((keyword) => {
              return blogContent.includes(keyword)
            })
          if (showBlog && blog.classList.contains('hidden')) {
            blog.classList.remove('hidden')
          } else if (!showBlog && !blog.classList.contains('hidden')) {
            blog.classList.add('hidden')
          }
        } else if (blog.classList.contains('hidden')) {
          blog.classList.remove('hidden')
        }
      })
    }
  }

  const onChangeCategory = (category: string | null) => {
    const normalizedCategory = category
      ? category.split(' ').join('-').toLowerCase()
      : ''
    filterBlogs(search, category)
    setSelectedCategory(category)
    const queryString = category ? `?category=${normalizedCategory}` : ''
    router.push('/jp/blog' + queryString, undefined, { shallow: true })
  }

  const ref = useRef<HTMLDivElement>(null)
  const categoryList = categories.map((category) => ({
    text: category,
    onClick: () => onChangeCategory(category),
    selected: selectedCategory == category
  }))

  categoryList.unshift({
    text: 'View All',
    onClick: () => onChangeCategory(null),
    selected: selectedCategory == null
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    filterBlogs(e.target.value, selectedCategory)
    setSearch(e.target.value)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const category = searchParams.get('category')
    if (category) {
      const sanitizedCategory = encodeURIComponent(category) // sanitize the category parameter
      const normalizedCategory = sanitizedCategory
        .split(' ')
        .join('-')
        .toLowerCase()
      const matchingCategory = categories.find(
        (c) => c.split(' ').join('-').toLowerCase() === normalizedCategory
      )
      if (matchingCategory) {
        onChangeCategory(matchingCategory)
      } else {
        setSelectedCategory(null)
        filterBlogs(null, null) // show all blogs
      }
    }
  }, [])

  return (
    <div className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'>
      <div className='flex-col items-center pb-8 lg:flex lg:flex-row lg:justify-between lg:space-x-24'>
        <SuiSearchField
          placeholder='Search by title or keyword...'
          htmlFor='search'
          className='mb-6 lg:mb-0 lg:flex-1'
          onChange={onChange}
        />
        <CategorySelector options={categoryList} />
      </div>
      <div className='w-full' ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default BlogPostList
