"use client";
import LeftSidebar from "@/components/shared/LeftSidebar";
import NewChat from "@/components/shared/NewChat";
import RightSideBar from "@/components/shared/RightSideBar";
import { useAtom } from 'jotai'
import { LeftSidebarAtom, RightSidebarAtom, SidebarLayoutAtom, SliderOpenAtom } from '@/context/atom'

export default function HomeClient() {


    const [LeftSidebarOpen, setIsLeftSidebarOpen] = useAtom(LeftSidebarAtom);
    const [RightSidebarOpen, setIsRightSidebarOpen] = useAtom(RightSidebarAtom);
    const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);
    const [IsSliderOpen, setIsSliderOpen] = useAtom(SliderOpenAtom);

    const mobileclasses = 'col-span-6 absolute w-full   z-10  ';
    const Desktopclasses = '  col-span-0 lg:block hidden min-h-screen  bg-[#F3F3EE]';



    return (
        <main className={`grid   ${IsSliderOpen ? 'grid-cols-6' : 'grid-cols-12'} `}>
            {!SidebarLayout ? (
                <>
                    <div className={`${LeftSidebarOpen ? mobileclasses : `${Desktopclasses} lg:col-span-1 ` }`}>
                        <LeftSidebar />
                    </div>
                    <div className={` ${IsSliderOpen ? 'lg:col-span-4 col-span-6' : 'lg:col-span-9 col-span-9'}      `}>
                        <NewChat />
                    </div>
                    <div className={`${RightSidebarOpen ? mobileclasses : `${Desktopclasses} ${IsSliderOpen ? 'lg:col-span-1' : 'lg:col-span-2'}  `}`}>
                        <RightSideBar />
                    </div>
                </>
            ) : (
                <>
                        <div className={`${RightSidebarOpen ? mobileclasses : `${Desktopclasses} ${IsSliderOpen ? 'lg:col-span-1' : 'lg:col-span-2'}  `}`}>
                            <RightSideBar />
                        </div>
                        <div className={` ${IsSliderOpen ? 'lg:col-span-4 col-span-6' : 'lg:col-span-9 col-span-9'}      `}>
                            <NewChat />
                        </div>
                        <div className={`${LeftSidebarOpen ? mobileclasses : `${Desktopclasses} lg:col-span-1 `}`}>
                            <LeftSidebar />
                        </div>
                </>
            )}
        </main>
    );
}
