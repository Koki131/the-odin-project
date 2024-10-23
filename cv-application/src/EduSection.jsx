import React, { useRef, useEffect, useState } from 'react';

export default function EduSection() {

    const [education, setEducation] = useState("");
    const eduForm = useRef(null);
    const educationAddRef = useRef(null);
    const educationRef = useRef(null);


    const handleEducation = (e) => {
        setEducation(e.target.value);
    };

    const displayEduForm = () => {
        eduForm.current.style.visibility = "visible";
    };
    
    const hideEduForm = () => {
        eduForm.current.style.visibility = "hidden";
    };

    const addEducation = () => {
        educationRef.current.style.display = "block";
        educationAddRef.current.style.display = "none";
    };

    const removeEducation = () => {
        educationRef.current.style.display = "none";
        educationAddRef.current.style.display = "flex";
    };

    return (
        <>  
            <div className="edu-container" onMouseEnter={displayEduForm} onMouseLeave={hideEduForm}>
                <a ref={educationAddRef} className={`ignore add`} href="#" onClick={addEducation}><svg fill="#3f7cee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>Education</a>
                <div ref={educationRef} style={{display: "none"}}>
                    <div className="edu-header">
                        <h3>Education</h3>
                        <a className="ignore" href="#" onClick={removeEducation}>Remove</a>
                    </div>
                    {education === "" ? <p>Placeholder education</p> : <p>{education}</p>}
                    <div ref={eduForm} className="edu-form" style={{visibility: "hidden"}}>
                        <textarea type="text" value={education} placeholder="Enter education" onChange={(e) => handleEducation(e)} />
                    </div>
                </div>
            </div>
        </>
    );
}