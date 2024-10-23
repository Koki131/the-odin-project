import React, { useRef, useEffect, useState } from 'react';

export default function RefSection() {
    const [references, setReferences] = useState([]);
    const [currId, setCurrId] = useState("");
    const textRefs = useRef([]);
    const formRef = useRef(null);
    const referecesRef = useRef(null);
    const referencesAddRef = useRef(null);

    const updateReferences = (uuid, e) => {
        
        const temp = [];

        for (const key of Object.keys(references)) {
            if (references[key].text.trim() === "") continue;
            temp[key] = {...references[key]};
        }

        if (references[uuid] === undefined) {
            temp[uuid] = {id: uuid, text: ""};
        }
        
        temp[uuid] = {...references[uuid]};
        temp[uuid].id = uuid;
        temp[uuid].text = e.target.value;
        
        setReferences(temp);

    };

    const displayForm = (id) => {      
        textRefs.current[id].current.style = `visibility: visible;`;
    };
    
    const hideForm = (id) => {
        textRefs.current[id].current.style = `visibility: hidden;`;

    };
    
    const displayAddForm = () => {
        formRef.current.firstChild.value = "";
        formRef.current.style = `visibility: visible`;
        setCurrId(crypto.randomUUID());
    };

    const hideAddForm = () => {
        formRef.current.style = `visibility: hidden`;
    };
    const addReferences = () => {
        referecesRef.current.style.display = "block";
        referencesAddRef.current.style.display = "none";
    };

    const removeReferences = () => {
        referecesRef.current.style.display = "none";
        referencesAddRef.current.style.display = "flex";
    };
 

    return (
        <>

            <div className="ref-container">
                <a ref={referencesAddRef} className={`ignore add`} href="#" onClick={addReferences}><svg fill="#3f7cee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>References</a>
                <div ref={referecesRef} style={{display: "none"}}>
                    <div className="ref-header">
                        <h3>References</h3>
                        <a className="ignore" href="#" onClick={removeReferences}>Remove</a>
                    </div>
                    {
                        Object.values(references).map((ref) => {
                            
                            textRefs.current[ref.id] = textRefs.current[ref.id] || React.createRef();

                            return <div className="ref-index" key={ref.id} onMouseEnter={() => displayForm(ref.id)} onMouseLeave={() => hideForm(ref.id)} style={{position: "relative"}}>
                                    <p>{ref.text}</p>
                                    <div ref={textRefs.current[ref.id]} className="ref-popup" style={{visibility: "hidden"}}>
                                        <textarea type="text" value={ref.text} placeholder="Enter text" onChange={(e) => updateReferences(ref.id, e)}/>
                                    </div>
                                </div>
                        })
                    }
                    <a href="#" className="ignore"  onClick={displayAddForm}>Add reference</a>
                    <div ref={formRef} className="ref-popup" style={{visibility: "hidden"}}>
                        <textarea type="text" placeholder="Enter text" onChange={(e) => updateReferences(currId, e)}/>
                        <button onClick={hideAddForm}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}