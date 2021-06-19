import './styles/index.css';
///test
import { svgIdArray } from './svgArray';
import { convertSVG } from './convertSVG';
///

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const backgroundCTX = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = 500;
canvas.height = 400;

canvas.style.background = "#232a2e"

//LETS MAKE THE OBJECT TO HOLD THE IMAGES WITH KEYS
const imagesObject = {};
const convertedSVGS = {}
//the key has to be called with bracket notation here 
//with dot notation assignment we get one key, svgId
const emptyImages = svgIdArray.map(svgId => imagesObject[svgId] = new Image()); 

const iterateTheObject = Object.keys(imagesObject);

const base64ImgArray = iterateTheObject.map(svgId => convertedSVGS[svgId] = convertSVG(svgId));

//this correctly assigns the src
for (let svgId of iterateTheObject) {
    imagesObject[svgId].src = convertedSVGS[svgId];
};

/////////////////////////////////////////////////////

class Orb {
    constructor(xpos, ypos, radius, speed, image) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.speed = speed;
        this.image = image;
    }
    draw(context, backgroundCTX) {
        backgroundCTX.beginPath();
        backgroundCTX.fillStyle = "white";
        backgroundCTX.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
        backgroundCTX.fill();
        backgroundCTX.closePath();

        context.save();
        context.beginPath();
        /*test*/context.strokeStyle = "white";
        /*test*/context.lineWidth = 5;
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
        context.clip();
        context.drawImage(this.image, (this.xpos - this.radius), (this.ypos - this.radius), 64, 64);
        /*test*/context.stroke();
        context.restore();

            
    }
            
}
const orbCollection = [];

for (let i = 0; i < svgIdArray.length; i++) {
    let randomx = Math.random() * 500;
    let randomy = Math.random() * 400;
    orbCollection.push(new Orb(randomx, randomy, 32, 1, imagesObject[svgIdArray[i]]));
    
}


window.onload = function() {
    for (let orb of orbCollection) {
        orb.draw(context, backgroundCTX);
    }
}

//test//////////////////////////
// console.log(svgIdArray); this works
////////////////////////////////
