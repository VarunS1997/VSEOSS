//physics
//make particle instances
var svgE = document.getElementById("particleCanvas").childNodes;

var count = 4; //number of particles
var particles = [count];

//create particles and apply initial conditions
for (var i = 0; i < count; i++) {
    var particle1 = new Particle(1, 0, 0, svgE[1 + 2 * i]); //1+2*i is formula for the "(i+1)th" rectangle
    particle1.applyForce(0, -1);
    particle1.setVelocity((Math.random() - .5) * 100, 0);
    particles[i] = particle1;
}

//time-related
var ticker = setInterval(timePass, 7); //7 ms because it increases animation fluidity
var ready = false; //ready to pass time?
var rad = Math.PI / 2; //angle of clock hand
var radius; //radius of clock
var clock = document.getElementById("clock"); //clock hand

clock.onload = function () {
    clock = clock.contentDocument.getElementById("tick");
    if (radius == null) { //placed here to ensure clock is loaded correctly
        ready = true;
        radius = 250;
    }
};

function timePass() {
    if (time && ready) {
        ready = false;

        //cause passage of time
        for (var i = 0; i < particles.length; i++) {
            particles[i].next();
        }

        //clock math
        clock.setAttribute("x2", 255.5 + radius * Math.cos(rad));
        clock.setAttribute("y2", 255 - radius * Math.sin(rad));

        rad -= (Math.PI / 7200) * temporalScale;

        ready = true;
    }
}

function pausePlay() {
    if (time) {
        pausePlayer.setAttribute("src", "play.svg");
    } else {
        pausePlayer.setAttribute("src", "pause.svg");
    }
    time = !time; //toggle time
}

//UI stuff
var pausePlayer = document.getElementById("pausePlay");

pausePlayer.addEventListener("click", pausePlay);