
import React, { useRef, useEffect } from 'react';

export default function IntroSection() {

    const textareaRef = useRef(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`; 
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.addEventListener('input', adjustHeight);
        return () => {
            textarea.removeEventListener('input', adjustHeight);
        };
    }, []);

    return (
        <>
            <div className="name">
                <input type="text" name="name" placeholder="Enter name" style={{ fontSize: '30px' }} />
            </div>    
            <div className="links">
                <div className="options">
                    <a href="#">Insert</a>
                </div>
            </div>    
            <div className="about">
                <p>Summary</p>
                <textarea
                    ref={textareaRef}
                    name="name"
                    placeholder="Write something about yourself"
                />
            </div>    
        </>
    );
}
