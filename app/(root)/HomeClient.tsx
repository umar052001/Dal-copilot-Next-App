"use client";
import LeftSidebar from "@/components/shared/LeftSidebar";
import NewChat from "@/components/shared/NewChat";
import RightSideBar from "@/components/shared/RightSideBar";
import { useSidebar } from '@/context/Sidebarcontext';

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
    // console.log("HomeClient ~ isLeftSidebarOpen:", isLeftSidebarOpen)
    return (
        <main className="grid grid-cols-6">
            <div className={`lg:col-span-1 col-span-0 lg:block hidden`} >
                <LeftSidebar />
            </div>
            <div className={` lg:col-span-4 col-span-6`} >
                <NewChat />
            </div>
            <div className="lg:col-span-1 col-span-0 lg:block hidden">
                <RightSideBar />
            </div>
        </main>
    );
}
