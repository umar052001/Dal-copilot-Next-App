"use client";
import { SignedIn } from "@clerk/clerk-react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { MouseEventHandler } from "react";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { useAtom } from 'jotai'
import { fileObjectAtom, fileArrayAtom, SidebarAtom, SidebarLayoutAtom } from '@/context/atom'
import { AiTwotoneFilePdf } from "react-icons/ai";
import { MdSmsFailed } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TbLogout } from "react-icons/tb";
import { FaTimes } from 'react-icons/fa';
import { MdOutlineErrorOutline } from "react-icons/md";



const LeftSidebar = () => {
  const { language, setLanguage } = useLanguage();
  const data = determineDictionary(language);
  const [fileObject] = useAtom(fileObjectAtom);
  const [fileArray, setFileArray] = useAtom(fileArrayAtom);
  const [LeftSidebarOpen, setIsLeftSidebarOpen] = useAtom(SidebarAtom);
  const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);

  const handleClickleftSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsLeftSidebarOpen(!LeftSidebarOpen)
  };
  const handleDelete = (originalIndex: number) => {
    const updatedFiles = fileArray.filter((_, index) => index !== originalIndex);
    setFileArray(updatedFiles);
  };

  const reversedFiles = fileArray.slice().reverse();
  return (
    <div className={`${language === "en" ? "order-1" : "order-3"}  min-h-screen  bg-[#F3F3EE]  flex justify-between  flex-col p-6   `}>
      <div className="flex flex-col gap-5  items-center    ">
        <div className=" flex   justify-between items-start  w-full  ">
          <div className="lg:hidden  border rounded-full p-2" onClick={handleClickleftSidebar}>
            <RxCross2 size={20} stroke-width={0.2} />
          </div>
          <div className="flex xl:flex-row  flex-col-reverse   justify-between items-center gap-7">
            <Image
              src="/LogoMark&Type.svg"
              className="mb-4"
              alt="search"
              width={128}
              height={56}
            />
            <Image
              role="button"
              src="https://www.dal-demo.live/static/media/icon-close-sidebar.f533511f4b93ab354ecd666a1324e890.svg"
              alt="icon"
              width={40}
              height={40}
              className="object-cover lg:block hidden"
            />
          </div>
        </div>
        <div className="  space-y-5  justify-between items-start  w-full overflow-y-auto  min-h-[67vh] max-h-screen ">
          <Link href="/" className="flex gap-2 w-full body-regular font-light">
            <Image src="/icons/home.svg" alt="search" width={16} height={16} />
            {data.home}
          </Link>
          <Link href="/" className="flex gap-2 w-full body-regular font-light">
            <Image
              src="/icons/discover.svg"
              alt="search"
              width={16}
              height={16}
            />
            {data.discover}
          </Link>
          <Link href="/" className="flex gap-2 w-full body-regular font-light">
            <Image src="/icons/library.svg" alt="search" width={16} height={16} />
            {data.library}
          </Link>
          <Accordion
            type="single"
            collapsible
            className="w-full body-regular overflow-x-hidden "
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className=" no-underline  py-0 pb-4 ">
                <div className="flex-center gap-2  ">
                  <Image
                    src="/icons/knowledge-bases.svg"
                    alt="search"
                    width={18}
                    height={18}
                  />

                  <p className="mt-1  ">{data.knowledge_basis}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="w-full text-wrap flex flex-col gap-2">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full body-regular  "
                >
                  <AccordionItem value="item-2">
                    <AccordionTrigger className=" no-underline  py-0 pb-2 ">
                      <div className="flex gap-2 cursor-pointer  p-2">
                        <Image
                          src="/icons/docs.svg"
                          alt="search"
                          width={15}
                          height={15}
                        />
                        {data.documents}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="w-full  text-wrap flex flex-col gap-2 ">
                      {fileArray?.length !== 0 ? (
                        reversedFiles.slice(0, 3).map((fileObject, index) => {
                          const originalIndex = fileArray.length - 1 - index;
                          return (
                            <div key={originalIndex}
                              className=" flex  relative items-center   justify-between select-none text-xs gap-2 bg-[#E8E8E3] border border-[#E8E8E3] px-2 py-1 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <AiTwotoneFilePdf size={24} />
                                <div className="leading-4">
                                  <p className="font-extrabold  line-clamp-1 w-10/12">{fileObject.name}</p>
                                  <div className="flex gap-1">
                                    <p>{fileObject.sizeInMb}</p> -
                                    <p className="text-gray-500">{fileObject.lastModifiedFormatted}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="border  transition-all p-1 absolute right-2 top-[10px] ease-in-out bg-[#d1d1cd] hover:bg-[#c7c7c4] cursor-pointer rounded-full " onClick={() => handleDelete(originalIndex)}>
                                <RxCross2 size={10} stroke-width={0.3} />
                              </div>

                            </div>
                          );
                        })
                      ) : (
                        <div className=' flex-center  gap-1  border  p-2 rounded-md   '>
                          <p className="  text-red-400  font-bold">Upload PDF </p>
                          <MdOutlineErrorOutline size={20} className=' opacity-50' color="red" />
                        </div>
                      )}

                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex gap-2 border  rounded-md cursor-pointer hover:bg-dark-100 p-2">
                  <Image
                    src="/icons/urls.svg"
                    alt="search"
                    width={20}
                    height={20}
                  />
                  {data.urls}
                </div>
                <div className="flex gap-2 border rounded-md cursor-pointer hover:bg-dark-100 p-2">
                  <Image
                    src="/icons/tables.svg"
                    alt="search"
                    width={16}
                    height={16}
                  />
                  {data.tables}
                </div>
                <div className="flex gap-2 border rounded-md cursor-pointer hover:bg-dark-100 p-2">
                  <Image
                    src="/icons/data.svg"
                    alt="search"
                    width={16}
                    height={16}
                  />
                  {data.data}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>



      <SignedIn>
        <div className="flex  flex-col gap-4 pt-6">
          <div className="flex items-center gap-2 w-full">
            <Label htmlFor="lang" className="cursor-pointer ">
              {data.arabic}
            </Label>
            <Switch
              id="lang"
              className="[&>span]:bg-primary-500 border-dark-200"
              onClick={() => {
                setLanguage(language === "en" ? "ar" : "en");
                setIsSidebarLayout(!SidebarLayout)
              }}
            />


          </div>
          <div className=" flex-between">
            <UserButton
              showName={true}
              appearance={{
                elements: {
                  userButtonBox: {
                    flexDirection: "row-reverse",
                    padding: "8px 0px",
                  },
                  userButtonTrigger: {
                    width: "100%",
                  },
                  rootBox: {
                    // backgroundColor: "#E8E9E9",
                    borderRadius: "4px",
                  },
                },
              }}
            />

            <button className=" p-2  hover:bg-[#E8E8E3] rounded-full cursor-pointer  transition-all  ease-in-out">

              {/* <TbLogout color="red" size={20} /> */}
              {/* <SignOutButton /> */}
              <SignOutButton>
                <TbLogout color="red" size={20} />
              </SignOutButton>
            </button>
          </div>
        </div>
      </SignedIn>


    </div>
  );
};

export default LeftSidebar;
