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
            setDisplayedText((prev) => prev + text[currentIndex]);
            currentIndex += 1;
            if (currentIndex === text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);

    useEffect(() => {
        const cursorIntervalId = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorIntervalId);
    }, []);

    return (
        <span className="whitespace-pre-line">
            {displayedText}
            <span className={`inline-block w-1 bg-black ${isCursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
        </span>
    );
};

export default Typewriter;
