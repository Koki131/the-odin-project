
import React, { useRef, useEffect, useState } from 'react';
import editImg from './assets/edit.svg';
import deleteImg from './assets/delete.svg';
import plus from "./assets/plus.svg";


export default function IntroSection() {

    const [aboutDetails, setAboutDetails] = useState(new Map());
    const [promptOptions, setPromptOptions] = useState({id: "", promptOpen: false, type: ""});
    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const textareaRef = useRef(null);
    const editRefs = useRef([]);
    const nameRef = useRef(null);
    const aboutAddRef = useRef(null);
    const aboutRef = useRef(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`; 
    };
    
    
    const openSelectionWindow = (id, type) => {
        const temp = promptHelper(id, !promptOptions.promptOpen, type);
        setPromptOptions(temp);
    }

    const promptHelper = (id, promptOpen, type) => {
        const temp = {...promptOptions};
        temp.id = id;
        temp.promptOpen = promptOpen;
        temp.type = type;

        return temp;
    }

    const displayOptions = (index) => {
        const popUp = editRefs.current[index].current;
        popUp.style = "opacity: 1; top: 100%;";
    }

    const hideOptions = (index) => {
        const popUp = editRefs.current[index].current;
        if (popUp !== null) popUp.style = "opacity: 0";

    }


    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.addEventListener('input', adjustHeight);
        return () => {
            textarea.removeEventListener('input', adjustHeight);
        };
    }, []);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleSummary = (e) => {
        setSummary(e.target.value)
    };

    const copyDetails = () => {
        const temp = new Map();

        for (const obj of aboutDetails) {
            const key = obj[0];
            const value = obj[1];
            temp.set(key, {...value});
        }
        return temp;
    };


    const addNewEntry = (type) => {
        const temp = copyDetails();
        const key = crypto.randomUUID();
        temp.set(key, { id: key, image: null, text: "", link: "", elType: type });
        const options = promptHelper(key, true, temp.elType);
        setPromptOptions(options);
        setAboutDetails(temp); 
    };

    const deleteEntry = (id) => {
        const temp = copyDetails();
        temp.delete(id);
        setAboutDetails(temp);
    };
    
    const handleImage = (e) => {    
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const temp = copyDetails();
            const lastKey = promptOptions.id; 
            const tempObj = { ...temp.get(lastKey)};
            tempObj.id = tempObj.id;
            tempObj.image = url;
            tempObj.text = tempObj.text;
            tempObj.link = tempObj.link;
            tempObj.elType = tempObj.elType;          
            temp.set(lastKey, tempObj); 
            setAboutDetails(temp); 
        }
    };
    
    const handleText = (e) => {
        const temp = copyDetails();
        const lastKey = promptOptions.id;
        
        const tempObj = { ...temp.get(lastKey)}; 
        tempObj.id = tempObj.id;
        tempObj.image = tempObj.image;
        tempObj.text = e.target.value;
        tempObj.link = tempObj.link;
        tempObj.elType = tempObj.elType;         
        temp.set(lastKey, tempObj); 
        setAboutDetails(temp); 
    };
    
    const handleLink = (e) => {
        const temp = copyDetails();
        const lastKey = promptOptions.id; 
        const tempObj = { ...temp.get(lastKey)}; 
        tempObj.id = tempObj.id;
        tempObj.image = tempObj.image;
        tempObj.text = tempObj.text;
        tempObj.link = e.target.value;
        tempObj.elType = tempObj.elType;  
        temp.set(lastKey, tempObj);
        setAboutDetails(temp); 
    };

    const displayNameInput = () => {
        nameRef.current.style.visibility = "visible";
    };

    const hideNameInput = () => {
        nameRef.current.style.visibility = "hidden";
    };

    const displaySummaryInput = () => {
        textareaRef.current.style.visibility = "visible";
    };

    const hideSummaryInput = () => {
        textareaRef.current.style.visibility = "hidden";
    };

    const addSummary = () => {
        aboutAddRef.current.style.display = "none";
        aboutRef.current.style.display = "block";
    };
    const removeSummary = () => {
        aboutAddRef.current.style.display = "block";
        aboutRef.current.style.display = "none";
    };

    return (
        <>
            <div className="name" onMouseEnter={displayNameInput} onMouseLeave={hideNameInput}>
                {name.trim() === "" ? (<h1>Placeholder name (hover)</h1>) : <h1>{name}</h1>}
                <div ref={nameRef} className='name-div' style={{visibility: "hidden"}}>
                    <input onChange={(e) => handleName(e)} type="text" name="name" placeholder="Enter name" style={{ fontSize: '30px'}} />
                </div>
            </div>    
            <div className="links">
                <div className="options">
                    {
                        Array.from(aboutDetails.values()).map((detail) => {
                            if (detail.image !== null || detail.text !== "") {

                                editRefs.current[detail.id] = editRefs.current[detail.id] || React.createRef();

                                
                                if (detail.elType === "link") {
                                    return <div key={detail.id} className='intro-item' onMouseEnter={() => displayOptions(detail.id)} onMouseLeave={() => hideOptions(detail.id)}>
                                                <a className="intro-text"  href={detail.link} target='blank'>
                                                    {detail.image !== null ? <img src={detail.image} alt="" /> : null}
                                                    <span>|</span>
                                                    <p>{detail.text}</p>
                                                </a>
                                                <div ref={editRefs.current[detail.id]} className='edit-options' style={{display: "none"}}>
                                                    <a className="edit-link" href="#" onClick={() => openSelectionWindow(detail.id, detail.elType)}>
                                                        <img src={editImg} alt="" />
                                                    </a>
                                                    <a className="delete-link" href="#" onClick={() => deleteEntry(detail.id)}>
                                                        <img src={deleteImg} alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                }
                                return <div key={detail.id} className='intro-item' onMouseEnter={() => displayOptions(detail.id)} onMouseLeave={() => hideOptions(detail.id)}>
                                            <div className="intro-text">
                                                <span>|</span>
                                                <p>{detail.text}</p>
                                            </div>
                                            <div ref={editRefs.current[detail.id]} className='edit-options' style={{display: "none"}}>
                                                <a className="edit-link" href="#" onClick={() => openSelectionWindow(detail.id, detail.elType)}>
                                                    <img src={editImg} alt="" />
                                                </a>
                                                <a className="delete-link" href="#" onClick={() => deleteEntry(detail.id)}>
                                                    <img src={deleteImg} alt="" />
                                                </a>
                                            </div>
                                       </div>
                            }
                        })
                    }
                    <div className='prompt-window-container'>
                        {aboutDetails.size > 0 && <span>|</span>}
                        <a href="#" className={`insert-link ignore`} onClick={() => openSelectionWindow(aboutDetails.size, "")}>Insert</a>
                        {promptOptions.promptOpen && <PromptWindow onClose={() => openSelectionWindow("", "")} aboutDetails={aboutDetails} addNewEntry={addNewEntry}
                            handleImage={handleImage} handleText={handleText} handleLink={handleLink} initState={promptOptions.type} id={promptOptions.id}/>}
                    </div>
                </div>
            </div>
            <div ref={aboutAddRef}>
                <a className={`ignore add`} href="#" onClick={addSummary}><svg fill="#3f7cee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>Summary</a>
            </div>    
            <div ref={aboutRef} className="about" onMouseEnter={displaySummaryInput} onMouseLeave={hideSummaryInput} style={{display: "none"}}>
                <div className="summary-header">
                    <h3>Summary</h3>
                    <a className="ignore" href="#" onClick={removeSummary}>Remove</a>
                </div>
                <p>{summary === "" ? "Placeholder summary (hover)" : summary}</p>
                <textarea
                    className='summary'
                    ref={textareaRef}
                    onChange={(e) => handleSummary(e)}
                    name="name"
                    placeholder="Write something about yourself"
                    style={{visibility: "hidden"}}
                />
            </div>

        </>
    );
}

function PromptWindow({ onClose, aboutDetails, handleText, handleImage, handleLink, addNewEntry, initState, id }) {
    const [action, setAction] = useState(initState);

    
    const openDetailsWindow = (type) => {
        setAction(type === "link" ? "link" : "text");
        return true;
    }

    const currItem = aboutDetails.get(id) === undefined ? Array.from(aboutDetails.values())[id] : aboutDetails.get(id);

    if (action === "link") {
        return (
            <div className="prompt-window">
                <div className="close-button">
                    <button onClick={onClose}>Close</button>
                </div>
                <div>
                    <div className='about-file-upload-container'>
                        <div className='about-file-upload'>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Image
                            </label>
                            <input id="file-upload" type="file" onChange={handleImage} />
                            <img style={{width: "30px", height: "30px"}} src={currItem.image}/>
                        </div>
                        <div className="text-input">
                            <input type="text" value={currItem.text} placeholder='Text' onChange={handleText}/>
                        </div>
                    </div>
                    <div className="link-input">
                        <input type="text" value={currItem.link} placeholder='Add link' onChange={handleLink}/>
                    </div>
                </div>
            </div>
        );
    } else if (action === "text") {
        return (
            <div className="prompt-window">
                <div className="close-button">
                    <button onClick={onClose}>Close</button>
                </div>
                <div className="text-input">
                    <input type="text" value={currItem.text} placeholder='Text' onChange={handleText}/>
                </div>
            </div>
        );
    }

    return (
        <div className="prompt-window">
            <div className="close-button">
                <button onClick={onClose}>Close</button>
            </div>
            <div className="options">
                <a href="#" onClick={() => openDetailsWindow("link") && addNewEntry("link")}>Insert Link</a>
                <a href="#" onClick={() => openDetailsWindow("text") && addNewEntry("text")}>Insert Text</a>
            </div>
        </div>
    );
}
