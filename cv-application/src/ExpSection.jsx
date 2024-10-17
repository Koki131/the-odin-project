import React, { useRef, useEffect, useState } from 'react';
import editImg from './assets/edit.svg';
import deleteImg from './assets/delete.svg';

export default function ExpSection() {

    const [promptOpen, setPromptOpen] = useState(false);
    const [sections, setSections] = useState([]);
    const [currId, setCurrId] = useState(null);
    const editPopupRefs = useRef([]);
    const editExpRefs = useRef([]);
    const parentContainer = useRef(null);


    const handleDataUpdate = (section) => {

        const temp = [];
        for (const k of Object.keys(sections)) {
            const val = sections[k];
            
            const tObj = {...val};
            const bulletPoints = [];

            for (const key of Object.keys(tObj.bulletPoints)) {
                bulletPoints[key] = tObj.bulletPoints[key];
            }
            tObj.id = tObj.id;
            tObj.workplace = tObj.workplace;
            tObj.date = tObj.date;
            tObj.bulletPoints = bulletPoints;
            temp[k] = tObj;
        }
        const tempSection = {...section};
        const bulletPoints = [];

        for (const key of Object.keys(section.bulletPoints)) {
            bulletPoints[key] = section.bulletPoints[key];
        }
        tempSection.id = tempSection.id;
        tempSection.workplace = tempSection.workplace;
        tempSection.date = tempSection.date;
        tempSection.bulletPoints = bulletPoints;
        temp[section.id] = tempSection;

        setSections(temp);
    };

    
    const handlePromptWindow = () => {

        if (!promptOpen) {
            const uuid = crypto.randomUUID();
            
            const temp = [];
            for (const k of Object.keys(sections)) {
                const val = sections[k];
                
                const tObj = {...val};
                const bulletPoints = [];

                for (const key of Object.keys(tObj.bulletPoints)) {
                    bulletPoints[key] = tObj.bulletPoints[key];
                }
                tObj.id = tObj.id;
                tObj.workplace = tObj.workplace;
                tObj.date = tObj.date;
                tObj.bulletPoints = bulletPoints;
                temp[k] = tObj;
            }
            temp[uuid] = {id: uuid, workplace: "", date: "", bulletPoints: []};
            
            
            setSections(temp);
            setCurrId(uuid);
        }

        setPromptOpen(!promptOpen);
    };
    const displayOptions = (index, e) => {
        const popUp = editPopupRefs.current[index].current;
    
        if (popUp) {
            popUp.style.opacity = '1';
            popUp.style.visibility = "visible";
        }
    };
    
    const hideOptions = (index) => {
        const popUp = editPopupRefs.current[index].current;
        if (popUp) {
            popUp.style.opacity = '0';
            popUp.style.visibility = "hidden";
        }
    };


    
    const openSelectionWindow = (id) => {
        editExpRefs.current[id].current.style.visibility = "visible";
    };

    const closeSelectionWindow = (id, e) => {
        editExpRefs.current[id].current.style.visibility = "hidden";

        updateExperience(null, id, null, e);
    };

    const deleteEntry = (id) => {
        const temp = [];
        for (const k of Object.keys(sections)) {
            if (k === id) continue;

            const val = sections[k];
            
            const tObj = {...val};
            const bulletPoints = [];

            for (const key of Object.keys(tObj.bulletPoints)) {
                bulletPoints[key] = tObj.bulletPoints[key];
            }
            tObj.id = tObj.id;
            tObj.workplace = tObj.workplace;
            tObj.date = tObj.date;
            tObj.bulletPoints = bulletPoints;
            temp[k] = tObj;
        }

        setSections(temp);
    };

    const updateExperience = (type, sectionId, bulletPointKey, e) => {

        const temp = [];

        for (const k of Object.keys(sections)) {
            
            const val = sections[k];
    
            const tObj = {...val};
            const bulletPoints = [];

            for (const key of Object.keys(tObj.bulletPoints)) {
                bulletPoints[key] = tObj.bulletPoints[key];
            }
            tObj.id = tObj.id;
            tObj.workplace = tObj.workplace;
            tObj.date = tObj.date;
            tObj.bulletPoints = bulletPoints;
            temp[k] = tObj;
        }

        const tempSection = {...temp[sectionId]};

        const bulletPoints = [];

        for (const key of Object.keys(tempSection.bulletPoints)) {
            if (tempSection.bulletPoints[key] === undefined || tempSection.bulletPoints[key].trim() === "") continue;
            bulletPoints[key] = tempSection.bulletPoints[key];
        }
        
        if (type === "add-bullet") {
            const uuid = crypto.randomUUID();
            bulletPoints[uuid] = "";
        } else {    
            if (bulletPointKey !== null) bulletPoints[bulletPointKey] = type === "bullet" ? e.target.value : bulletPoints[bulletPointKey];
        }

        tempSection.id = tempSection.id;
        tempSection.workplace = type === "workplace" ? e.target.value : tempSection.workplace;
        tempSection.date = type === "date" ? e.target.value : tempSection.date;
        tempSection.bulletPoints = bulletPoints;
        temp[sectionId] = tempSection;
            
        
        setSections(temp);

    };

    

    return (
        <>
            <h3>Experience</h3>
            <div ref={parentContainer} className="exp-container">
                {
                    Object.values(sections).map(section => {

                            if (section.workplace !== "" || section.date !== "" || section.bulletPoints.length >= 1) {

                                editPopupRefs.current[section.id] = editPopupRefs.current[section.id] || React.createRef();
                                editExpRefs.current[section.id] = editExpRefs.current[section.id] || React.createRef();
    
                                return <div style={{marginTop: "10px"}} onMouseEnter={(e) => displayOptions(section.id, e)} onMouseLeave={(e) => hideOptions(section.id, e)} key={section.id}>
                                        <h4>{section.workplace}</h4>
                                        <p style={{opacity: "0.6"}}>{section.date}</p>
                                        <ul>
                                            {
                                                
                                                Object.keys(section.bulletPoints).map((key) => {
                                                    const val = section.bulletPoints[key];
                                                    return <li key={key}>{val}</li>
                                                })
                                            }
                                        </ul>
                                        <div  ref={editPopupRefs.current[section.id]} className='exp-edit-options' style={{visibility: "hidden"}}>
                                            <a className="edit-link" href="#" onClick={() => openSelectionWindow(section.id)}>
                                                <img src={editImg} alt="" />
                                            </a>
                                            <a className="delete-link" href="#" onClick={() => deleteEntry(section.id)}>
                                                <img src={deleteImg} alt="" />
                                            </a>
                                        </div>
                                        <div ref={editExpRefs.current[section.id]} className='exp-edit' style={{visibility: "hidden"}}>
                                            <div className='exp-close-button'>
                                                <button onClick={(e) => closeSelectionWindow(section.id, e)}>Close</button>
                                            </div>
                                            <div>
                                                <div>
                                                    <p>Workplace/Project</p>
                                                    <input type="text" onChange={(e) => updateExperience("workplace", section.id, null, e)} value={section.workplace} />
                                                </div>
                                                <div>
                                                    <p>Date</p>
                                                    <input type="text" onChange={(e) => updateExperience("date", section.id, null, e)} value={section.date} />
                                                </div>
                                            </div>
                                            <div>
                                                <p>Bullet Points</p>
                                                {
                                                    Object.keys(section.bulletPoints).map(key => {
                                                        const val = section.bulletPoints[key];
                                                        return <input className="bullet-input" key={key} onChange={(e) => updateExperience("bullet", section.id, key, e)} type="text" value={val}/>
                                                    })
                                                }
                                            </div>
                                            <a href="#" className="add-bullet" onClick={(e) => updateExperience("add-bullet", section.id, null, e)}>Add</a>
    
                                        </div>
                                    </div>
                            
                            }
                            
                           

                    })
                }
            </div>
            <div className="exp-prompt-window">
                <a href="#" className="add-exp" onClick={handlePromptWindow}>Add</a>
                {promptOpen && <PromptWindow onClose={handlePromptWindow} id={currId} handleDataUpdate={handleDataUpdate} sections={sections} />}
            </div>
        </>
    );
}

