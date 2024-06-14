"use client";
import React, { useState } from "react";
import NewChatForm from "../form/NewChatForm";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { RiFileHistoryLine } from "react-icons/ri";
import { useSidebar } from '@/context/Sidebarcontext';

const NewChat = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<any>([
  ]);
  const [loading, setLoading] = useState<Boolean>(false);
  const data = determineDictionary(language);
  const suggestions = [
    data["how_many_stars_are_in_the_milky_Way?"],
    data["who_has_won_the_most_oscars_ever?"],
    data["how_to_purify_water_in_the_wild"],
    data["whats_the_meaning_of_al_dente?"],
  ];
  const {
    isLeftSidebarOpen,
    isRightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useSidebar();


  return (

    <main >
      <div className="px-3 py-2  lg:hidden flex-between ">
        <label className="hamburger" onClick={toggleLeftSidebar}>
          <input type="checkbox" />
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>

        <div>
          <RiFileHistoryLine size={30} />
        </div>
      </div>
      <div className=" lg:hidden  flex-center mt-10">

        <Image
          src="/LogoMark&Type.svg"
          className="mb-4"
          alt="search"
          width={128}
          height={56}
        />
      </div>

      <div className="md:px-10 px-5  pt-20 pb-4 flex items-center gap-8 order-2 flex-col  md:w-3/4 m-auto justify-center lg:mt-32">
        {(messages.length === 0 && !loading) && (
          <h1 className=" text-center font-extrabold h1-bold ">{data.where_knowledge_begins}</h1>
        )}
        <div className={`w-full flex flex-col ${(messages.length > 0 || loading) ? "justify-between h-full" : ""} `}>
          {
            (messages.length > 0 || loading) &&
            <ScrollArea className="flex flex-col w-full h-[65vh] ">
              {messages.map((message: any) => {
                return (
                  <div key={message.question} className="w-full flex flex-col ">
                    <p className="bg-dark-300 w-fit max-w-full  px-4 py-2 rounded-2xl text-wrap my-2">
                      {message.question}
                    </p>
                    <p className="self-end bg-dark-100 w-fit max-w-full  px-4 py-2 rounded-2xl text-wrap my-2">
                      {message.answer}
                    </p>
                  </div>
                );
              })}
              {
                loading && (
                  <div className="w-full flex flex-col">
                    <Skeleton className="bg-dark-300 w-[200px] h-8 rounded-2xl my-2" />
                    <Skeleton className="bg-dark-100 w-[200px] h-8 rounded-2xl my-2 self-end" />
                  </div>
                )
              }
            </ScrollArea>
          }
          <NewChatForm setLoading={setLoading} setMessages={setMessages} />
        </div>
        {(messages.length === 0 && !loading) && (
          <div className="flex gap-2  md:w-11/12 m-auto flex-wrap items-center font-light body-regular">
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