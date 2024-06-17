import { atom } from "jotai";

type FileObject = {
    name: string;
    sizeInMb: string;
    lastModifiedFormatted: string;
};

// export const fileObjectAtom = atom<FileObject>({
//     name: '',
//     sizeInMb: '',
//     lastModifiedFormatted: ''
// });
export const LeftSidebarAtom = atom(false);
export const RightSidebarAtom = atom(false);
export const SidebarLayoutAtom = atom(false);
export const PDFuploadAtom = atom(false);
export const ShowPDFAtom = atom(true);
export const fileArrayAtom = atom<FileObject[]>([]);
