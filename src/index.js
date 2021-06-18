import './styles/index.css';

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "coral"

const convertSVG = (svgid) => {
    const svg = document.getElementById(svgid);

    const xml = new XMLSerializer().serializeToString(svg);

    const svg64 = btoa(xml);
    const b64Start = 'data:image/svg+xml;base64, ';

    let image64 = b64Start + svg64;

    const img  = new Image();
    img.onload = function() {
        context.save();
        context.beginPath();
        context.arc(150, 150, 32, 0, Math.PI * 2, false);

        context.clip();
        context.drawImage(img, 150-34, 150-34, 68, 68);
        context.restore();
    }
    img.src = image64;

}


convertSVG('javascript-icon');