import './styles/index.css';

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = 500;
canvas.height = 400;

canvas.style.background = "#333"

const convertSVG = (svgid) => {
    const svg = document.getElementById(svgid);

    const xml = new XMLSerializer().serializeToString(svg);

    const svg64 = btoa(xml);
    const b64Start = 'data:image/svg+xml;base64, ';

    return b64Start + svg64;
}

class Orb {
    constructor(xpos, ypos, radius, speed, image) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.speed = speed;
        this.image = convertSVG(image);
    }
}

const draw = () => {        //for now this is outside of a class

    const img  = new Image();

    img.onload = function() {
        context.save();
        context.beginPath();
        context.arc(150, 150, 32, 0, Math.PI * 2, false);
    
        context.clip();
        context.drawImage(img, 150-34, 150-34, 68, 68);
        context.restore();
    }
    img.src = convertSVG('javascript-icon');

}

const update = () => {

    draw();



}

