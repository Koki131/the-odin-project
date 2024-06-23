import "./style.css";


class Board {
    constructor(board) {
        this.board = board;
        this.arr = [];
        this.ships = [];
        this.closest = [];
    }

    createBoard = () => {


        for (let i = 0; i < 10; i++) {

            const row = document.createElement("div");
            row.className = "row";

            for (let j = 0; j < 10; j++) {
      
                const div = document.createElement("div");

                div.addEventListener("dragover", this.dragoverHandler);
                div.addEventListener("drop", this.dropHandler);

                div.className = "box";
                div.id = i + "," + j;
                row.appendChild(div);
                
            }
            
            this.board.appendChild(row);
        }
    }

        
    dragoverHandler = (ev) => {

        ev.preventDefault();

        const p = document.getElementById("p1");

        if (ev.target === p) {
            p.style.zIndex = -1;
            p.style.visibility = "hidden";
        } 

        const rect = ev.target.getBoundingClientRect();
        const dropZoneRect = this.board.getBoundingClientRect();
        const relativeX = rect.top - dropZoneRect.top;
        const relativeY = rect.left - dropZoneRect.left;
    
        this.closest[0] = relativeX;
        this.closest[1] = relativeY;

    }

    dropHandler = (ev) => {
        
        ev.preventDefault();

        const p = document.getElementById(this.ships[0].id);

        p.style.zIndex = 1;
        p.style.visibility = "visible";

        const data = ev.dataTransfer.getData("text/plain");

        const element = document.querySelector("#" + data);

        const containerCoord = ev.target.id.split(",");

        this.ships[0].r = containerCoord[0];
        this.ships[0].c = containerCoord[1];
        
        this.updateClosest();

        const container = document.getElementById(this.getPlacement());

        container.appendChild(element);

    }

    updateClosest = () => {
        
        const ship = this.ships[0];

        if (ship.orientation === "H") {
            if (ship.currPositionX >= 80 && ship.currPositionX < 160) {
                this.closest[1] -= 80;
            } else if (ship.currPositionX >= 160 && ship.currPositionX <= 240) {
                this.closest[1] -= 160;
            }
        } else {
            if (ship.currPositionY >= 80 && ship.currPositionY < 160) {
                this.closest[0] -= 80;
            } else if (ship.currPositionY >= 160 && ship.currPositionY <= 240) {
                this.closest[0] -= 160;
            }
        }

    }

    getPlacement = function() {

        let r = 0;
        let c = 0;

        let min = Number.MAX_VALUE;
        const ship = this.ships[0];

        for (let key of Object.keys(this.arr)) {
            
            const val = this.arr[key];
            const curr = Math.abs(val[0] - this.closest[0]) + Math.abs(val[1] - this.closest[1]);

            const values = key.split(",");

            if (curr < min) {
                min = curr;
                ship.gridPositionX = val[0];
                ship.gridPositionY = val[1];
                r = values[0];
                c = values[1];
            }
        }

        if (ship.orientation === "V") {

            if (ship.gridPositionX === 640) {
                r--;
            } else if (ship.gridPositionX === 720) {
                r -= 2;
            }  
            
        } else {
            
            if (ship.gridPositionY === 640) {
                c--;
            } else if (ship.gridPositionY === 720) {
                c -= 2;
            }
        }

        return r + "," + c;
    }

    addCoordinates = () => {

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
        
                const div = document.getElementById(i + "," + j);
        
                const rect = div.getBoundingClientRect();
                const dropZoneRect = this.board.getBoundingClientRect();
                const relativeX = rect.top - dropZoneRect.top;
                const relativeY = rect.left - dropZoneRect.left;
        
                this.arr[div.id] = [relativeX, relativeY];
        
            }
        }

    }

    populateBoard = () => {

        const ship = new Ship("p1",0,0,0,0,3,"V",0,0);

        this.ships[0] = ship;

        ship.createShip();

    }

}

class Ship {
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY) {
        this.id = id;
        this.r = r;
        this.c = c;
        this.gridPositionX = gridPositionX;
        this.gridPositionY = gridPositionY;
        this.noOfTiles = noOfTiles;
        this.orientation = orientation;
        this.currPositionX = currPositionX;
        this.currPositionY = currPositionY;

    }


    getXPosition = () => {
        return this.currPositionX;
    }

    getYPosition = () => {
        return this.currPositionY;
    }

    createShip = () => {

        const div = document.getElementById(this.r + "," + this.c);

        const p = document.createElement("p");
        p.draggable = true;
        p.id = this.id;
        div.appendChild(p);
        p.addEventListener("dragstart", this.dragstartHandler);
        p.addEventListener("dragend", this.dragendHandler);
        p.addEventListener("click", this.clickHandler);

    }

    dragstartHandler = (ev) => {

        if (ev.target.id === this.id) {
            const rect = ev.target.getBoundingClientRect();
            this.currPositionX = Math.abs(rect.x - ev.clientX);
            this.currPositionY = Math.abs(rect.y - ev.clientY);
            ev.dataTransfer.setData("text/plain", ev.target.id);
        }
    }

    dragendHandler = (ev) => {

        if (ev.target.id === this.id) {
            ev.target.style.zIndex = 1;
            ev.target.style.visibility = "visible";
        }
    
    }

    clickHandler = () => {

        const ship = document.getElementById(this.id);
        const parent = ship.parentElement;

        if (this.orientation === "V" && this.gridPositionY >= 0 && this.gridPositionY < 640) {
            ship.style.height = "100%";
            ship.style.width = "15rem";
            parent.style.flexDirection = "column";
            ship.style.left = 0;
            ship.style.top = "";
            this.orientation = "H";
        } else if (this.orientation === "H" && this.gridPositionX >= 0 && this.gridPositionX < 640) {
            ship.style.height = "15rem";
            ship.style.width = "100%";
            ship.style.top = 0;
            ship.style.left = "";
            parent.style.flexDirection = "row";
            this.orientation = "V";
        }
    }

}


const dropZone = document.querySelector("#drop-zone");

const board = new Board(dropZone);

board.createBoard();
board.addCoordinates();
board.populateBoard();

