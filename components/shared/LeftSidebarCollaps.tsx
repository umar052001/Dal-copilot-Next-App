"use client";
import { SignedIn } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/nextjs";
import { MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { useAtom } from 'jotai'
import { SidebarLayoutAtom, SliderOpenAtom } from '@/context/jotaiContext/atom'
import { TbLogout } from "react-icons/tb";

const LeftSidebarCollaps = () => {
    const { language, setLanguage } = useLanguage();
    const data = determineDictionary(language);
    const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);
    const [IsSliderOpen, setIsSliderOpen] = useAtom(SliderOpenAtom);


    const handleClickSlider: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = () => {
        setIsSliderOpen(!IsSliderOpen)
    };


    return (
        <div className={`${SidebarLayout && 'arabic-font'}   min-h-screen bg-[#F3F3EE] flex justify-between  flex-col p-6    `}>
            <div className=" flex-center">
                <Image
                    role="button"
                    src="https://www.dal-demo.live/static/media/icon-open-sidebar.807317206e49601b00213a5d865ca76b.svg"
                    alt="icon"
                    width={40}
                    height={40}
                    className="object-cover lg:block hidden"
                    onClick={handleClickSlider}
                />

            </div>
            <div className="flex flex-col gap-5  items-center    ">
                <div className=" flex   justify-between items-start  w-full  ">
                    <div className="flex xl:flex-row  flex-col-reverse   justify-center items-center gap-7">
                        <Image
                            src="/LogoMark&Type.svg"
                            className="mb-4"
                            alt="search"
                            width={88}
                            height={86}
                        />

                    </div>
                </div>
                <div className={`space-y-3  justify-between items-start  w-full overflow-y-auto  min-h-[53vh] max-h-screen`} >
                    <Link href="/" className={` bg-[#E8E8E3] flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image src="/icons/home.svg" alt="search" width={16} height={16} />
                    </Link>
                    <Link href="/" className={` bg-[#E8E8E3] flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image
                            src="/icons/discover.svg"
                            alt="search"
                            width={16}
                            height={16}
                        />
                    </Link>
                    <Link href="/" className={` bg-[#E8E8E3] flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image src="/icons/library.svg" alt="search" width={16} height={16} />

                    </Link>

                    <button onClick={handleClickSlider} className={`bg-[#E8E8E3]  flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image
                            src="/icons/knowledge-bases.svg"
                            alt="search"
                            width={18}
                            height={18}
                        />
                    </button>
                </div>
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
                        <button className={`bg-[#E8E8E3]  flex-center  rounded-md w-full   p-2  hover:bg-red-300 border-red-200  cursor-pointer  transition-all  ease-in-out`}>
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

export default LeftSidebarCollaps;
