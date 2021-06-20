export const checkMouseCollision = (ballA, mouse) => {
    const rSum = ballA.radius;
    const dx = mouse.x - ballA.xpos;
    const dy = mouse.y - ballA.ypos;

    return [(rSum * rSum) > (dx * dx) + (dy * dy), rSum - Math.sqrt((dx * dx) + (dy * dy))]
}

export const resolveMouseCollision = (ballA, mouse) => {
    const relVelocity = [(ballA.dx), (ballA.dy)];
    let normal = [(mouse.x - ballA.xpos), (mouse.y - ballA.ypos)];
    const magnitude = Math.sqrt((normal[0] * normal[0] + normal[1] * normal[1]));

    normal = [(normal[0] / magnitude), (normal[1] / magnitude)];

    const velocityOnNormal = (relVelocity[0] * normal[0]) + (relVelocity[1] * normal[1]);

    if (velocityOnNormal > 0 ) return;

    const bounce = 0.7;
    let j = -1 * (1 + bounce) * velocityOnNormal;
    j /= (1 / ballA.radius);

    const impulse = [(j * normal[0]), (j * normal[1])];

    ballA.dx -= ( 1 / ballA.radius ) * impulse[0];
    ballA.dy -= ( 1 / ballA.radius ) * impulse[1];
}

export const adjustPositionAfterMouse = (ballA, mouse, depth) => {
    const percent = 0.2;
    const slope = 0.01;

    let correction = (Math.max(depth - slope, 0) / (1 / ballA.radius)) * percent;

    let normal = [(mouse.x - ballA.xpos), (mouse.y - ballA.ypos)];
    const magnitude = Math.sqrt((normal[0] * normal[0]) + (normal[1] * normal[1]));

    normal = [(normal[0] / magnitude), (normal[1] / magnitude)];
    correction = [(correction * normal[0]), (correction * normal[1])];

    ballA.xpos -= ( 1 / ballA.radius ) * correction[0];
    ballA.ypos -= ( 1 / ballA.radius ) * correction[1];
}