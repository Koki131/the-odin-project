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
                div.id = i + "," + j;
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
  

        if (this.currShip[0] !== null) {


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

                this.currShip[0].occupyHelper(this.currShip[0]);
                return;
            }
            
            
            this.currShip[0].occupyHelper(this.currShip[0]);

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


        return this.currShip[0].r + "," + this.currShip[0].c;
    }


    addCoordinates = () => {

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
        
                const div = document.getElementById(i + "," + j);
        
                const rect = div.getBoundingClientRect();
                const dropZoneRect = this.board.getBoundingClientRect();
                const relativeX = rect.top - dropZoneRect.top;
                const relativeY = rect.left - dropZoneRect.left;
        
                this.arr[div.id] = [relativeX, relativeY, false, false];
        
            }
        }

    }

    

    populateBoard = () => {

        const carrier = new Carrier("carrier",0,0,0,0,4,"",0,0, this.arr, this.currShip, this.ships);
        const cruiser1 = new Cruiser("cruiser1",0,0,0,0,3,"",0,0, this.arr, this.currShip, this.ships);
        const cruiser2 = new Cruiser("cruiser2",0,0,0,0,3,"",0,0, this.arr, this.currShip, this.ships);
        const destroyer1 = new Destroyer("destroyer1",0,0,0,0,2,"",0,0, this.arr, this.currShip, this.ships);
        const destroyer2 = new Destroyer("destroyer2",0,0,0,0,2,"",0,0, this.arr, this.currShip, this.ships);
        const destroyer3 = new Destroyer("destroyer3",0,0,0,0,2,"",0,0, this.arr, this.currShip, this.ships);
        const pb1 = new PatrolBoat("pb1",0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships);
        const pb2 = new PatrolBoat("pb2",0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships);
        const pb3 = new PatrolBoat("pb3",0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships);
        const pb4 = new PatrolBoat("pb4",0,0,0,0,1,"",0,0, this.arr, this.currShip, this.ships);

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

                    const key = ship.r + "," + ship.c;
                    const value = this.arr[key];

                    ship.gridPositionX = value[0];
                    ship.gridPositionY = value[1];

                    ship.occupyHelper(ship);

            
                    ship.createShipElement();

                    placed = true;
                }
            }

        }
        
    }


}

class Ship {
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships) {
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
    }

    setTotal = (newTotal) => {
        this.occupiesTotal = newTotal;
    }

    setShipTotal = (newTotal) => {
        this.shipOccupies = newTotal;
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

                this.shipOccupies.push(r + "," + i);
                this.arr[r + "," + i][2] = true;

            }

        } else {


            for (let i = r; i < r + this.noOfTiles; i++) {

                this.shipOccupies.push(i + "," + c);
                this.arr[i + "," + c][2] = true;

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
                if (this.arr[r + "," + (c - 1)][2]) return false;
            }

            if (c + this.noOfTiles < 10) {
                if (this.arr[r + "," + (c + this.noOfTiles)][2]) return false;
            }

            for (let i = c - 1; i < c + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;

                if (r - 1 >= 0) {
                    if (this.arr[(r - 1) + "," + i][2]) return false;
                }

                if (r + 1 < 10) {
                    if (this.arr[(r + 1) + "," + i][2]) return false;
                }

                if (this.arr[r + "," + i][2]) return false;

            }

        } else {

            if (r - 1 >= 0) {
                if (this.arr[(r - 1) + "," + c][2]) return false;
            }

            if (r + this.noOfTiles < 10) {
                if (this.arr[(r + this.noOfTiles) + "," + c][2]) return false;
            }

            for (let i = r - 1; i < r + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;

                if (c - 1 >= 0) {
                    if (this.arr[i + "," + (c - 1)][2]) return false;
                }

                if (c + 1 < 10) {
                    if (this.arr[i + "," + (c + 1)][2]) return false;
                }

                if (this.arr[i + "," + c][2]) return false;

            }

        }

        return true;

    }

    occupyTotal = () => {
        
        
        
        this.unoccupyTotal();
        

        const r = Number.parseInt(this.r);
        const c = Number.parseInt(this.c);

        
        if (this.orientation === "H") {

            if (c - 1 >= 0) this.occupiesTotal.push(r + "," + (c - 1));
            if (c + this.noOfTiles < 10) this.occupiesTotal.push(r + "," + (c + this.noOfTiles));

            for (let i = c - 1; i < c + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;

                if (r - 1 >= 0) this.occupiesTotal.push(r - 1 + "," + i);
                if (r + 1 < 10) this.occupiesTotal.push(r + 1 + "," + i);

                this.occupiesTotal.push(r + "," + i);

            }

            

        } else {

            if (r - 1 >= 0) this.occupiesTotal.push(r - 1 + "," + c);
            if (r + this.noOfTiles < 10) this.occupiesTotal.push((r + this.noOfTiles) + "," + c);

            for (let i = r - 1; i < r + this.noOfTiles + 1; i++) {

                if (i < 0 || i >= 10) continue;
                
                if (c - 1 >= 0) this.occupiesTotal.push(i + "," + (c - 1));
                if (c + 1 < 10) this.occupiesTotal.push(i + "," + (c + 1));

                this.occupiesTotal.push(i + "," + c);

            }
 

        }


    }

    unoccupyHelper = (ship) => {
        ship.unoccupyShipTiles();
        ship.unoccupyTotal();
    }

    occupyHelper = (ship) => {
        ship.occupyTotal();
        ship.occupyTotalBoard();
        ship.occupyShip();
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
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships);
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


        this.occupyHelper(this);

        
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

        const div = document.getElementById(this.r + "," + this.c);

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
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships);
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

        this.occupyHelper(this);

        
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

        const div = document.getElementById(this.r + "," + this.c);

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
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships);
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


        this.occupyHelper(this);

        
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

        const div = document.getElementById(this.r + "," + this.c);

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
    constructor(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships) {
        super(id, r, c, gridPositionX, gridPositionY, noOfTiles, orientation, currPositionX, currPositionY, arr, currShip, ships);
    }

    clickHandler = () => {

        const ship = document.getElementById(this.id);
        const parent = ship.parentElement;

        if (!this.checkClickValidity(this)) {
            this.revertStateOfBoard();
        }

        if (this.orientation === "V" && this.gridPositionY >= 0 && this.gridPositionY <= 200) {

            ship.style.height = "100%";
            ship.style.width = "2.5rem";
            parent.style.flexDirection = "column";
            ship.style.left = 0;
            ship.style.top = "";
            this.orientation = "h";    

        } else if (this.orientation === "H" && this.gridPositionX >= 0 && this.gridPositionX <= 200) {

            ship.style.height = "2.5rem";
            ship.style.width = "100%";
            ship.style.top = 0;
            ship.style.left = "";
            parent.style.flexDirection = "row";
            this.orientation = "V";    
        }


        this.occupyHelper(this);

        
    }


    createShipElement = () => {

        const div = document.getElementById(this.r + "," + this.c);

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



const dropZone = document.querySelector("#drop-zone");

const board = new Board(dropZone);

board.createBoard();
board.addCoordinates();
board.populateBoard();

