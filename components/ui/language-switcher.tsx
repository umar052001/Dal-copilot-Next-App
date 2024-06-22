import { useState, useCallback } from 'react';

const useLanguageSwitcher = () => {
    const [language, setLanguage] = useState('en');
    const [isSidebarLayout, setIsSidebarLayout] = useState(false);

    const toggleLanguageAndLayout = useCallback(() => {
        const newLanguage = language === 'en' ? 'ar' : 'en';
        setLanguage(newLanguage);
        setIsSidebarLayout(!isSidebarLayout);
        const html = document.documentElement;
        html.setAttribute('dir', newLanguage === 'ar' ? 'rtl' : 'ltr');
    }, [language, isSidebarLayout]);

    return { language, isSidebarLayout, toggleLanguageAndLayout };
};

export default useLanguageSwitcher;
