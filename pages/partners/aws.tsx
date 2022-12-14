import Image from "next/image";
import Link from "next/link";
import React from "react";

const imagePrefix =
  process.env.NODE_ENV === "development" ? "" : "https://clickhouse.com/learn";

function PartnersPage() {
  return (
    <div className='min-h-screen pb-10 md:pb-20 mx-10'>
      <div className='flex flex-col md:flex-row-reverse container mx-auto gap-20 my-20 md:my-36 justify-center items-center'>
        <Image
          src={`${imagePrefix}/aws-partner.svg`}
          width='240'
          height='240'
          alt='aws partner'
        />
        <div className='max-w-3xl flex flex-col items-center md:items-start'>
          <h1 className='text-6xl font-bold pb-6'>Catchy headline</h1>
          <div className='description text-lg font-medium pb-10'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris.
          </div>
          <Link
            href='https://clickhouse.com/company/news-events'
            target='_blank'
          >
            <button className='button'>ClickHouse on AWS Marketplace</button>
          </Link>
        </div>
      </div>
      <div className='flex container mx-auto gap-6 lg:gap-12 flex-col md:flex-row flex-wrap justify-center  '>
        <div className='bg-white shadow-lg border border-light-grey4 md:w-80 hover:bg-white duration-300 ease-in-out hover:shadow-xl w-full p-6 rounded-lg'>
          <h3 className='font-bold text-lg pb-6 border-b-4 border-primary text-center w-fit mb-6 mx-auto'>
            Benefit 1
          </h3>
          <div className='description '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris.
          </div>
        </div>
        <div className='bg-white shadow-lg border border-light-grey4 md:w-80 hover:bg-white duration-300 ease-in-out hover:shadow-xl w-full p-6 rounded-lg'>
          <h3 className='font-bold text-lg pb-6 border-b-4 border-primary text-center w-fit mb-6 mx-auto'>
            Benefit 1
          </h3>
          <div className='description '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris.
          </div>
        </div>
        <div className='bg-white shadow-lg border border-light-grey4 md:w-80 hover:bg-white duration-300 ease-in-out hover:shadow-xl w-full p-6 rounded-lg'>
          <h3 className='font-bold text-lg pb-6 border-b-4 border-primary text-center w-fit mb-6 mx-auto'>
            Benefit 1
          </h3>
          <div className='description '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnersPage;
