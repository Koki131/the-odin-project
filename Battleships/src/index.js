import "./style.css";


class Board {
    constructor(board) {
        this.board = board;
        this.arr = [];
        this.ships = [];
        this.closest = [];
        this.currShip = [];
    }

    createBoard = () => {

        for (let i = 0; i < 10; i++) {

            const row = document.createElement("div");
            row.className = "row";

            for (let j = 0; j < 10; j++) {
      
                const div = document.createElement("div");
                div.addEventListener("dragover", this.dragoverHandler);
                div.addEventListener("drop", this.dropHandler);
                
                div.draggable = false;
                div.className = "box";
                div.id = i + "," + j + "," + this.board.id;
                row.appendChild(div);
                
            }
            
            this.board.appendChild(row);
        }
    }

        
    dragoverHandler = (ev) => {

        ev.preventDefault();

        const rect = ev.target.getBoundingClientRect();
        const dropZoneRect = this.board.getBoundingClientRect();
        const relativeX = rect.top - dropZoneRect.top;
        const relativeY = rect.left - dropZoneRect.left;

        this.closest[0] = relativeX;
        this.closest[1] = relativeY;

    }

    dropHandler = (ev) => {
        
        ev.preventDefault();
  

        if (this.currShip[0] !== undefined) {

            const p = document.getElementById(this.currShip[0].id);

            p.style.zIndex = 1;
            p.style.visibility = "visible";
    
            const data = ev.dataTransfer.getData("text/plain");
            if (data !== this.currShip[0].id) return;
    
    
            const element = document.querySelector("#" + data);
    
            const containerCoord = ev.target.id.split(",");

            const row = this.currShip[0].r;
            const col = this.currShip[0].c;
            const gridPositionX = this.currShip[0].gridPositionX;
            const gridPositionY = this.currShip[0].gridPositionY;
    

            this.updateClosest(containerCoord);
     
            const container = document.getElementById(this.getPlacement());

            if (this.currShip[0].checkOutOfBounds()) return;
            
            this.currShip[0].unoccupyShipTiles();
            
            if (!this.currShip[0].canPlace()) {

                this.currShip[0].r = row;
                this.currShip[0].c = col;
                this.currShip[0].gridPositionX = gridPositionX;
                this.currShip[0].gridPositionY = gridPositionY;

                this.currShip[0].occupyHelper();
                return;
            }
            
            
            this.currShip[0].occupyHelper();

            container.appendChild(element);

        }
        

    }



    updateClosest = (containerCoord) => {
        
        this.currShip[0].r = containerCoord[0];
        this.currShip[0].c = containerCoord[1];

        
        this.currShip[0].updateClosestPosition(this.closest);
    }

    getPlacement = () => {

        let min = Number.MAX_VALUE;

        for (let key of Object.keys(this.arr)) {
            
            const val = this.arr[key];
            const curr = Math.abs(val[0] - this.closest[0]) + Math.abs(val[1] - this.closest[1]);

            const values = key.split(",");

            if (curr < min) {
                min = curr;
                this.currShip[0].gridPositionX = val[0];
                this.currShip[0].gridPositionY = val[1];
                this.currShip[0].r = values[0];
                this.currShip[0].c = values[1];
            }
        }


        return this.currShip[0].r + "," + this.currShip[0].c + "," + this.currShip[0].boardId;
    }


