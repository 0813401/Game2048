"use strict";
const BLANK = " ";
class Tile {
    constructor(){
        this.tile = document.createTextNode(BLANK)
        this.node = document.createElement("div");
        this.node.setAttribute("class","tile");
        this.node.appendChild(this.tile);
    };
    setTile(i){
        this.tile.nodeValue = i;
        if(i === BLANK) this.node.style.backgroundColor = "#80FFFF";
        else{
            switch(Math.log2(i)){
                case 1:
                    this.node.style.backgroundColor = "#6A6AFF";
                    break;
                case 2:
                    this.node.style.backgroundColor = "#00CACA";
                    break;
                case 3:
                    this.node.style.backgroundColor = "#0000C6";
                    break;
                case 4:
                    this.node.style.backgroundColor = "#005757";
                    break;
                case 5:
                    this.node.style.backgroundColor = "#000093";
                    break;
                case 6:
                    this.node.style.backgroundColor = "#02F78E";
                    break;
                case 7:
                    this.node.style.backgroundColor = "#00DB00";
                    break;
                case 8:
                    this.node.style.backgroundColor = "#00A600";
                    break;
                case 9:
                    this.node.style.backgroundColor = "#007500";
                    break;
                case 10:
                    this.node.style.backgroundColor = "#006030";
                    break;
                case 11:
                    this.node.style.backgroundColor = "#C6A300";
                    break;
                case 12:
                    this.node.style.backgroundColor = "#BB5E00";
                    break;
                case 13:
                    this.node.style.backgroundColor = "#842B00";
                    break;
                case 14:
                    this.node.style.backgroundColor = "#642100";
                    break;
                case 15:
                    this.node.style.backgroundColor = "#5B4B00";
                    break;
                case 16:
                    this.node.style.backgroundColor = "#424200";
                    break;
            }
        }
    };
    getTile(){
        return this.tile.nodeValue;
    };
    move(){
    };
}

function randTile(){
    let aTMP = []
    let i;
    for(i = 0; i<10; i++)
        if(aTile[i].getTile() === BLANK) aTMP.push(i); //把index記住
    if (aTMP.length > 0){
        i = Math.floor(Math.random() * aTMP.length);
        aTile[aTMP[i]].setTile(Math.random()>0.75?4:2) //random產生 0~1 的數 機率 (2:4) = 3:1
    }
}

let aTile = [];
const COLORS = [ "yellow", "red"];
let container = document.getElementById("container");

for (let i = 0; i<16; i++){
    aTile.push(new Tile())
    container.appendChild(aTile[i].node)    
}

randTile();
randTile();



window.addEventListener("keydown",run,false); 
function run(e){
    let i,j;
    e = e || window.event
    switch(e.code) {
        case "ArrowLeft":
            for (let i = 0; i<=15; i++){
                if (i%4 != 0 && aTile[i].getTile() !== BLANK){
                    for(let j = i; j > i-(i%4); j--){
                        if(aTile[j-1].getTile() === BLANK){
                            aTile[j-1].setTile(aTile[j].getTile());
                            aTile[j].setTile(BLANK);
                        } else if(aTile[j-1].getTile() === aTile[j].getTile()){
                            aTile[j-1].setTile(parseInt(aTile[j].getTile())*2);
                            aTile[j].setTile(BLANK);
                            break;
                        } else {
                            //pass
                        }
                    }
                }    
            }
            break;
        case "ArrowRight":
            for (let i = 15; i>=0; i--){
                if (i%4 != 3 && aTile[i].getTile() !== BLANK){
                    for(let j = i; j<= i-(i%4)+2; j++){
                        if(aTile[j+1].getTile() === BLANK){
                            aTile[j+1].setTile(aTile[j].getTile());
                            aTile[j].setTile(BLANK);
                        } else if(aTile[j+1].getTile() === aTile[j].getTile()){
                            aTile[j+1].setTile(parseInt(aTile[j].getTile())*2);
                            aTile[j].setTile(BLANK);
                            break;
                        } else {
                            //pass
                        }
                    }
                }    
            }
            break;
        case "ArrowUp":
            for (let i = 4; i<16; i++){
                // i, i+4 二者的關係
                if (aTile[i].getTile() !== BLANK){
                    for(let j = i; j>=4; j-=4){
                        if(aTile[j-4].getTile() === BLANK){
                            aTile[j-4].setTile(aTile[j].getTile());
                            aTile[j].setTile(BLANK);
                        } else if(aTile[j-4].getTile() === aTile[j].getTile()){
                            aTile[j-4].setTile(parseInt(aTile[j].getTile())*2);
                            aTile[j].setTile(BLANK);
                            break;
                        } else {
                            //pass
                        }
                    }
                }    
            }
            break;
        case "ArrowDown":
            for (let i = 15; i>=0; i--){
                // i, i+4 二者的關係
                if (aTile[i].getTile() !== BLANK){
                    for(let j = i; j<12; j+=4){
                        if(aTile[j+4].getTile() === BLANK){
                            aTile[j+4].setTile(aTile[j].getTile());
                            aTile[j].setTile(BLANK);
                        } else if(aTile[j+4].getTile() === aTile[j].getTile()){
                            aTile[j+4].setTile(parseInt(aTile[j].getTile())*2);
                            aTile[j].setTile(BLANK);
                            break;
                        } else {
                            //pass
                        }
                    }
                }    
            }
            break;
        
    }
    randTile();
    

    let won = false;
    for (let i = 0; i<16; i++){
        if(parseInt(aTile[i].getTile()) >= 2048 ){
            console.log("恭喜過關！！")
            won = true;
            break;
        }
    }

    let over = true;
    if(!won){
        for (i = 0; i<16 && over; i+=4){
            for(j = i; j<i+3 && over; j++) {
                over = over && aTile[j].getTile() !== aTile[j+1].getTile()
            }
        }
        for (i = 0; i<4 && over; i++){
            for(j = i; j<12 && over; j+=4) {
                over = over && aTile[j].getTile() !== aTile[j+4].getTile()
            }
        }
        for(i = 0; i <16; i++)
            if(aTile[i].getTile() === BLANK){
                console.log("checker!!")
                over = false;
            }
        if(over) console.log("you lost!");
    }
    if(won || over) window.removeEventListener("keydown",run,false); 
}
