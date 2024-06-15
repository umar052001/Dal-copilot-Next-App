import { atom } from "jotai";

// Define the type for the file object
type FileObject = {
    name: string;
    sizeInMb: string;
    lastModifiedFormatted: string;
};

// Define individual atoms for different states
export const todoAtom = atom(0);
export const SidebarAtom = atom(false);

// Define a file object atom with the required structure
export const fileObjectAtom = atom<FileObject>({
    name: '',
    sizeInMb: '',
    lastModifiedFormatted: ''
});


// Define an atom to store an array of file objects
export const fileArrayAtom = atom<FileObject[]>([]);