    addCoordinates = () => {

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
        
                const div = document.getElementById(i + "," + j + "," + this.board.id);
        
                const rect = div.getBoundingClientRect();
                const dropZoneRect = this.board.getBoundingClientRect();
                let relativeX = rect.top - dropZoneRect.top;
                let relativeY = rect.left - dropZoneRect.left;
                   
                this.arr[div.id] = [relativeX, relativeY, false, false, false];
        
            }
        }


    }

    

    populateBoard = () => {

        const carrier = new Carrier("carrier" + this.board.id,0,0,0,0,4,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const cruiser1 = new Cruiser("cruiser1" + this.board.id,0,0,0,0,3,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const cruiser2 = new Cruiser("cruiser2" + this.board.id,0,0,0,0,3,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const destroyer1 = new Destroyer("destroyer1" + this.board.id,0,0,0,0,2,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const destroyer2 = new Destroyer("destroyer2" + this.board.id,0,0,0,0,2,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const destroyer3 = new Destroyer("destroyer3" + this.board.id,0,0,0,0,2,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const pb1 = new PatrolBoat("pb1" + this.board.id,0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const pb2 = new PatrolBoat("pb2" + this.board.id,0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const pb3 = new PatrolBoat("pb3" + this.board.id,0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships, this.board.id);
        const pb4 = new PatrolBoat("pb4" + this.board.id,0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships, this.board.id);

        this.ships["carrier"] = carrier;
        this.ships["cruiser1"] = cruiser1;
        this.ships["cruiser2"] = cruiser2;
        this.ships["destroyer1"] = destroyer1;
        this.ships["destroyer2"] = destroyer2;
        this.ships["destroyer3"] = destroyer3;
        this.ships["pb1"] = pb1;
        this.ships["pb2"] = pb2;
        this.ships["pb3"] = pb3;
        this.ships["pb4"] = pb4;


        for (const ship of Object.values(this.ships)) {
            
            let placed = false;

            while (!placed) {

                ship.r = Math.round(Math.random() * 10);
                ship.c = Math.round(Math.random() * 10);
                ship.orientation = Math.random() < 0.5 ? "V" : "H";

                if (ship.canPlace()) {

                    const key = ship.r + "," + ship.c + "," + ship.boardId;
                    const value = this.arr[key];

                    ship.gridPositionX = value[0];
                    ship.gridPositionY = value[1];

                    ship.occupyHelper();

            
                    ship.createShipElement();

                    placed = true;
                }
            }

        }
        
    }


}

class Ship {
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId) {
        this.id = id;
        this.r = r;
        this.c = c;
        this.gridPositionX = gridPositionX;
        this.gridPositionY = gridPositionY;
        this.noOfTiles = noOfTiles;
        this.orientation = orientation;
        this.currPositionX = currPositionX;
        this.currPositionY = currPositionY;
        this.occupiesTotal = [];
        this.shipOccupies = [];
        this.arr = arr;
        this.currShip = currShip;
        this.ships = ships;
        this.boardId = boardId;
    }

    sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    updateClosestPosition = (closest) => {

    }

    dragstartHandler = async (ev) => {

        if (ev.target.id === this.id) {
            this.unoccupyTotal();
            const rect = ev.target.getBoundingClientRect();
            this.currPositionX = Math.abs(rect.x - ev.clientX);
            this.currPositionY = Math.abs(rect.y - ev.clientY);
            ev.dataTransfer.setData("text/plain", ev.target.id);
            this.currShip[0] = this;
            await this.sleep(0);
            ev.target.style.zIndex = -1;
            ev.target.style.visibility = "hidden";
        }
    }

    dragendHandler = (ev) => {

        if (ev.target.id === this.id) {
            ev.target.style.zIndex = 1;
            ev.target.style.visibility = "visible";
        }
    
    }

    unoccupyShipTiles = () => {


        for (let tile of this.shipOccupies) {
            this.arr[tile][2] = false;
        }
        this.shipOccupies = [];

    }


    occupyShip = () => {

        this.unoccupyShipTiles();


        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);

        if (this.orientation === "H") {
            
            
            for (let i = c; i < c + this.noOfTiles; i++) {

                this.shipOccupies.push(r + "," + i + "," + this.boardId);
                this.arr[r + "," + i + "," + this.boardId][2] = true;

            }

        } else {


            for (let i = r; i < r + this.noOfTiles; i++) {

                this.shipOccupies.push(i + "," + c + "," + this.boardId);
                this.arr[i + "," + c + "," + this.boardId][2] = true;

            }

        }

    }

    occupyTotalBoard = () => {


        for (let occupied of this.occupiesTotal) {
            this.arr[occupied][3] = true;
        }

    }
    unoccupyShipTilesBoard = () => {

        for (let tile of this.shipOccupies) {
            this.arr[tile][2] = false;
        }
    }

    unoccupyTotalBoard = () => {
        
        for (let occupied of this.occupiesTotal) {
            this.arr[occupied][3] = false;
        }
        
    }

    unoccupyTotal = () => {
        
        for (let occupied of this.occupiesTotal) {
            this.arr[occupied][3] = false;
        }

        this.occupiesTotal = [];

    }

    canPlace = () => {

        
        if (this.checkOutOfBounds()) return false;

        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);


        if (this.orientation === "H") {

            if (c - 1 >= 0) {
                if (this.arr[r + "," + (c - 1) + "," + this.boardId][2]) return false;
            }

            if (c + this.noOfTiles < 10) {
                if (this.arr[r + "," + (c + this.noOfTiles) + "," + this.boardId][2]) return false;
            }

            for (let i = c - 1; i < c + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;

                if (r - 1 >= 0) {
                    if (this.arr[(r - 1) + "," + i + "," + this.boardId][2]) return false;
                }

                if (r + 1 < 10) {
                    if (this.arr[(r + 1) + "," + i + "," + this.boardId][2]) return false;
                }

                if (this.arr[r + "," + i + "," + this.boardId][2]) return false;

            }

        } else {

            if (r - 1 >= 0) {
                if (this.arr[(r - 1) + "," + c + "," + this.boardId][2]) return false;
            }

            if (r + this.noOfTiles < 10) {
                if (this.arr[(r + this.noOfTiles) + "," + c + "," + this.boardId][2]) return false;
            }

            for (let i = r - 1; i < r + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;

                if (c - 1 >= 0) {
                    if (this.arr[i + "," + (c - 1) + "," + this.boardId][2]) return false;
                }

                if (c + 1 < 10) {
                    if (this.arr[i + "," + (c + 1) + "," + this.boardId][2]) return false;
                }

                if (this.arr[i + "," + c + "," + this.boardId][2]) return false;

            }

        }

        return true;

    }

    occupyTotal = () => {
        
        
        this.unoccupyTotal();
        

        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);

        
        if (this.orientation === "H") {

            if (c - 1 >= 0) this.occupiesTotal.push(r + "," + (c - 1) + "," + this.boardId);
            if (c + this.noOfTiles < 10) this.occupiesTotal.push(r + "," + (c + this.noOfTiles) + "," + this.boardId);

            for (let i = c - 1; i < c + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;

                if (r - 1 >= 0) this.occupiesTotal.push((r - 1) + "," + i + "," + this.boardId);
                if (r + 1 < 10) this.occupiesTotal.push((r + 1) + "," + i + "," + this.boardId);

                this.occupiesTotal.push(r + "," + i + "," + this.boardId);

            }

            

        } else {

            if (r - 1 >= 0) this.occupiesTotal.push((r - 1) + "," + c + "," + this.boardId);
            if (r + this.noOfTiles < 10) this.occupiesTotal.push((r + this.noOfTiles) + "," + c + "," + this.boardId);

            for (let i = r - 1; i < r + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;
                
                if (c - 1 >= 0) this.occupiesTotal.push(i + "," + (c - 1) + "," + this.boardId);
                if (c + 1 < 10) this.occupiesTotal.push(i + "," + (c + 1) + "," + this.boardId);

                this.occupiesTotal.push(i + "," + c + "," + this.boardId);

            }
 

        }


    }

    occupyHelper = () => {
        this.occupyTotal();
        this.occupyTotalBoard();
        this.occupyShip();
    }

    checkClickValidity = (ship) => {

        
        let tempOrientation = ship.orientation;

        
        if (ship.orientation === "V") {

            ship.unoccupyTotalBoard();
            ship.unoccupyShipTilesBoard();
            ship.orientation = "H";   
            ship.occupyTotal();

            if (!ship.canPlace()) {
                ship.unoccupyTotal();
                ship = tempOrientation;
    
                return false;
            }

        } else {

            ship.unoccupyTotalBoard();
            ship.unoccupyShipTilesBoard();
            ship.orientation = "V";    
            ship.occupyTotal();

            if (!ship.canPlace()) {
                ship.unoccupyTotal();

                ship = tempOrientation;
                

                return false;
            }
        }

        ship.orientation = tempOrientation;
        this.revertStateOfBoard();

        return true;


    }

    revertStateOfBoard = () => {

        for (const ship of Object.values(this.ships)) {
            ship.occupyTotal();
            ship.occupyTotalBoard();
        }

        
    }

}

class Carrier extends Ship {
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId);
    }

    clickHandler = () => {

        const ship = document.getElementById(this.id);
        const parent = ship.parentElement;
        
        if (!this.checkClickValidity(this)) {
            this.revertStateOfBoard();
        }

        if (this.orientation === "V" && this.gridPositionY >= 0 && this.gridPositionY <= 240) {

            ship.style.height = "100%";
            ship.style.width = "10rem";
            parent.style.flexDirection = "column";
            ship.style.left = 0;
            ship.style.top = "";
            this.orientation = "H";

        } else if (this.orientation === "H" && this.gridPositionX >= 0 && this.gridPositionX <= 240) {


            ship.style.height = "10rem";
            ship.style.width = "100%";
            ship.style.top = 0;
            ship.style.left = "";
            parent.style.flexDirection = "row";
            this.orientation = "V";

        }



        this.occupyHelper();

        
    }


    updateClosestPosition = (closest) => {

        if (this.orientation === "H") {
            if (this.currPositionX >= 40 && this.currPositionX < 80) {
                closest[1] -= 40;
            } else if (this.currPositionX >= 80 && this.currPositionX < 120) {
                closest[1] -= 80;
            } else if (this.currPositionX >= 120 && this.currPositionX < 160) {
                closest[1] -= 120;
            } 
        } else {
            if (this.currPositionY >= 40 && this.currPositionY < 80) {
                closest[0] -= 40;
            } else if (this.currPositionY >= 80 && this.currPositionY < 120) {
                closest[0] -= 80;
            } else if (this.currPositionY >= 120 && this.currPositionY < 160) {
                closest[0] -= 120;
            } 
        }
    }

    createShipElement = () => {

        const div = document.getElementById(this.r + "," + this.c + "," + this.boardId);

        const p = document.createElement("p");

        p.style = `border: 2px solid blue; display: flex; align-items: center;` + 
        `justify-content: center; cursor: move; position: absolute; top: 0; left: 0; ${this.orientation === "H" ? "width: 10rem; height: 100%;" : "height: 10rem; width: 100%;"}
        z-index: 999; background-color: rgba(0, 0, 0, 0.2)`;

        p.draggable = true;
        p.id = this.id;
        div.appendChild(p);
        p.addEventListener("dragstart", this.dragstartHandler);
        p.addEventListener("dragend", this.dragendHandler);
        p.addEventListener("click", this.clickHandler);

    }

    checkOutOfBounds = () => {

        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);
        

        return r < 0 || r > 9 || c < 0 || c > 9 || (this.orientation === "H" && c + 3 > 9) || (this.orientation === "V" && r + 3 > 9);

    }
}



