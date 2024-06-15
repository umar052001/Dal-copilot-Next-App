"use client";
import LeftSidebar from "@/components/shared/LeftSidebar";
import NewChat from "@/components/shared/NewChat";
import RightSideBar from "@/components/shared/RightSideBar";
import { useSidebar } from '@/context/Sidebarcontext';
import { useAtom } from 'jotai'
import { todoAtom, SidebarAtom, RightSidebarAtom, SidebarLayoutAtom } from '@/context/atom'

export default function HomeClient() {

    // const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    // const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

    // const toggleLeftSidebar = () => {
    //     setIsLeftSidebarOpen(!isLeftSidebarOpen);
    // };

    // const toggleRightSidebar = () => {
    //     setIsRightSidebarOpen(!isRightSidebarOpen);
    // };
    // <div className={`fixed inset-y-0 left-0 z-50 lg:col-span-1 col-span-0 ${isLeftSidebarOpen ? 'block' : 'hidden'} md:block`} >
    const {
        isLeftSidebarOpen,
        isRightSidebarOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
    } = useSidebar();

    const [LeftSidebarOpen, setIsLeftSidebarOpen] = useAtom(SidebarAtom);
    const [RightSidebarOpen, setIsRightSidebarOpen] = useAtom(RightSidebarAtom);
    const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);

    const mobileclassses = 'col-span-6 fixed w-full z-10 overflow-y-scroll';
    const Desktopclassses = 'lg:col-span-1 col-span-0 lg:block hidden';



    return (
        <main className="grid  grid-cols-6">
            {!SidebarLayout ? (
                <>
                    <div className={`${LeftSidebarOpen ? mobileclassses : Desktopclassses}`}>
                        <LeftSidebar />
                    </div>
                    <div className={`lg:col-span-4 col-span-6 `}>
                        <NewChat />
                    </div>
                    <div className={`${RightSidebarOpen ? mobileclassses : Desktopclassses}`}>
                        <RightSideBar />
                    </div>
                </>
            ) : (
                <>
                    <div className={`${RightSidebarOpen ? mobileclassses : Desktopclassses}`}>
                        <RightSideBar />
                    </div>
                    <div className={`lg:col-span-4 col-span-6`}>
                        <NewChat />
                    </div>
                    <div className={`${LeftSidebarOpen ? mobileclassses : Desktopclassses}`}>
                        <LeftSidebar />
                    </div>
                </>
            )}
        </main>
    );
}
