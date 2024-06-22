import React, { useEffect, useState } from 'react';
import MarkdownToHtml from './markdownToHtml';
import '@/styles/markdown.css';

interface MarkdownConversionProps {
    markdownContent: string;
    speed?: number;
}

const MarkdownConversion: React.FC<MarkdownConversionProps> = ({ markdownContent, speed = 50 }) => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [displayedContent, setDisplayedContent] = useState<string>(''); // This will be used to gradually display the content
    const [showCursor, setShowCursor] = useState<boolean>(true);

    useEffect(() => {
        const convertMarkdown = async () => {
            const html = await MarkdownToHtml(markdownContent);
            setHtmlContent(html);
        };
        convertMarkdown();
    }, [markdownContent]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // Function to simulate typing effect
        const typeText = () => {
            let currentCharIndex = 0;
            const totalChars = htmlContent.length;
            interval = setInterval(() => {
                if (currentCharIndex <= totalChars) {
                    setDisplayedContent(htmlContent.slice(0, currentCharIndex));
                    currentCharIndex++;
                } else {
                    clearInterval(interval!);
                    setShowCursor(false); // Hide cursor when typing animation completes
                }
            }, speed);
        };

        // Start typing effect when htmlContent changes
        if (htmlContent) {
            typeText();
        }

        // Clean up interval on component unmount or htmlContent change
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };

    }, [htmlContent, speed]);
// TODO-1: Add check function for whether the text is in arabic or english (tip: you can use a regex to check for arabic characters in the text and then set the direction of the text accordingly)
    return (
        <div>
            {/* TODO-2:  Change the direction of the text to rtl if its arabic and vice verca i.e ltr*/}
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: displayedContent }} />
            {/* {showCursor && <span className="flex-center  w-2 h-2 rounded-full ml-1 bg-black opacity-75 animate-blink"></span>} */}
        </div>
    );
};

export default MarkdownConversion;
