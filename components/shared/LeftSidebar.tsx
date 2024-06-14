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

const LeftSidebar = () => {
  const { language, setLanguage } = useLanguage();
  const data = determineDictionary(language);

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
              <div className="flex gap-2 border border-solid border-dark-100 cursor-pointer hover:bg-dark-100 p-2">
                <Image
                  src="/icons/docs.svg"
                  alt="search"
                  width={15}
                  height={15}
                />
                {data.documents}
              </div>
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
