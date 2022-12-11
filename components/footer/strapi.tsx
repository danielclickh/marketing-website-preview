'use client'
import Image from 'next/image'
import React from 'react'

function StrapiImg({ data }) {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.attributes.url}`}
      alt='aaaaa'
      fill
    />
  )
}

export default StrapiImg
