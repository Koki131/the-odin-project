const popupOptions = (parentElement) => {

    const divPopup = createPopupElement();
    
    parentElement.addEventListener("mouseup", (e) => {        
        
        const selection = window.getSelection();
        const selectedText = selection.toString();
        
        if (selectedText) {
            const range = selection.getRangeAt(0);
            const temp = range.cloneContents();

            for (const child of temp.childNodes) {
                if (child.nodeName === "#text" || child.nodeName === "SPAN") continue;
                return;
            }
            createPopupOptions(range, divPopup, e, selectedText);
        }
        
    });

    const arr = [];

    for (let i = 0; i < 10; i++) {
        arr[crypto.randomUUID()] = i;
    }

    console.log(
        Object.keys(arr).map(key => {
            return key + "SEXX" + arr[key];
        })
    );
    
};

const createPopupElement = () => {
    const div = document.createElement("div");
    div.id = "select-popup";

    
    document.body.appendChild(div);

    return div;
}

const createPopupOptions = (range, container, e, selectedText) => {
    container.style = `position: absolute; left: ${e.clientX}px; top: ${e.clientY}px; width: 200px; height: 100px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; background-color: white`;
    const span = document.createElement("span");

    span.textContent = selectedText;
    span.style.color = "red";
    range.deleteContents();
    range.insertNode(span);

}

export { popupOptions };
