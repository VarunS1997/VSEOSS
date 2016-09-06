
// all units are hypothetical
// spacial units are in percentage coordiantes. ex. (0%, 0%) is origin
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
        console.log("Lightspeed detected, reducing acceleration to 0");
        return;
    }

    // F=ma -> a = F/m
    this.accX = this.Fx / this.mass;
    this.accY = this.Fy / this.mass;
};

Particle.prototype.isImpactingWall = function (x, r, v) { //works for both walls depending on input directions
    if(x - r <= 0 && v < 0){
        return -1;
    } else if(x + r >= 100 && v > 0){
        return 1;
    } else {
        return 0;
    }
};

Particle.prototype.isColliding = function (part2){
     // raw px coordinates
    var dx = (this.xPos - part2.xPos) * worldX / (100 * spacialScale);
    var dy = (this.yPos - part2.yPos) * worldY / (100 * spacialScale);

    var dr = Math.sqrt(dx * dx + dy * dy);

    return (dr <= this.radius + part2.radius);
};

Particle.prototype.collidedWith = function (part2){
    var m = part2.mass;
    var vx = part2.velX;
    var vy = part2.velY;

    var sumM = this.mass + m;

    var otherPX = vx * m;
    var otherPY = vy * m;

    this.velX = (this.cor * m * (vx - this.velX) + this.mass * this.velX + otherPX) / sumM;
    this.velY = (this.cor * m * (vy - this.velY) + this.mass * this.velY + otherPY) / sumM;
};

Particle.prototype.experienceTime = function () {
    var cx = (50 + this.xPos / spacialScale);
    var cy = (50 - this.yPos / spacialScale);

    var rx = this.radius / (worldX * spacialScale); // convert radius to percentages
    var ry = this.radius / (worldY * spacialScale); // convert radius to percentages

    var yCollision = this.isImpactingWall(cy, ry, this.velY * -1);
    var xCollision = this.isImpactingWall(cx, rx ,this.velX);

    if(xCollision != 0 || yCollision != 0){ // wall collision is most important
        if(xCollision != 0){
            this.velX *= (-1) * this.cor;

            if(this.xCollision < 0){
                this.xPos = -50 * spacialScale + rx;
            } else{
                this.xPos = 50 * spacialScale - rx;
            }
        }

        if(yCollision != 0){
            this.velY *= (-1) * this.cor;

            if(this.yCollision < 0){
                this.yPos = 50 * spacialScale - ry;
            } else{
                this.yPos = -50 * spacialScale + ry;
            }
        }
    } else if(this.collidedPart != null){ // projectile collision
        this.collidedWith(this.collidedPart);
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
