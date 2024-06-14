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

const formSchema = z.object({
  prompt: z.string().min(2),
  pro: z.boolean(),
});

const NewChatForm = ({ setMessages, setLoading }: any) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isFileUploading, setIsFileUploading] = useState<Boolean>(false);
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
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];

      if (file.type === 'application/pdf') {
        setIsFileUploading(true);
        const formData = new FormData();
        formData.append("file", file);
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
        className="flex gap-4 w-full flex-col border  border-dark-200 p-2 border-solid"
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
      </form>
    </Form>
  );
};

export default NewChatForm;
