"use client"
import React, { MouseEventHandler } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useLanguage } from '@/context/languageContext'
import { determineDictionary } from '@/lib/determineDictionaries'
import { GoHome } from "react-icons/go";
import { useAtom } from 'jotai'
import { RightSidebarAtom } from '@/context/atom'
import { RiHistoryFill } from "react-icons/ri";

const RightSideBar = () => {
  const { language } = useLanguage();
  const data = determineDictionary(language);


  const [RightSidebarOpen, setIsRightSidebarOpen] = useAtom(RightSidebarAtom);

  const handleClickRightSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsRightSidebarOpen(!RightSidebarOpen)
  };

  return (
    <div className={`lg:p-4 p-6 flex flex-col gap-4 bg-[#F3F3EE]  min-h-screen ${language === "en" ? "order-3" : "order-1"}`}>
      <div className='flex justify-between items-center gap-4'>
        <Button className='bg-dark-100 hover:bg-dark-200 flex-center gap-2 rounded-3xl w-full'>
          {data.Start_a_new_Chat}
          <Image src="/icons/plus.svg" alt="search" width={16} height={16} />
        </Button>
        <div className="lg:hidden  border rounded-full p-2" onClick={handleClickRightSidebar}>
          <GoHome size={20} stroke-width={0.3} />
        </div>
      </div>


      <p className='text-dark-300 text-sm mt-1'>{data.Recent_Talks}</p>
      <div className='  transition-all flex-center gap-2 text-sm rounded-md  cursor-pointer  hover:bg-dark-100 py-2 px-3 border '>
        <RiHistoryFill />
        <p className=' w-11/12 line-clamp-1  '>{data.Analyzing_Financial}</p>
      </div>
      {/* <p className='flex gap-2 line-clamp-1  '>{data.Analyzing_Financial}</p> */}
    </div>
  )
}

export default RightSideBar