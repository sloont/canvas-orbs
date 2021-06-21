export const checkMouseClick = (ballA, mouse) => {
    const normal = [(mouse.x - ballA.xpos), (mouse.y - ballA.ypos)];
    console.log("MouseX: " + mouse.x, "MouseY: " + mouse.y);
    console.log("XBALL: " + ballA.xpos);
    console.log("YBALL: " + ballA.ypos);
    console.log("Normal: " + normal);
    const magnitude = Math.sqrt((normal[0] * normal[0]) + (normal[1] * normal[1]));
    console.log("Mag: " + magnitude);
    console.log("Radius Mag: " + ballA.radius)
    console.log(magnitude < ballA.radius);
    return magnitude < ballA.radius;
}

export const applyForceWithClick = (ballA, mouse) => {
    let normal = [(mouse.x - ballA.xpos), (mouse.y - ballA.ypos)];
    const magnitude = Math.sqrt((normal[0] * normal[0]) + (normal[1] * normal[1]));
    normal = [(normal[0] / magnitude) , (normal[1] / magnitude)];

    const relativeVelocity = [ballA.dx, ballA.dy];
    const velocityOnNormal = (relativeVelocity[0] * normal[0]) + (relativeVelocity[1] * normal[1]);

    let j =  40 + velocityOnNormal;
    j /= (1 / ballA.radius);

    const impulse = [(j * normal[0]), (j * normal[1])];

    ballA.dx -= (1/ballA.radius) * impulse[0];
    ballA.dy -= (1/ballA.radius) * impulse[1];
}