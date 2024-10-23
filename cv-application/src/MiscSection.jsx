
import React, { useRef, useEffect, useState } from 'react';
import placeholder from "./assets/placeholder.svg";

export default function MiscSection() {
    const [imageData, setImageData] = useState({image: null, radius: 0});
    const [miscData, setMiscData] = useState([]);
    const editRefs = useRef([]);

    const handleImage = (e) => {    
        const file = e.target.files !== null ? e.target.files[0] : null;
        const temp = {...imageData};
    
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                temp.image = reader.result;
                setImageData(temp); 
            };
        } else {
            temp.radius = e.target.value;
            setImageData(temp);
        }
    };

    const openMiscPrompt = (uuid) => {

        const bulletPoints = [{id: "bullet1", text: "bullet1"}, {id: "bullet2", text: "bullet2"}];
        
        const temp = copyData();
        temp[uuid] = {id: uuid, header: "Temp Header", bulletPoints: bulletPoints, listType: "block"};
        setMiscData(temp);
    };



    const addBullet = (sectionId) => {
        const uuid = crypto.randomUUID();
        const temp = copyData();
        const bulletPoints = [];
        
        for (const bulletKey of Object.keys(temp[sectionId].bulletPoints)) {
            bulletPoints[bulletKey] = temp[sectionId].bulletPoints[bulletKey];
        }

        bulletPoints[uuid] = {id: uuid, text: ""};

        temp[sectionId].bulletPoints = bulletPoints;
        
        setMiscData(temp);

    };

    const updateBullet = (sectionId, key, e) => {

        const temp = copyData();
        const tempSection = miscData[sectionId];

        const bulletPoints = [];
        
        for (const bulletKey of Object.keys(tempSection.bulletPoints)) {
            bulletPoints[bulletKey] = tempSection.bulletPoints[bulletKey];
        }

        bulletPoints[key].text = e.target.value;
        tempSection.bulletPoints = bulletPoints;
        temp[sectionId] = tempSection;

        setMiscData(temp);
        

    };

    const updateSectionHeader = (sectionId, e) => {

        const temp = copyData();
        const tempSection = miscData[sectionId];

        tempSection.header = e.target.value;

        temp[sectionId] = tempSection;

        setMiscData(temp);

    };

    const updateListType = (sectionId, e) => {

        const temp = copyData();
        const tempSection = miscData[sectionId];
        
        tempSection.listType = e.target.value;

        temp[sectionId] = tempSection;

        setMiscData(temp);       

    };

    const copyData = () => {

        const temp = [];

        for (const key of Object.keys(miscData)) {

            let hasBullets = false;
            const obj = {...miscData[key]};
            const bulletPoints = [];
            
            for (const bulletKey of Object.keys(obj.bulletPoints)) {
                if (obj.bulletPoints[bulletKey].text.trim() === "") continue;
                hasBullets = true;
                bulletPoints[bulletKey] = obj.bulletPoints[bulletKey];
            }
            if (obj.header.trim() === "" && !hasBullets) continue;

            obj.id = obj.id;
            obj.listType = obj.listType;
            obj.bulletPoints = bulletPoints;
            temp[key] = obj;
        }

        return temp;

    };

    const openMiscItemPrompt = (ref) => {
        ref.current.style.visibility = "visible";
    };

    const closeMiscItemPrompt = (ref) => {
        ref.current.style.visibility = "hidden";
        const temp = copyData();
        setMiscData(temp);
    };

    
    return (
        <>
            <div className="image">
                <label htmlFor="file-upload" className="misc-file-upload">
                    <img style={{borderRadius: `${imageData.radius}%`}} src={imageData.image === null ? placeholder : imageData.image} alt="Profile image" />
                </label>
                <input id="file-upload" type="file" onChange={handleImage} />
                <input className={`image-radius ignore`} type="range" value={imageData.radius} min={0} max={50} onChange={handleImage}/>
            </div>    

            {
                Object.keys(miscData).map(key => {
                    
                    const value = miscData[key];

                    editRefs.current[key] = editRefs.current[key] || React.createRef();

                    return <div key={key} onMouseEnter={() => openMiscItemPrompt(editRefs.current[key])} onMouseLeave={() => closeMiscItemPrompt(editRefs.current[key])}>
                            <h3>{value.header}</h3>
                            <ul>{Object.keys(value.bulletPoints).map(point => {    
                                return <li style={{listStyleType: "none", display: value.listType}} key={point}>{value.bulletPoints[point].text}</li>
                            })}</ul>

                            <div ref={editRefs.current[key]} className="misc-prompt" style={{visibility: "hidden", position: "absolute", zIndex: "100"}}>
                                <input value={value.header} onChange={(e) => updateSectionHeader(key, e)} type="text" placeholder="Section"/>
                                {   
                                    Object.keys(value.bulletPoints).map(point => {
                                        return <input onChange={(e) => updateBullet(key, point, e)} type="text" key={point} value={value.bulletPoints[point].text} />
                                    })
                                }
                                <a href="#" onClick={() => addBullet(key)}>Add bullet point</a>
                                <div>
                                    <label htmlFor={key + "block"}>Inline</label>
                                    <input onChange={(e) => updateListType(key, e)} type="radio" id={key + "inline"} name={key} value="inline" checked={value.listType === "inline"}/>
                                    <label htmlFor={key + "block"}>List</label>
                                    <input onChange={(e) => updateListType(key, e)} type="radio" id={key + "block"} name={key} value="block" checked={value.listType === "block"}/>
                                </div>
                            </div>

                        </div>
                    
                    
                })
            }
            <div style={{display: "flex", justifyContent: "center"}}>
                <a className={`ignore add`} href="#" onClick={() => openMiscPrompt(crypto.randomUUID())}><svg fill="#3f7cee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>Section</a>
            </div>

            
        </>
    );
}