class Cruiser extends Ship {
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId);
    }

    clickHandler = () => {

        const ship = document.getElementById(this.id);
        const parent = ship.parentElement;
        
        if (!this.checkClickValidity(this)) {
            this.revertStateOfBoard();
        }

        if (this.orientation === "V" && this.gridPositionY >= 0 && this.gridPositionY <= 280) {
            
            ship.style.height = "100%";
            ship.style.width = "7.5rem";
            parent.style.flexDirection = "column";
            ship.style.left = 0;
            ship.style.top = "";
            this.orientation = "H";

        } else if (this.orientation === "H" && this.gridPositionX >= 0 && this.gridPositionX <= 280) {

            ship.style.height = "7.5rem";
            ship.style.width = "100%";
            ship.style.top = 0;
            ship.style.left = "";
            parent.style.flexDirection = "row";
            this.orientation = "V";  

        }

        this.occupyHelper();

        
    }


    updateClosestPosition = (closest) => {

        if (this.orientation === "H") {
            if (this.currPositionX >= 40 && this.currPositionX < 80) {
                closest[1] -= 40;
            } else if (this.currPositionX >= 80 && this.currPositionX < 120) {
                closest[1] -= 80;
            }  
        } else {
            if (this.currPositionY >= 40 && this.currPositionY < 80) {
                closest[0] -= 40;
            } else if (this.currPositionY >= 80 && this.currPositionY < 120) {
                closest[0] -= 80;
            }
        }
    }

    createShipElement = () => {

        const div = document.getElementById(this.r + "," + this.c + "," + this.boardId);

        const p = document.createElement("p");

        p.style = `border: 2px solid blue; display: flex; align-items: center;` + 
        `justify-content: center; cursor: move; position: absolute; top: 0; left: 0; ${this.orientation === "H" ? "width: 7.5rem; height: 100%;" : "height: 7.5rem; width: 100%;"}
        z-index: 999; background-color: rgba(0, 0, 0, 0.2)`;

        p.draggable = true;
        p.id = this.id;
        div.appendChild(p);
        p.addEventListener("dragstart", this.dragstartHandler);
        p.addEventListener("dragend", this.dragendHandler);
        p.addEventListener("click", this.clickHandler);

    }

    checkOutOfBounds = () => {

        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);
        

        return r < 0 || r > 9 || c < 0 || c > 9 || (this.orientation === "H" && c + 2 > 9) || (this.orientation === "V" && r + 2 > 9);
    }
}

