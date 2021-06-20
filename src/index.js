import './styles/index.css';

import { svgIdArray } from './svgArray';
import { convertSVG } from './convertSVG';
import { checkCollision, resolveCollision, adjustPositions } from './physics';
import { checkMouseCollision, resolveMouseCollision, adjustPositionAfterMouse } from './mousePhysics';


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const backgroundCTX = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 800;

canvas.style.background = "#232a2e"

//LETS MAKE THE OBJECT TO HOLD THE IMAGES WITH KEYS
const imagesObject = {};
const convertedSVGS = {}
//the key has to be called with bracket notation here 
//with dot notation assignment we get one key, svgId

svgIdArray.map(svgId => imagesObject[svgId] = new Image()); 

const iterateTheObject = Object.keys(imagesObject);

iterateTheObject.map(svgId => convertedSVGS[svgId] = convertSVG(svgId));

//this correctly assigns the src
for (let svgId of iterateTheObject) {
    imagesObject[svgId].src = convertedSVGS[svgId];
};

const gravity = [0, -0.05];

/*///////////////TODO////////////////

//- Add impulse to other balls on mouse click-
//   --we can change their dx and dy based on ~*~triangles

//- Figure out how to incorporate the canvas into react

///////////////////////////////////*/

//Lets make a mouse object and a mousemove event listener to track it
const mouse = {
    x: undefined,
    y: undefined,
};

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})




/////////////////////////////////////////////////////

class Orb {
    constructor(xpos, ypos, radius, speed, image) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.speed = speed;
        this.image = image;
        //set deltas
        this.dx = 1.5 * this.speed;
        this.dy = 1 * this.speed;
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
    update() {
        const xBound = canvas.width;
        const yBound = canvas.height;

        this.xpos += this.dx;
        this.ypos += this.dy;

        this.dx += gravity[0];
        this.dy -= gravity[1];

        if (this.xpos > xBound - this.radius) {
            this.xpos = xBound - this.radius;
            this.dx *= -1;
        }

        else if (this.xpos < this.radius) {
            this.xpos = this.radius;
            this.dx *= -1;
        }

        if (this.ypos > yBound - this.radius) {
            this.ypos = yBound - this.radius;
            this.dy *= -0.7;
        }

        else if (this.ypos < this.radius) {
            this.ypos = this.radius + 1
            this.dy *= -0.7;
        }

        

        this.draw(context, backgroundCTX);
    }
            
}
const orbCollection = [];

//for not spawning balls inside the walls
const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < svgIdArray.length; i++) {
    let randomx = randomNumber(32, (canvas.width - 32));
    let randomy = randomNumber(32, (canvas.height - 32));
    orbCollection.push(new Orb(randomx, randomy, 32, 1, imagesObject[svgIdArray[i]]));
    
}

const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    orbCollection.forEach(ballA => {
        ballA.update();

        orbCollection.forEach(ballB => {
            if (ballA !== ballB) {
                const collision = checkCollision(ballA, ballB);
                if (collision[0]) {
                    adjustPositions(ballA, ballB, collision[1]);
                    resolveCollision(ballA, ballB);
                }
            }
        });

        //new stuff for mouse collisions
        const mouseCollision = checkMouseCollision(ballA, mouse);
        
        if (mouseCollision[0] && mouseCollision[1]) {
            
            adjustPositionAfterMouse(ballA, mouse, mouseCollision[1]);
            resolveMouseCollision(ballA, mouse);
            console.log(mouse, ballA);
        }
    });
    requestAnimationFrame(animate);
}

animate();





//old animate function

// const animateFunction = () => {
//     requestAnimationFrame(animateFunction);
//     //clear whole canvas every frame
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     orbCollection.forEach(orb => {
//         orb.update();
//     });
// }

// //removed this being inside the window.onload callback function
// //should leave a not here just in case
// //this used to be window.onload = () => {animateFunction();}
//     animateFunction();


//test//////////////////////////
// console.log(svgIdArray); this works
////////////////////////////////
