import './styles/index.css';

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = 500;
canvas.height = 400;

canvas.style.background = "#232a2e"

const convertSVG = (svgid) => {
    const svg = document.getElementById(svgid);

    const xml = new XMLSerializer().serializeToString(svg);

    const svg64 = btoa(xml);
    const b64Start = 'data:image/svg+xml;base64, ';

    return b64Start + svg64;
}

const img1  = new Image();
img1.src = convertSVG('javascript-icon');
const img2 = new Image();
img2.src = convertSVG('java-icon');

class Orb {
    constructor(xpos, ypos, radius, speed, image) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.speed = speed;
        this.image = image;
    }
    draw(context) {
            context.save();
            context.beginPath();
            context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
            context.clip();
            context.drawImage(this.image, (this.xpos - this.radius), (this.ypos - this.radius), 64, 64);
            context.restore();
    }
}

const myOrb = new Orb(150, 150, 30, 1, img1);
const myOrb2 = new Orb(350, 150, 30, 1, img2);

window.onload = function() {
myOrb.draw(context);
myOrb2.draw(context);
}



// class Orb {
//     constructor(xpos, ypos, radius, speed, image) {
//         this.xpos = xpos;
//         this.ypos = ypos;
//         this.radius = radius;
//         this.speed = speed;
//         this.imageSRC = convertSVG(image);
//         this.image = new Image();
        
//     }


//     draw(ctx) {
//         let image = this.image;
//         image.onload = function() {
//             // context.save();
//             ctx.beginPath();
//             ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
//             ctx.clip();
//             ctx.drawImage(image, (this.xpos - this.radius), (this.ypos - this.radius), 64, 64);
//             // context.restore();
//             // context.closePath();
//         }
//         image.src = this.imageSRC;

//     }
//     update() {
//         this.draw(context);
//     }
// }
// const myOrb = new Orb(300, 300, 30, 1, 'javascript-icon');
// const myOrb2 = new Orb(150, 150, 30, 1, 'java-icon');

// const img  = new Image();

// img.onload = function() {
//     context.save();
//     context.beginPath();
//     context.arc(myOrb.xpos, myOrb.ypos, myOrb.radius, 0, Math.PI * 2, false);
//     context.clip();
//     context.drawImage(img, (myOrb.xpos-myOrb.radius-2), (myOrb.ypos-myOrb.radius-2), 64, 64);
//     context.restore();
// }
// img.src = myOrb.imageSRC;


// console.log(myOrb);
// console.log(myOrb2);

// myOrb2.draw(context);