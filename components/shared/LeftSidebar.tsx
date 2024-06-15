"use client";
import { SignedIn } from "@clerk/clerk-react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
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
import { fileObjectAtom, fileArrayAtom } from '@/context/atom'
import { AiTwotoneFilePdf } from "react-icons/ai";
import { MdSmsFailed } from "react-icons/md";
const LeftSidebar = () => {
  const { language, setLanguage } = useLanguage();
  const data = determineDictionary(language);
  const [fileObject] = useAtom(fileObjectAtom);
  const [fileArray, setFileArray] = useAtom(fileArrayAtom);

  return (
    <div
      className={`${language === "en" ? "order-1" : "order-3"
        }  bg-[#F3F3EE]  min-h-screen flex justify-between  flex-col p-6 `}
    >
      <div className="flex flex-col gap-5  items-center">

        <div className=" xl:flex xl:flex-row  flex   flex-col-reverse  justify-between items-center gap-7 ">
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
            className="object-cover "
          />
        </div>

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
          className="w-full body-regular  "
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
                <p className="mt-1">{data.knowledge_basis}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="w-full text-wrap flex flex-col gap-2">
              {/* <div className="flex gap-2 border border-solid border-dark-100 cursor-pointer hover:bg-dark-100 p-2">
                <Image
                  src="/icons/docs.svg"
                  alt="search"
                  width={15}
                  height={15}
                />
                {data.documents}
              </div> */}



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
                  <AccordionContent className="w-full text-wrap flex flex-col gap-2">
                    {fileArray?.length !== 0 ? (
                      fileArray.map((fileObject, index) => (
                        <div key={index} className="flex-center select-none text-xs gap-2 bg-green-100 border border-green-200 px-2 py-1 rounded-md">
                          <AiTwotoneFilePdf size={24} />
                          <div className="leading-4">
                            <p className="font-extrabold">{fileObject.name}</p>
                            <div className="flex gap-1">
                              <p>{fileObject.sizeInMb}</p> -
                              <p className="text-gray-500">{fileObject.lastModifiedFormatted}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2 text-red-500 cursor-pointer p-2">
                        <MdSmsFailed /> No Document is uploaded !!
                      </div>
                    )}

                  </AccordionContent>
                </AccordionItem>
              </Accordion>


















              <div className="flex gap-2 border border-solid border-dark-100 cursor-pointer hover:bg-dark-100 p-2">
                <Image
                  src="/icons/urls.svg"
                  alt="search"
                  width={20}
                  height={20}
                />
                {data.urls}
              </div>
              <div className="flex gap-2 border border-solid border-dark-100 cursor-pointer hover:bg-dark-100 p-2">
                <Image
                  src="/icons/tables.svg"
                  alt="search"
                  width={16}
                  height={16}
                />
                {data.tables}
              </div>
              <div className="flex gap-2 border border-solid border-dark-100 cursor-pointer hover:bg-dark-100 p-2">
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
      <SignedIn>
        <div className="flex  flex-col gap-4 ">
          <div className="flex items-center gap-2 w-full">
            <Label htmlFor="lang" className="cursor-pointer ">
              {data.arabic}
            </Label>
            <Switch
              id="lang"
              className="[&>span]:bg-primary-500 border-dark-200"
              onClick={() => {
                setLanguage(language === "en" ? "ar" : "en");
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

            <button>

              <Image
                src="/icons/logout.svg"
                alt="search"
                width={16}
                height={16}
              />

            </button>
          </div>
        </div>
      </SignedIn>
    </div>
  );
};

export default LeftSidebar;