class Destroyer extends Ship {
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId);
    }

    clickHandler = () => {

        const ship = document.getElementById(this.id);
        const parent = ship.parentElement;

        if (!this.checkClickValidity(this)) {
            this.revertStateOfBoard();
        }


        if (this.orientation === "V" && this.gridPositionY >= 0 && this.gridPositionY <= 320) {

            ship.style.height = "100%";
            ship.style.width = "5rem";
            parent.style.flexDirection = "column";
            ship.style.left = 0;
            ship.style.top = "";
            this.orientation = "H";    

        } else if (this.orientation === "H" && this.gridPositionX >= 0 && this.gridPositionX <= 320) {

            ship.style.height = "5rem";
            ship.style.width = "100%";
            ship.style.top = 0;
            ship.style.left = "";
            parent.style.flexDirection = "row";
            this.orientation = "V";    

        }


        this.occupyHelper();

        
    }


    updateClosestPosition = (closest) => {

        if (this.orientation === "H") {
            if (this.currPositionX >= 40 && this.currPositionX < 80) {
                closest[1] -= 40;
            } 
        } else {
            if (this.currPositionY >= 40 && this.currPositionY < 80) {
                closest[0] -= 40;
            } 
        }
    }

    createShipElement = () => {

        const div = document.getElementById(this.r + "," + this.c + "," + this.boardId);

        const p = document.createElement("p");

        p.style = `border: 2px solid blue; display: flex; align-items: center;` + 
        `justify-content: center; cursor: move; position: absolute; top: 0; left: 0; ${this.orientation === "H" ? "width: 5rem; height: 100%;" : "height: 5rem; width: 100%;"}
        z-index: 999; background-color: rgba(0, 0, 0, 0.2)`;

        p.draggable = true;
        p.id = this.id;
        div.appendChild(p);
        p.addEventListener("dragstart", this.dragstartHandler);
        p.addEventListener("dragend", this.dragendHandler);
        p.addEventListener("click", this.clickHandler);

    }

    checkOutOfBounds = () => {

        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);
        

        return r < 0 || r > 9 || c < 0 || c > 9 || (this.orientation === "H" && c + 1 > 9) || (this.orientation === "V" && r + 1 > 9);

    } 
}

