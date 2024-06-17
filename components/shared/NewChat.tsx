"use client";
import React, { useState, MouseEventHandler } from "react";
import NewChatForm from "../form/NewChatForm";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { RiFileHistoryLine } from "react-icons/ri";
import { useToast } from "../ui/use-toast";
import { useAtom } from 'jotai'
import { LeftSidebarAtom, MessagesAtom, ChangeToggleAtom,  RightSidebarAtom, SidebarLayoutAtom, PDFuploadAtom, ShowPDFAtom } from '@/context/atom'
import Typewriter from '@/components/ui/typeWriter'
import MarkdownPreview from "@uiw/react-markdown-preview";
import Markdown from 'react-markdown'
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiMenuAlt4 } from "react-icons/hi";


const NewChat = () => {

  const { toast } = useToast();
  const { language } = useLanguage();
  const data = determineDictionary(language);
  const [checkPDFUpload, setcheckPDFUpload] = useAtom(PDFuploadAtom);
  const [LeftSidebarOpen, setIsLeftSidebarOpen] = useAtom(LeftSidebarAtom);
  const [RightSidebarOpen, setIsRightSidebarOpen] = useAtom(RightSidebarAtom);
  const [ChangeToggle, setChangeToggle] = useAtom(ChangeToggleAtom);
  const [Showpdf, setShowpdf] = useAtom(ShowPDFAtom);
  const [SidebarLayout] = useAtom(SidebarLayoutAtom);
  const [loading, setLoading] = useState<Boolean>(false);
  const [messages, setMessages] = useAtom(MessagesAtom);

  const suggestions = [
    data["how_many_stars_are_in_the_milky_Way?"],
    data["who_has_won_the_most_oscars_ever?"],
    data["how_to_purify_water_in_the_wild"],
    data["whats_the_meaning_of_al_dente?"],
  ];

  const handleLeftToggle = () => {
    setChangeToggle(true)
    if (checkPDFUpload) {
      setShowpdf(false)
    }

  };
  const handleRightToggle = () => {
    if (ChangeToggle && checkPDFUpload) {
      setChangeToggle(false);
      setShowpdf(true)
    } else {
      toast({
        title: "Instruction",
        description: "Please Attach PDF File First !!",
        variant: "destructive",
      });
    }
  };

  const handleClickleftSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsLeftSidebarOpen(!LeftSidebarOpen)
  };

  const handleClickRightSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsRightSidebarOpen(!RightSidebarOpen)
  };





  return (
    <main className={`${SidebarLayout && 'arabic-font'}`} >


      <div className="pt-6 px-6 pb-3 lg:flex-center flex-between ">
        <div className="lg:hidden bg-slate-100 border rounded-full p-2" onClick={handleClickleftSidebar}>
          <HiMenuAlt4 size={20} stroke-width={0.1} />
        </div>

        <div >
          <p className="text-center  text-gray-500 lg:mt-3 text-sm   select-none ">
            <span className={`font-extrabold    gap-5 bg-slate-100 border px-[5px] pt-[12px] pb-[13px] rounded-full `}>
              <span
                className={` cursor-pointer  px-2 py-[8px] ${ChangeToggle ? "text-gray-900 bg-slate-200 md:border rounded-full px-2 py-[8px]" : "text-gray-500"}`}
                onClick={handleLeftToggle}
              >
                Chat With AI
              </span>
              <span
                className={`cursor-pointer px-2 py-[8px] ${ChangeToggle ? "text-gray-500" : "text-gray-900 bg-slate-200 md:border rounded-full px-2 py-[8px]"}`}
                onClick={handleRightToggle}
              >
                Ask PDF

              </span>
            </span>
          </p>
        </div>
        <div className="lg:hidden bg-slate-100 border rounded-full p-2" onClick={handleClickRightSidebar}>
          <RiFileHistoryLine size={20} />
        </div>
      </div>


      <div className="md:px-10 px-5         flex items-center gap-8 order-2 flex-col  md:w-3/4 m-auto justify-center  ">
        {(messages.length === 0 && !loading) && (
          <h1 className={`text-center font-extrabold h1-bold lg:mt-[7.6rem] mt-[2.2rem]  } `}>
            {data.where_knowledge_begins}
          </h1>
        )}
        <div className={`w-full  flex flex-col  ${(messages.length > 0 || loading) ? "justify-between h-full " : ""} `}>
          {
            (messages.length > 0 || loading) &&
            <ScrollArea className="flex flex-col w-full  my-2  lg:h-[64vh] h-[59vh] rounded-3xl " >
              {messages.map((message: any) => {
                return (
                  <div key={message.question} className="w-full flex flex-col  space-y-3   ">
                    <p className="bg-dark-500  self-end text-white w-fit max-w-full  px-4 py-2 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl text-wrap my-3">
                      {message.question}

                    </p>
                    <p className="bg-dark-100 w-fit max-w-full px-4 py-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl text-wrap ">
                      <Typewriter text={message.answer} />
                      {/* {message.answer} */}
                      {/* <Markdown>{message.answer}</Markdown> */}
                    </p>

                  </div>
                );
              })}
              {
                loading && (
                  <div className="w-full flex flex-col">
                    <Skeleton className="bg-dark-300 w-[200px] h-8 rounded-2xl my-2 self-end" />
                    <Skeleton className="bg-dark-100 w-[300px] h-8 rounded-2xl my-2 " />
                  </div>
                )
              }
            </ScrollArea>
          }
          <NewChatForm  data={data} setLoading={setLoading}  />
        </div>
        {(messages.length === 0 && !loading) && (
          <div className={`flex gap-2 ${SidebarLayout && 'text-xs'}  md:w-11/12 m-auto flex-wrap items-center font-light body-regular`}>
            <span>{data.try_pro}</span>
            {suggestions.map((suggestion) => (
              <button className="py-2 px-4 border border-dark-100 rounded-3xl"
                key={suggestion}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default NewChat;
