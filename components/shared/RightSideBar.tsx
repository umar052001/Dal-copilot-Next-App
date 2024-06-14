"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useLanguage } from '@/context/languageContext'
import { determineDictionary } from '@/lib/determineDictionaries'

const RightSideBar = () => {
  const { language } = useLanguage();
  const data = determineDictionary(language);
  return (
    <div className={`p-4 flex flex-col gap-4 bg-[#F3F3EE] min-h-screen ${language === "en" ? "order-3" : "order-1"}`}>
      <Button className='bg-dark-100 hover:bg-dark-200 flex-center gap-2 rounded-3xl'>
        {data.Start_a_new_Chat}
        <Image src="/icons/plus.svg" alt="search" width={16} height={16} />
      </Button>
      <p className='text-dark-300 text-sm mt-1'>{data.Recent_Talks}</p>
      <div className='   rounded-md transition-all  cursor-pointer bg-dark-50 hover:bg-dark-100 py-2 px-3'>
        <p className=' w-11/12 line-clamp-1  '>{data.Analyzing_Financial}</p>

      </div>
      {/* <p className='flex gap-2 line-clamp-1  '>{data.Analyzing_Financial}</p> */}
    </div>
  )
}

export default RightSideBar