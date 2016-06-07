
// all units are imaginary
var Particle = function (mass, xPos, yPos, radius, visual) {
    this.visual = visual;
    this.radius = radius;
    this.mass = mass;

    this.Fx = 0;
    this.Fy = 0;

    this.accX = 0;
    this.accY = 0;

    this.velX = 0;
    this.velY = 0;

    this.xPos = xPos;
    this.yPos = yPos;

    this.cor = 1; // Coefficient of restitution
    this.collidedPart = null; // colliding particle
};

Particle.prototype.clone = function(){
    var part = new Particle(this.mass, this.xPos, this.yPos, this. radius, this.visual);
    part.setForce(this.Fx, this.Fy);
    part.setVelocity(this.velX, this.velY);
    part.setCOR(this.cor);
    part.calculateAcc();
    return part;
};

Particle.prototype.setForce = function (Fx, Fy) {
    this.Fx = Fx;
    this.Fy = Fy;

    this.calculateAcc();
};

Particle.prototype.setVelocity = function (vX, vY) {
    this.velX = vX;
    this.velY = vY;
};

Particle.prototype.setCOR = function (cor) {
    this.cor = cor;
};

Particle.prototype.calculateAcc = function () {
    if (Math.sqrt(this.velX * this.velX + this.velY * this.velY) >= speedOfLight) {
        this.accX = 0;
        this.accY = 0;
        return;
    }

    // F=ma -> a = F/m
    this.accX = this.Fx / this.mass;
    this.accY = this.Fy / this.mass;
};

Particle.prototype.isImpactingWall = function (x, r, v) { //works for both walls depending on input directions
    return ((x - r) < 0 && v < 0) || ((x + r) > 100 && v > 0);
};

Particle.prototype.isColliding = function (part2){
    var cx = (50 + this.xPos / spacialScale);
    var cy = (50 - this.yPos / spacialScale);

    var rx = this.radius * spacialScale / worldX;
    var ry = this.radius * spacialScale / worldY;

    var cx2 = (50 + part2.xPos / spacialScale);
    var cy2 = (50 - part2.yPos / spacialScale);

    var rx2 = part2.radius * spacialScale / worldX;
    var ry2 = part2.radius * spacialScale / worldY;

    return (Math.abs(cx - cx2) <= rx + rx2 && Math.abs(cy - cy2) <= ry + ry2);
};

Particle.prototype.collidedWith = function (m, vx, vy){
    var sumM = this.mass + m;

    var otherPX = vx * m;
    var otherPY = vy * m;

    this.velX = (this.cor * m * (vx - this.velX) + this.mass * this.velX + otherPX) / sumM;
    this.velY = (this.cor * m * (vy - this.velY) + this.mass * this.velY + otherPY) / sumM;
};

Particle.prototype.next = function () {
    var cx = (50 + this.xPos / spacialScale);
    var cy = (50 - this.yPos / spacialScale);

    var rx = this.radius * spacialScale / worldX;
    var ry = this.radius * spacialScale / worldY;

    if(this.isImpactingWall(cy, ry, this.velY * -1) || this.isImpactingWall(cx, rx ,this.velX)){ // wall collision is most important
        if(this.isImpactingWall(cx, rx, this.velX)){
            this.velX *= (-1) * this.cor;
        }

        if(this.isImpactingWall(cy, ry, this.velY * -1)){
            this.velY *= (-1) * this.cor;
        }
    } else if(this.collidedPart != null){ // projectile collision
        this.collidedWith(this.collidedPart.mass, this.collidedPart.velX, this.collidedPart.velY);
        this.collidedPart = null;
    } // else no collision, no velocity modification needed
    // x = x0 + v0(T) + (a0/2)(T^2) --- where _0 means initial condition
    this.xPos = this.xPos + this.velX * temporalScale + (this.accX / 2) * temporalScale * temporalScale;
    this.yPos = this.yPos + this.velY * temporalScale + (this.accY / 2) * temporalScale * temporalScale;;

    // v = v0 + a0(T)
    this.velX += (this.accX * temporalScale);
    this.velY += (this.accY * temporalScale);

    this.calculateAcc();

    // update visuals
    this.visual.setAttribute("cx", cx + "%");
    this.visual.setAttribute("cy", cy + "%");
};
