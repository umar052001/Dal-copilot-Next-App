import React, { useEffect, useState } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 20 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isCursorVisible, setCursorVisible] = useState(true);

    
    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText((prev) => prev + text[currentIndex]);
                currentIndex += 1;
            } else {
                clearInterval(intervalId);
                setCursorVisible(false)
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);


    return (
        <span className="whitespace-pre-line">
            {displayedText}
            {isCursorVisible && <span className={`inline-block w-2 h-2 rounded-full ml-1 bg-black opacity-75 `}></span>}
        </span>
    );
};

export default Typewriter;
