import { useAtom } from "jotai";
import { AIMessagesAtom, AILoadingAtom, newMessageAtom, isLoadingFinishedAtom, AIMsgNoAtom } from "@/context/jotaiContext/atom";

export const useAI = () => {
  const [AImessages, setAIMessages] = useAtom(AIMessagesAtom);
  const [AIloading, setAILoading] = useAtom(AILoadingAtom);
  const [newMessage, setNewMessage] = useAtom(newMessageAtom);
  const [totalAIMessages, setTotalAIMessages] = useAtom(AIMsgNoAtom);


  const fetchAIResponse = async (prompt: string) => {
    setAILoading(true);
    // setIsFinished(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GEN_API}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: prompt }),
      })
      const reader=response.body?.getReader();
      const decoder = new TextDecoder();
      setTotalAIMessages((prev)=>prev+1)
      setNewMessage({question: prompt, answer:""})
      const readStream=()=> {
        reader?.read().then(({ done, value }) => {
          if (done) {
            // setAIMessages((prevMessages) => [...prevMessages, newMessage]);
            // setIsFinished(true);
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          setNewMessage((prev)=>({question:prompt,answer:prev.answer+chunk}));
          setAILoading(false);
          readStream();
        });
      }
      readStream();
    } catch (error) {
      console.error(error);
    }
  };

  return {  fetchAIResponse };
};
