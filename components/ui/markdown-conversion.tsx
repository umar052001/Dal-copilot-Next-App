"use client"
import React, { useEffect, useState } from 'react';
import MarkdownToHtml from './markdownToHtml';
import '@/styles/markdown.css';

interface MarkdownConversionProps {
    markdownContent: string;
    speed?: number;
}

const MarkdownConversion: React.FC<MarkdownConversionProps> = ({ markdownContent, speed = 50 }) => {
    const [htmlContent, setHtmlContent] = useState<string>('');

    useEffect(() => {
        const convertMarkdown = async () => {
            const html = await MarkdownToHtml(markdownContent);
            setHtmlContent(html);
        };
        convertMarkdown();
    }, [markdownContent]);
    function containsArabic(text:string) {
        // Regular expression to match Arabic characters
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text);
      }
    // TODO-1: Add check function for whether the text is in arabic or english (tip: you can use a regex to check for arabic characters in the text and then set the direction of the text accordingly)
    return (
        <div>
            {/* TODO-2:  Change the direction of the text to rtl if its arabic and vice verca i.e ltr*/}
            <div className="markdown-body" style={containsArabic(markdownContent)?{direction:"rtl"}:{direction:"ltr"}} dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
        </div>
    );
};

export default MarkdownConversion;
