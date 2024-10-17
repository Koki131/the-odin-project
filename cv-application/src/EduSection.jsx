import React, { useRef, useEffect, useState } from 'react';

export default function EduSection() {

    const [education, setEducation] = useState("");
    const eduForm = useRef(null);


    const handleEducation = (e) => {
        setEducation(e.target.value);
    };

    const displayEduForm = () => {
        eduForm.current.style.visibility = "visible";
    };
    const hideEduForm = () => {
        eduForm.current.style.visibility = "hidden";
    };

    return (
        <>  
            <div className="edu-container" onMouseEnter={displayEduForm} onMouseLeave={hideEduForm}>
                <h3>Education</h3>
                {education === "" ? <p>Placeholder education</p> : <p>{education}</p>}
                <div ref={eduForm} className="edu-form" style={{visibility: "hidden"}}>
                    <input type="text" value={education} placeholder="Enter education" onChange={(e) => handleEducation(e)} />
                </div>
            </div>
        </>
    );
}