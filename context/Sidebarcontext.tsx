"use client";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface SidebarContextProps {
    isLeftSidebarOpen: boolean;
    isRightSidebarOpen: boolean;
    PDFupload: boolean;
    setPDFupload: Dispatch<SetStateAction<boolean>>;
    toggleLeftSidebar: () => void;
    toggleRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [PDFupload, setPDFupload] = useState(false);

    const toggleLeftSidebar = () => {
        setIsLeftSidebarOpen(!isLeftSidebarOpen);

    };

    const toggleRightSidebar = () => {
        setIsRightSidebarOpen(!isRightSidebarOpen);
    };



    
    return (
        <SidebarContext.Provider
            value={{
                isLeftSidebarOpen,
                isRightSidebarOpen,
                toggleLeftSidebar,
                toggleRightSidebar,
                PDFupload,
                setPDFupload,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = (): SidebarContextProps => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