function PromptWindow({onClose, id, handleDataUpdate, sections}) {
    
    const [section, setSection] = useState(sections[id]);
    const inputRef = useRef(null);


    const saveData = () => {
        handleDataUpdate(section);
        onClose();
    };

    const addBulletPoint = (e) => {
        e.preventDefault();
        const uuid = crypto.randomUUID();
        const inputValue = inputRef.current.value;

        const temp = {...section};
        const bulletPoints = [];

        for (const key of Object.keys(section.bulletPoints)) {
            bulletPoints[key] = section.bulletPoints[key];
        }
        bulletPoints[uuid] = inputValue;
        temp.id = temp.id;
        temp.workplace = temp.workplace;
        temp.date = temp.date;
        temp.bulletPoints = bulletPoints;
        inputRef.current.value = "";

        setSection(temp);
        
    }

    const handleWorkplace = (e) => {

        const temp = {...section};
        const bulletPoints = [];

        for (const key of Object.keys(section.bulletPoints)) {
            bulletPoints[key] = section.bulletPoints[key];
        }
        temp.id = temp.id;
        temp.workplace = e.target.value;
        temp.date = temp.date;
        temp.bulletPoints = bulletPoints;

        setSection(temp);

    }

    const handleDate = (e) => {

        const temp = {...section};
        const bulletPoints = [];

        for (const key of Object.keys(section.bulletPoints)) {
            bulletPoints[key] = section.bulletPoints[key];
        }
        temp.id = temp.id;
        temp.workplace = temp.workplace;
        temp.date = e.target.value;
        temp.bulletPoints = bulletPoints;

        setSection(temp);

    }


    return (
        <div className="prompt-window">
            <div className="buttons">
                <div className="save-button">
                    <button onClick={saveData}>Save</button>
                </div>
                <div className="close-button">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
            <div className="exp-input">
                <div className='workplace'>
                    <input type="text" placeholder='Workplace/Project' onChange={handleWorkplace} />
                    <input type="text" placeholder='Date' onChange={handleDate}/>
                </div>
                <div>
                    <form action="#" onSubmit={addBulletPoint}>
                        <input placeholder="Point (RETURN to add)" type="text" ref={inputRef} />
                    </form>
                </div>
            </div>
        </div> 
    );

}