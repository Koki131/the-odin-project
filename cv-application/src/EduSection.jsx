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
        educationAddRef.current.style.display = "block";
    };

    return (
        <>  
            <div className="edu-container" onMouseEnter={displayEduForm} onMouseLeave={hideEduForm}>
                <a className="ignore" ref={educationAddRef} href="#" onClick={addEducation}>Add Education</a>
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