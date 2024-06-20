import { atom } from "jotai";

type FileObject = {
    name: string;
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
export const MessagesAtom = atom<Message[]>([]);
