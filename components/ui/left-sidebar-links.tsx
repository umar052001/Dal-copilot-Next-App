import Image from "next/image";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MdOutlineErrorOutline } from "react-icons/md";
import { fileArrayAtom} from '@/context/jotaiContext/atom'
import { useAtom } from 'jotai'
import { AiTwotoneFilePdf } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useToast } from "./use-toast";

const Leftsidebarlinks = ( data:any) => {
    const [fileArray, setFileArray] = useAtom(fileArrayAtom);
    const {toast}=useToast();
    const handleDelete = async (originalIndex: number,filename:string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_GEN_API}/delete_pdf`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ file_name: filename }),
            })
            if (!response.ok) {
                throw new Error("Failed to delete file.");
              }
            const data = await response.json();
            if(data.success){
                toast({
                    variant:"primary",
                    description:"Successfully deleted the file"
                })
                const updatedFiles = fileArray.filter((_, index) => index !== originalIndex);
                setFileArray(updatedFiles);
            }
          } catch (error) {
            console.error(error);
          }
    };
    const reversedFiles = fileArray.slice().reverse();

    return (
        <div className={`space-y-5   justify-between items-start  w-full `} >
            <Link href="/" className={`  flex gap-2 w-full body-regular font-light`}>
                <Image src="/icons/home.svg" alt="search" width={16} height={16} />
                {data.data.home}
            </Link>
            <Link href="/" className={`  flex gap-2 w-full body-regular font-light`}>
                <Image
                    src="/icons/discover.svg"
                    alt="search"
                    width={16}
                    height={16}
                />
                {data.data.discover}
            </Link>
            <Link href="/" className={`  flex gap-2 w-full body-regular font-light`}>
                <Image src="/icons/library.svg" alt="search" width={16} height={16} />
                {data.data.library}

            </Link>
            <Accordion
                type="single"
                collapsible
                className="w-full body-regular overflow-x-hidden "
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className=" no-underline  py-0 pb-4 " >
                        <div className="flex-center gap-2  ">
                            <Image
                                src="/icons/knowledge-bases.svg"
                                alt="search"
                                width={18}
                                height={18}
                            />
                            <p className="mt-1  ">{data.data.knowledge_basis}</p>
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
                                        {data.data.documents}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="w-full  text-wrap flex flex-col gap-2 ">
                                    {fileArray?.length !== 0 ? (
                                        reversedFiles.slice(0, 3).map((fileObject, index) => {
                                            const originalIndex = fileArray.length - 1 - index;
                                            return (
                                                <div key={originalIndex}
                                                    className="flex relative items-center justify-between select-none text-xs gap-2 bg-[#E8E8E3] border border-[#E8E8E3] px-2 py-1 rounded-md"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <AiTwotoneFilePdf size={24} />
                                                        <div className="leading-4">
                                                            <p className="font-extrabold ">{fileObject?.filename}</p>
                                                            <div className="flex gap-1">
                                                                {/* <p>{fileObject.sizeInMb}</p> - */}
                                                                {/* <p className="text-gray-500">{fileObject.lastModifiedFormatted}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border transition-all p-1 absolute right-2 top-[10px] ease-in-out bg-[#d1d1cd] hover:bg-[#c7c7c4] cursor-pointer rounded-full " onClick={() => handleDelete(originalIndex,fileObject.filename)}>
                                                        <RxCross2 size={10} strokeWidth={0.3} />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className='flex-center gap-1 border text-sm p-2 rounded-md'>
                                            <p className="text-red-400 font-bold">{data.data.upload_pdf}</p>
                                            <MdOutlineErrorOutline size={20} className='opacity-50' color="red" />
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
                            {data.data.urls}
                        </div>
                        <div className="flex gap-2 border rounded-md cursor-pointer hover:bg-dark-100 p-2">
                            <Image
                                src="/icons/tables.svg"
                                alt="search"
                                width={16}
                                height={16}
                            />
                            {data.data.tables}
                        </div>
                        <div className="flex gap-2 border rounded-md cursor-pointer hover:bg-dark-100 p-2">
                            <Image
                                src="/icons/data.svg"
                                alt="search"
                                width={16}
                                height={16}
                            />
                            {data.data.data}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>


    )
}

export default Leftsidebarlinks