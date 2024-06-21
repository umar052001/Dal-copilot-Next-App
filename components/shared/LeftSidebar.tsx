"use client";
import { SignedIn } from "@clerk/clerk-react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { MouseEventHandler} from "react";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { useAtom } from 'jotai'
import { SidebarLayoutAtom, LeftSidebarAtom, SliderOpenAtom } from '@/context/jotaiContext/atom'
import { RxCross2 } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import Leftsidebarlinks from "@/components/ui/left-sidebar-links";
import LeftSidebarCollaps from "./LeftSidebarCollaps";



const LeftSidebar = () => {
  const { language, setLanguage } = useLanguage();
  const data = determineDictionary(language);
  const [LeftSidebarMobileOpen, setIsLeftSidebarMobileOpen] = useAtom(LeftSidebarAtom);
  const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);
  const [IsSliderOpen, setIsSliderOpen] = useAtom(SliderOpenAtom);

  const handleClickleftSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsLeftSidebarMobileOpen(!LeftSidebarMobileOpen)
  };
  const handleClickSlider: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = () => {
    setIsSliderOpen(!IsSliderOpen)
  };


  return (

    IsSliderOpen ?

      <div className={`${SidebarLayout && 'arabic-font'}   min-h-screen bg-[#F3F3EE] flex justify-between  flex-col p-6    `}>
        <div className="flex flex-col gap-5  items-center    ">
          <div className=" flex   justify-between items-start  w-full  ">
            <div className="lg:hidden   border rounded-full p-2" onClick={handleClickleftSidebar}>
              <RxCross2 size={20} stroke-width={0.2} />
            </div>
            <div className="flex xl:flex-row  flex-col-reverse   justify-center items-center gap-7">

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
                onClick={handleClickSlider}
              />
            </div>
          </div>

          <Leftsidebarlinks data={data} />

        </div>
        <SignedIn>

          <div className="flex  flex-col gap-4 pt-6">
            <div className="flex items-center gap-2 w-full">
              <Label onClick={() => {
                setLanguage(language === "en" ? "ar" : "en");
                setIsSidebarLayout(!SidebarLayout)
              }} id="lang" htmlFor="lang" className="cursor-pointer arabic-font">
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
              <button className={` rounded-md border bg-red-200 border-red-200 p-2  hover:bg-red-300 cursor-pointer  transition-all  ease-in-out`}>
                <SignOutButton>
                  <TbLogout color="red" size={20} />
                </SignOutButton>
              </button>
            </div>
          </div>
        </SignedIn>


      </div >
      : <LeftSidebarCollaps />




  );
};

export default LeftSidebar;
