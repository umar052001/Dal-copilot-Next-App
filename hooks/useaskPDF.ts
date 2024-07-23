import { useAtom } from "jotai";
import {
  Ask_PDFMessagesAtom,
  Ask_PDFLoadingAtom,
  PdfMsgNoAtom,
  newPdfMessageAtom,
} from "@/context/jotaiContext/atom";

export const useAskPDF = () => {
  const [ask_pdfmessages, setAsk_pdfMessages] = useAtom(Ask_PDFMessagesAtom);
  const [ask_pdfloading, setAsk_pdfLoading] = useAtom(Ask_PDFLoadingAtom);
  const [totalMessages, setTotalMessages] = useAtom(PdfMsgNoAtom);
  const [newMessage, setNewMessage] = useAtom(newPdfMessageAtom);

  const fetchAskPDFResponse = async (prompt: string) => {
    setAsk_pdfLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GEN_API}/ask_pdf`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: prompt }),
        }
      );
      const reader=response.body?.getReader();
      const decoder = new TextDecoder();
      setTotalMessages((prev)=>prev+1)
      setNewMessage({question: prompt, answer:""})
      const readStream=()=> {
        reader?.read().then(({ done, value }:any) => {
          if (done) {
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          // console.log(chunk)
          // const parsedChunk=JSON.parse(chunk);
          // console.log(parsedChunk)
          setNewMessage((prev)=>({question:prompt,answer:prev.answer+chunk}));
          setAsk_pdfLoading(false);
          // if(parsedChunk.answer){
          //   setNewMessage((prev)=>({question:prompt,answer:prev.answer+parsedChunk.answer}));
          //   setAsk_pdfLoading(false);
          //     }

          // try {
          //   const parsedChunk=await JSON.parse(chunk);
          //   if(parsedChunk.answer){
          //     setNewMessage((prev)=>({question:prompt,answer:prev.answer+parsedChunk.answer}));
          //     setAsk_pdfLoading(false);
          //   }
          // } catch (error) {
          //   const splittedChunks=chunk.split("}");
          //   let jsonStrings=splittedChunks.map((c,i)=> i===splittedChunks.length-1?c:c+'}')
          //   jsonStrings=jsonStrings.filter(j=>j!=="" && j.includes("{\"answer"))
          //   const answerObjs=jsonStrings.map(jsonStr=> JSON.parse(jsonStr))
          //   let answers=answerObjs.filter(a=>a.answer!==undefined)
          //   answers=answers.map(a=>a.answer)
          //   const answer=answers.join("")
          //   setNewMessage((prev)=>({question:prompt,answer:prev.answer+answer}));
          //   setAsk_pdfLoading(false);
          // }
          readStream();
        });
      }
      readStream();
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchAskPDFResponse };
};
