"use client";
import LeftSidebar from "@/components/shared/LeftSidebar";
import NewChat from "@/components/shared/NewChat";
import RightSideBar from "@/components/shared/RightSideBar";
import { useAtom } from 'jotai'
import {  LeftSidebarAtom, RightSidebarAtom, SidebarLayoutAtom } from '@/context/atom'

export default function HomeClient() {


    const [LeftSidebarOpen, setIsLeftSidebarOpen] = useAtom(LeftSidebarAtom);
    const [RightSidebarOpen, setIsRightSidebarOpen] = useAtom(RightSidebarAtom);
    const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);

    const mobileclasses = 'col-span-6 absolute w-full   z-10  ';
    const Desktopclasses = 'lg:col-span-1  col-span-0 lg:block hidden min-h-screen  bg-[#F3F3EE]';



    return (
        <main className="grid  grid-cols-6">
            {!SidebarLayout ? (
                <>
                    <div className={`${LeftSidebarOpen ? mobileclasses : Desktopclasses}`}>
                        <LeftSidebar />
                    </div>
                    <div className={`lg:col-span-4  col-span-6   `}>
                        <NewChat />
                    </div>
                    <div className={`${RightSidebarOpen ? mobileclasses : Desktopclasses}`}>
                        <RightSideBar />
                    </div>
                </>
            ) : (
                <>
                    <div className={`${RightSidebarOpen ? mobileclasses : Desktopclasses}`}>
                        <RightSideBar />
                    </div>
                    <div className={`lg:col-span-4 col-span-6`}>
                        <NewChat />
                    </div>
                    <div className={`${LeftSidebarOpen ? mobileclasses : Desktopclasses}`}>
                        <LeftSidebar />
                    </div>
                </>
            )}
        </main>
    );
}
