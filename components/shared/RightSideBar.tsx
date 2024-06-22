"use client"
import React, { MouseEventHandler } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useLanguage } from '@/context/languageContext'
import { determineDictionary } from '@/lib/determineDictionaries'
import { GoHome } from "react-icons/go";
import { useAtom } from 'jotai'
import { RightSidebarAtom, SidebarLayoutAtom } from '@/context/jotaiContext/atom'
import { RiHistoryFill } from "react-icons/ri";

const RightSideBar = () => {
  const { language } = useLanguage();
  const data = determineDictionary(language);
  const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);
  const [RightSidebarMobileOpen, setIsRightSidebarMobileOpen] = useAtom(RightSidebarAtom);
  // const [messages, setMessages] = useAtom(MessagesAtom);

  const handleClickRightSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsRightSidebarMobileOpen(!RightSidebarMobileOpen)
  };

  const StartnewChat: MouseEventHandler<HTMLButtonElement> = () => {
    // setMessages([]);

  };

  return (
    <div className={`${SidebarLayout && 'arabic-font'} lg:p-4 p-6 flex flex-col gap-4 bg-[#F3F3EE]  min-h-screen `}>
      <div className='flex justify-between items-center gap-4'>
        <Button onClick={StartnewChat} className='bg-dark-100 hover:bg-dark-200 flex-center gap-2 rounded-3xl w-full'>
          {data.Start_a_new_Chat}
          <Image src="/icons/plus.svg" alt="search" width={16} height={16} />
        </Button>
        <div className="lg:hidden  border rounded-full p-2" onClick={handleClickRightSidebar}>
          <GoHome size={20} stroke-width={0.3} />
        </div>
      </div>


      <p className='text-dark-300 text-sm mt-1'>{data.Recent_Talks}</p>
      <div className='   transition-all flex-center gap-2 text-sm rounded-lg  cursor-pointer  hover:bg-dark-100 py-2 px-3 border '>
        <RiHistoryFill />
        <p className=' w-11/12 line-clamp-1  '>{data.Analyzing_Financial}</p>
      </div>
      {/* <p className='flex gap-2 line-clamp-1  '>{data.Analyzing_Financial}</p> */}
    </div>
  )
}

export default RightSideBar