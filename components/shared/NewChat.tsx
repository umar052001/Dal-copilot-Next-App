"use client";
import React, { useState } from "react";
import NewChatForm from "../form/NewChatForm";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

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
  return (

    <main>
      <div className="flex-center">

        <Image
          src="/LogoMark&Type.svg"
          className="mb-4"
          alt="search"
          width={128}
          height={56}
        />
      </div>

      <div className="px-10 bg-yellow-300 pt-20 pb-4 flex items-center gap-8 order-2 flex-col  md:w-3/4 m-auto justify-center mt-32">
        {(messages.length === 0 && !loading) && (
          <h1 className=" text-center font-extrabold md:h1-bold h2-bold">{data.where_knowledge_begins}</h1>
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
