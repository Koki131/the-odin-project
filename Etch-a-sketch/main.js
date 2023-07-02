
const container = document.querySelector(".container");
const reset = document.querySelector("#reset");

const sizeButton = document.querySelector("#size");

const myNotification = new Notification("Hello!");

let size = prompt("Enter size of grid (max 100)", 100);

if (size > 100) {
    size = 100;
}



let squaresPerLine = size;
let numberOfLines = size;



function populateGrid(squaresPerLine, numberOfLines) {


    for (let i = 0; i < squaresPerLine * numberOfLines ; i++) {
        
        const div = document.createElement("div");
        div.classList.add("square")
        
        div.style.width = 900 / squaresPerLine;
        div.style.height = 900 / numberOfLines;

        container.appendChild(div);

    }


    
}

populateGrid(squaresPerLine, numberOfLines);

let squares = container.querySelectorAll(".square");






function addSquares() {

    squares = container.querySelectorAll(".square");
    squares.forEach(element => {
    
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        element.addEventListener("mousemove", function() {
            element.style.backgroundColor = "#" + randomColor;
        });
    });
}


function clearContent() {

    squares = container.querySelectorAll(".square");
    reset.addEventListener("click", function() {
    
    
        squares.forEach(square => {
            square.style.backgroundColor = null;
        });
    
    });
}


function clearGrid() {

    squares.forEach(e => e.remove());

}



sizeButton.addEventListener("click", function() {


    
    size = prompt("Enter size of grid (max 100)", size);

    if (size > 100) {
        size = 100;
    }

    squaresPerLine = size;
    numberOfLines = size;
    
    clearGrid();
    populateGrid(squaresPerLine, numberOfLines);
    addSquares();
    clearContent();

});


addSquares();
clearContent();


