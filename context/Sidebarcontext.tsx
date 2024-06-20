"use client";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface SidebarContextProps {
    isLeftSidebarMobileOpen: boolean;
    isRightSidebarMobileOpen: boolean;
    PDFupload: boolean;
    setPDFupload: Dispatch<SetStateAction<boolean>>;
    toggleLeftSidebar: () => void;
    toggleRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLeftSidebarMobileOpen, setIsLeftSidebarMobileOpen] = useState(false);
    const [isRightSidebarMobileOpen, setIsRightSidebarMobileOpen] = useState(false);
    const [PDFupload, setPDFupload] = useState(false);

    const toggleLeftSidebar = () => {
        setIsLeftSidebarMobileOpen(!isLeftSidebarMobileOpen);

    };

    const toggleRightSidebar = () => {
        setIsRightSidebarMobileOpen(!isRightSidebarMobileOpen);
    };




    return (
        <SidebarContext.Provider
            value={{
                isLeftSidebarMobileOpen,
                isRightSidebarMobileOpen,
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
