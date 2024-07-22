import { atom } from "jotai";

type FileObject = {
    filename: string;
    sizeInMb: string;
    lastModifiedFormatted: string;
};
type Message = {
    question: string;
    answer: string;
};

export const LeftSidebarAtom = atom(false);
export const RightSidebarAtom = atom(false);
export const SidebarLayoutAtom = atom(false);
export const PDFuploadAtom = atom(false);
export const ShowPDFAtom = atom(true);

export const ChangeToggleAtom = atom(true);
export const SliderOpenAtom = atom(true);
export const fileArrayAtom = atom<FileObject[]>([]);
export const AIMessagesAtom = atom<Message[]>([]);
export const AIMsgNoAtom = atom(-1);
export const PdfMsgNoAtom = atom(-1);
export const AILoadingAtom = atom(false);
export const newMessageAtom = atom({
    question:"",
    answer:""
});
export const newPdfMessageAtom = atom({
    question:"",
    answer:""
});
export const Ask_PDFMessagesAtom = atom<Message[]>([]);
export const Ask_PDFLoadingAtom = atom(false);
export const currentFileAtom = atom("");
export const isLoadingFinishedAtom = atom(true);