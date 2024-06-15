"use client";
import React, { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { useToast } from "../ui/use-toast";
import { useSidebar } from '@/context/Sidebarcontext';
import { AiTwotoneFilePdf } from "react-icons/ai";
import { useAtom } from 'jotai'
import { fileObjectAtom, fileArrayAtom } from '@/context/atom'
import messege from "@/data/messege.json";



const formSchema = z.object({
  prompt: z.string().min(2),
  pro: z.boolean(),
});
interface FileProps {
  name: string;
  lastModified: number;
  size: number;
}
const NewChatForm = ({ setMessages, setLoading }: any) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isFileUploading, setIsFileUploading] = useState<Boolean>(false);

  const [fileObject, setFileObject] = useAtom(fileObjectAtom);
  const [fileArray, setFileArray] = useAtom(fileArrayAtom);


  const data = determineDictionary(language);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      pro: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isFileUploading) {
      toast({
        title: "File",
        description: "Wait for file to upload pls...",
        variant: "primary",
      });
      return;
    }
    const { prompt, pro } = values;
    form.reset();
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    setLoading(true);



    const newMessage = {
      question: prompt,
      answer: messege.answer,
    };
    setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    setLoading(false);


    if (fileInput && fileInput?.files) {
      const file = fileInput?.files[0];
      if (file === undefined) {
        const formData = new FormData();
        formData.append("query", prompt);
        fetch(`${process.env.NEXT_PUBLIC_GEN_API}/ask_llm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: prompt,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const newMessage = {
              question: prompt,
              answer: data.response.answer.text,
            };
            setMessages((prevMessages: any) => [...prevMessages, newMessage]);
            setLoading(false);
          })
          .catch((error) => console.error(error));
        return;
      }
      fetch(`${process.env.NEXT_PUBLIC_GEN_API}/ask_pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: prompt,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const newMessage = {
            question: prompt,
            answer: data.answer,
          };
          setMessages((prevMessages: any) => [...prevMessages, newMessage]);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }

  const {
    PDFupload, setPDFupload
  } = useSidebar();


  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];

      if (file?.type === 'application/pdf') {


        const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        const sizeInMb = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
        const lastModifiedDate = new Date(file.lastModified);
        const lastModifiedFormatted = `${lastModifiedDate.getDate()} ${lastModifiedDate.toLocaleString('default', { month: 'long' })}, ${lastModifiedDate.getFullYear()}`;
        const newFileObject = {
          name: fileNameWithoutExtension,
          sizeInMb: sizeInMb,
          lastModifiedFormatted: lastModifiedFormatted
        };
        setFileObject({
          name: fileNameWithoutExtension,
          sizeInMb: sizeInMb,
          lastModifiedFormatted: lastModifiedFormatted
        });
       
        setFileArray((prevFileArray) => [...prevFileArray, newFileObject]);
        
        setPDFupload(true);
        setIsFileUploading(true);
        const formData = new FormData();
        fetch(`${process.env.NEXT_PUBLIC_GEN_API}/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setIsFileUploading(false);
            toast({
              title: "File",
              description: "File Uploaded Successfully!",
              variant: "primary",
            });
            console.log(data);
          })
          .catch((error) => console.error(error));


      } else {
        setPDFupload(false);
        toast({
          title: "File Error",
          description: "Only PDF files are allowed.",
          variant: "destructive",
        });
      }


    }
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex lg:gap-4 gap-3 w-full flex-col border  border-dark-200 p-2  border-solid"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder={data.ask_anything}
                  className={`border-0  ${language == "ar"
                    ? "text-end px-1 rtl"
                    : "text-start px-5 ltr"
                    }`}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="flex-center">
            <input
              type="file"
              onChange={(e) => handleImageUpload(e)}
              className="file-input__input"
              id="file-input"
            />
            <div className=" flex-center">


              <label
                className="file-input__label flex gap-2 !text-dark-300 font-light"
              >
                <Image
                  src="/icons/focus.svg"
                  alt="search"
                  width={14}
                  height={14}
                />
                Focus
              </label>
              <label
                className="file-input__label flex gap-2 !text-dark-400 font-light"
                htmlFor="file-input"
              >
                <Image
                  src="/icons/attach.svg"
                  alt="search"
                  width={14}
                  height={14}
                />
                Attach
              </label>

            </div>
          </div>
          <div className=" flex-center  ">
            {/* <section>
              {
                fileObject?.name && <div className=" flex-center select-none text-xs gap-2 bg-green-100 border border-green-300 px-2 py-1  rounded-lg">
                  <AiTwotoneFilePdf size={24} />
                  <div className=" leading-4">
                    <p className=" font-extrabold">{fileObject?.name}</p>
                    <div className="flex-center gap-1">
                      <p>{fileObject?.sizeInMb}</p> -
                      <p className=" text-gray-500">{fileObject?.lastModifiedFormatted}</p>
                    </div>
                  </div>

                </div>
              }
            </section> */}

            <FormField
              control={form.control}
              name="pro"
              render={({ field }) => (
                <FormItem className="flex-center space-y-0 gap-2">
                  <FormControl>
                    <Switch
                      className="[&>span]:bg-primary-500 border-dark-200"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                  <FormLabel className="text-base">Pro</FormLabel>
                </FormItem>
              )}
            />
          </div>

        </div>
        <section>
          {
            fileObject?.name && <div className=" flex-center select-none text-xs gap-2 bg-green-100 border border-green-200 px-2 py-1  rounded-md">
              <AiTwotoneFilePdf size={24} />

              <div className=" leading-4">
                <p className=" font-extrabold">{fileObject?.name}</p>
                <div className="flex gap-1">
                  <p>{fileObject?.sizeInMb}</p> -
                  <p className=" text-gray-500">{fileObject?.lastModifiedFormatted}</p>
                </div>
              </div>
            </div>
          }
        </section>
      </form>
    </Form>
  );
};

export default NewChatForm;
