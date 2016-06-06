// simulation Physics

// physics globals
var particles;
var ticker = setInterval(physics_timePass, 7); //7 ms because it increases animation fluidity
var ready = false; //ready to pass time?

//UI globals
var clock_angle_rads = Math.PI / 2; //angle of clock hand in radiants
var clock_radius; //radius of clock
var clock_hand; //clock hand

var pausePlayer;

function init(){
    var svgE = document.getElementById("particleCanvas").childNodes;

    particles = [svgE.length];

    clock_hand = document.getElementById("clock");

    pausePlayer = document.getElementById("pausePlay");
    pausePlayer.addEventListener("click", clock_pausePlay);

    //create particles and apply initial conditions
    for (var i = 0; 1 + 2 * i < svgE.length; i++) {
        if(svgE[1 + 2 * i].tagName.toLowerCase() === "circle"){
            //1+2*i is formula for the "(i+1)th" circle
            //we also tell the particles they start at the origin
            var particle1 = new Particle(1, 0, 0, svgE[1 + 2 * i]);

            particle1.setForce(0, -1);
            particle1.setVelocity((Math.random() - .5) * 100, 100);

            particles[i] = particle1;
        } else{
            continue;
        }
    }

    clock_hand.onload = function () {
        clock_hand = clock.contentDocument.getElementById("tick");
        if (clock_radius == null) { //placed here to ensure clock is loaded correctly
            ready = true;
            clock_radius = 250;
        }
    };
}

// physics functions
function physics_timePass() {
    if (time && ready) {
        ready = false;

        //cause passage of time
        for (var i = 0; i < particles.length; i++) {
            particles[i].next();
        }

        clock_update();

        ready = true;
    }
}

function physics_toggleTime(){
    time = !time;
}

// UI Functions
function clock_update(){
    //clock math
    clock_hand.setAttribute("x2", 255.5 + clock_radius * Math.cos(clock_angle_rads));
    clock_hand.setAttribute("y2", 255 - clock_radius * Math.sin(clock_angle_rads));

    clock_hand.setAttribute("x1", 255.5 + clock_radius * Math.cos(clock_angle_rads)/3);
    clock_hand.setAttribute("y1", 255 - clock_radius * Math.sin(clock_angle_rads)/3);

    clock_angle_rads -= (Math.PI / 360) * temporalScale;
}

function clock_pausePlay() {
    if (time) {
        pausePlayer.setAttribute("src", "play.svg");
    } else {
        pausePlayer.setAttribute("src", "pause.svg");
    }

    physics_toggleTime();
}
