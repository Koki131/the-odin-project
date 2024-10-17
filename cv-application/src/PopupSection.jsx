import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const fonts = [
    {name: "Arial", typeface: "sans-serif"},
    {name: "Verdana", typeface: "sans-serif"},
    {name: "Tahoma", typeface: "sans-serif"},
    {name: "Trebuchet MS", typeface: "sans-serif"},
    {name: "Times New Roman", typeface: "serif"},
    {name: "Georgia", typeface: "serif"},
    {name: "Garamond", typeface: "serif"},
    {name: "Courier New", typeface: "monospace"},
    {name: "Brush Script MT", typeface: "cursive"},
];

const PopupSection = ({parentElement}) => {

    const [selection, setSelection] = useState(null);
    const [popupLocation, setPopupLocation] = useState(null);
    const [textStyle, setTextStyle] = useState({
        "font-family": "",
        "font-size": "",
        "font-weight": "",
        "font-style": "",
        "color": "",
    });

    const [popupVisible, setPopupVisible] = useState(false);
    let isSameAsParent = false;

    const convertToHex = (r, g, b) => {

        const toHex = (n) => {
            const val = n.toString(16);
            return val.length === 1 ? "0" + val : val;
        }
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    }

    const extractTextStyles = (element) => {

        const computedStyle = window.getComputedStyle(element);

        const colorSubstring = computedStyle.color.substring(4, computedStyle.color.length-1);
        const colorSplit = colorSubstring.split(",");

        const newColor = convertToHex(parseInt(colorSplit[0]), parseInt(colorSplit[1]), parseInt(colorSplit[2]));

    
        return {
            "font-family": computedStyle.fontFamily.charAt(0) === '"' ? JSON.parse(computedStyle.fontFamily) : computedStyle.fontFamily,
            "font-size": computedStyle.fontSize,
            "font-weight": computedStyle.fontWeight,
            "font-style": computedStyle.fontStyle,
            "color": newColor,
        };
    };

    const handleStyleChange = (e) => {

        const target = e.target.className;
        const curr = {...textStyle};

        const value = e.target.value;

        
        
        curr["font-family"] = target === "font-family" ? value : curr["font-family"];
        curr["font-size"] = target === "font-size" ? value + "px" : curr["font-size"];
        curr["font-weight"] = target === "font-weight" ? ((curr["font-weight"] === "bold" || curr["font-weight"] === "700") ? "normal" : value) : curr["font-weight"];
        curr["font-style"] = target === "font-style" ? (curr["font-style"] === "italic" ? "normal" : value) : curr["font-style"];
        curr["color"] = target === "font-color" ? value : curr["color"];


        setTextStyle(curr);
    };


    if (selection) {

        const selectedText = selection.toString();

        if (selectedText) {
            const range = selection.getRangeAt(0);
           
            
            const convertToString = () => {
                let str = "";
                if (textStyle === null || textStyle === undefined) return;
                for (const key of Object.keys(textStyle)) {
                    str += key + ":" + textStyle[key] + ";";
                }
        
                return str;
        
            }        

            const parent = range.startContainer.parentElement;

            if (parent.nodeName === "SPAN") {

                if (parent.innerText.trim() === range.toString().trim()) {

                    parent.style = convertToString();
                    isSameAsParent = true;

                } else {
                    isSameAsParent = false;
                }
                

            }
            
            if (!isSameAsParent) {
                range.deleteContents();
                const span = document.createElement("span");
                span.textContent = selectedText;
                span.style = convertToString();
                range.insertNode(span);
            }
        }
    
        
    }
    
    
    useEffect(() => {
        

        const handleMouseUp = (e) => {

            const selection = window.getSelection();
            const selectedText = selection.toString();
            

            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
            
            
            
            if (selectedText) {
                const range = selection.getRangeAt(0);
                const temp = range.cloneContents();
                if (temp.firstChild === null) return;
                
                for (const child of temp.childNodes) {
                    
                    if (child.nodeName === "#text" || child.nodeName === "SPAN") {
                        continue;
                    }
                    setSelection(null);
                    return;
                }
                setPopupVisible(true);
                let rangeElement = range.commonAncestorContainer;
                
                if (rangeElement.nodeType === Node.TEXT_NODE) {
                    rangeElement = rangeElement.parentNode;
                }
                setSelection(selection);
                setPopupLocation({
                    x: e.clientX,
                    y: e.clientY
                });
                const extractedStyle = extractTextStyles(rangeElement);
                setTextStyle(extractedStyle);
                
            } else {
                setPopupVisible(false);

            }
            
        }


        
        parentElement.addEventListener("mouseup", handleMouseUp);

        return () => {

            parentElement.removeEventListener("mouseup", handleMouseUp);
        };

    }, [parentElement]);

    return (popupLocation && popupVisible) ? createPortal(
        <div
            style={{
                position: "absolute",
                left: `${popupLocation.x}px`,
                top: `${popupLocation.y}px`,
                width: "300px",
                height: "100px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "white",
                zIndex: "999"
            }}
        >

            <div>
                <select className="font-family" onChange={handleStyleChange} defaultValue={textStyle["font-family"]}>
                    {
                        fonts.map((font, index) => {
                            return <option key={index} value={font.name}>
                                {font.name}
                            </option>
                       }) 
                    }
                </select>
                <select className="font-size" onChange={handleStyleChange} defaultValue={parseInt(textStyle["font-size"])}>
                    {
                        
                        Array.from({length: 100}, (_, i) => {
                            return <option key={i} value={i}>
                                {i + 1}px
                            </option>  
                        })
                    }
                </select>
                <button className="font-weight" value={"bold"} onClick={handleStyleChange} style={{width: "30px"}}>
                    B
                </button>
                <button className="font-style" value={"italic"} onClick={handleStyleChange} style={{width: "30px"}}>
                    I
                </button>
                <input style={{width: "50px", height: "30px"}} className="font-color" type="color" onChange={handleStyleChange} value={textStyle["color"]}/>
            </div>
            <div></div>

        </div>,
        document.body
    ) : null;
   
};


export default PopupSection;