class PatrolBoat extends Ship {
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships, boardId);
    }

    clickHandler = () => {


        if (!this.checkClickValidity(this)) {
            this.revertStateOfBoard();
        }



        this.occupyHelper();

        
    }


    createShipElement = () => {

        const div = document.getElementById(this.r + "," + this.c + "," + this.boardId);

        const p = document.createElement("p");

        p.style = `border: 2px solid blue; display: flex; align-items: center;` + 
        `justify-content: center; cursor: move; position: absolute; top: 0; left: 0; ${this.orientation === "H" ? "width: 2.5rem; height: 100%;" : "height: 2.5rem; width: 100%;"}
        z-index: 999; background-color: rgba(0, 0, 0, 0.2)`;

        p.draggable = true;
        p.id = this.id;
        div.appendChild(p);
        p.addEventListener("dragstart", this.dragstartHandler);
        p.addEventListener("dragend", this.dragendHandler);
        p.addEventListener("click", this.clickHandler);

    }

    checkOutOfBounds = () => {

        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);
        

        return r < 0 || r > 9 || c < 0 || c > 9;

    } 

}


class Game {
    constructor() {
        this.turn = 1;
        this.board1 = null;
        this.board2 = null;
    }

    isGameOver = () => {

        if (this.turn === 1) {
           for (const tile of Object.values(this.board2.arr)) {
                if (tile[2]) return false;
           }
        } else {
            for (const tile of Object.values(this.board1.arr)) {
                if (tile[2]) return false;
            }
        }



        return true;


    }

