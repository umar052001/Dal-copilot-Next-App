import { atom } from "jotai";

export const todoAtom = atom(0);
export const SidebarAtom = atom(false);
export const fileObjectAtom = atom<{ name: string, sizeInMb: string, lastModifiedFormatted: string }>({
    name: '',
    sizeInMb: '',
    lastModifiedFormatted: ''
});
// export const fileObjectAtom = atom<{ name: string, sizeInMb: string, lastModifiedFormatted: string }[]>([]);
