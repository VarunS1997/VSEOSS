
// all units are imaginary
var Particle = function (mass, xPos, yPos, visual) {
    this.visual = visual;
    this.mass = mass;

    this.Fx = 0;
    this.Fy = 0;

    this.accX = 0;
    this.accY = 0;

    this.velX = 0;
    this.velY = 0;

    this.xPos = xPos;
    this.yPos = yPos;

    this.elastic = 1;
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

Particle.prototype.setElasticity = function (E) {
    this.elastic = E;
}

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

Particle.prototype.isImpactingWall = function (x, v) {
    return (x < 0 && v < 0) || (x > 100 && v > 0);
};

Particle.prototype.next = function () {
    // x = x0 + v0(T) + (a0/2)(T^2) --- where _0 means initial condition
    this.xPos = this.xPos + this.velX * temporalScale + (this.accX / 2) * temporalScale * temporalScale;
    this.yPos = this.yPos + this.velY * temporalScale + (this.accY / 2) * temporalScale * temporalScale;;

    // v = v0 + a0(T)
    this.velX += (this.accX * temporalScale);
    this.velY += (this.accY * temporalScale);

    this.calculateAcc();

    //get location in percentage
    var cx = (50 + this.xPos / spacialScale);
    var cy = (50 - this.yPos / spacialScale);

    if (this.isImpactingWall(cx, this.velX)) {
        this.velX *= (-1) * this.elastic;
    }

    if (this.isImpactingWall(cy, this.velY * -1)) { //multiply velocity by negative one due to down being positive
        this.velY *= (-1) * this.elastic;
    }

    this.visual.setAttribute("cx", cx + "%");
    this.visual.setAttribute("cy", cy + "%");
};