    makeGamePlayable = (computerBoard, playerBoard, computer, player) => {

        const arr = computerBoard.arr;

        for (const item of Object.keys(arr)) {
            
            const div = document.getElementById(item);

            div.addEventListener("click", (ev) => {
                ev.preventDefault();


                if (this.turn === 1 && !player.attack(computerBoard, item)) {
                    this.turn = -1
                    while (computer.attack(playerBoard)) {}
                    this.turn = 1;
                }

            });
        }

    }

    createMultiplayerGame = () => {

        const player1BoardContainer = document.querySelector("#player1-board");
        const player2BoardContainer = document.querySelector("#player2-board");

        const player1Board = new Board(player1BoardContainer);
        const player2Board = new Board(player2BoardContainer);
        this.board1 = player1Board;
        this.board2 = player2Board;
        
        const player1 = new Player(player1Board);
        const player2 = new Player(player2Board);
        
        
        player1.createPlayerBoard();
        player2.createPlayerBoard();
        
        const arr = player2Board.arr;

        for (const box of Object.keys(arr)) {
            document.getElementById(box).innerText = "";
        }
        

        this.makeTilesClickable(player2Board, player1);
    }

    createBotGame = () => {

        const playerBoardContainer = document.querySelector("#player1-board");
        const computerBoardContainer = document.querySelector("#player2-board");

        const playerBoard = new Board(playerBoardContainer);
        const computerBoard = new Board(computerBoardContainer);

        this.board1 = playerBoard;
        this.board2 = computerBoard;
        
        const player = new Player(playerBoard);
        const computer = new Computer(computerBoard);
        
        
        player.createPlayerBoard();
        computer.createPlayerBoard();
        
        for (const box of Object.keys(computerBoard.arr)) {
            document.getElementById(box).innerText = "";
        }

        return {playerBoard, computerBoard, player, computer};

    }
    startGame = async (data) => {

        this.makeGamePlayable(data.computerBoard, data.playerBoard, data.computer, data.player);

    }
}

class Player {
    constructor(board) {
        this.board = board;
    }

    createPlayerBoard = () => {
        this.board.createBoard();
        this.board.addCoordinates();
        this.board.populateBoard();
    }

    attack = (board, coordinate) => {
        const div = document.getElementById(coordinate);

        if (!board.arr[coordinate][4]) {
            if (board.arr[coordinate][2]) {
                board.arr[coordinate][2] = false;  
                div.style.backgroundColor = "green";
                board.arr[coordinate][4] = true;   
                return true;
            } else {
                div.style.backgroundColor = "red";
            } 
            
            board.arr[coordinate][4] = true;   
            
        }

        return false;


    }
}

class Computer extends Player {
    constructor(board) {
        super(board);
    }

    attack = (board) => {

        let coordinate = Math.floor(Math.random() * 10) + "," + Math.floor(Math.random() * 10) + "," + "player1-board";
        let div = document.getElementById(coordinate);

        if (!board.arr[coordinate][4]) {
            
            
            if (board.arr[coordinate][2]) {
                board.arr[coordinate][2] = false;  
                div.style.backgroundColor = "green";
                board.arr[coordinate][4] = true;   
                return true;
            } else {
                div.style.backgroundColor = "red";
                board.arr[coordinate][4] = true;   
            } 
            
            coordinate = Math.floor(Math.random() * 10) + "," + Math.floor(Math.random() * 10) + "," + "player1-board";
            div = document.getElementById(coordinate);


        }

        return false;


    }
}


const game = new Game();

const gameData = game.createBotGame();

const startButton = document.getElementById("start-button");

startButton.addEventListener("click", (event) => {
    event.preventDefault();

    game.startGame(gameData);
});