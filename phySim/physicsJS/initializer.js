// simulation Physics

// physics globals
var particles;
var totalKE = 0;

var ticker = setInterval(physics_timePass, 7); //7 ms because it increases animation fluidity
var ready = false; //ready to pass time?

var worldX; //size of world in X direction
var worldY; //size of world in y direction

var collisions = false;

//UI globals
var clock_angle_rads = Math.PI / 2; //angle of clock hand in radiants
var clock_radius; //radius of clock
var clock_hand; //clock hand

var UIFeeds = [];

var pausePlayer;

console.log("Loaded Physics Engine");

function init(){
    console.log("Initializing Physics Engine...");

    // create particles and apply initial conditions
    physics_init();

    UI_init();

    console.log("Physics Engine Ready");
    console.log("Collisions: " + (collisions ? "ON" : "OFF") + " --- Time: " + (time ? "ON" : "OFF"));
};

// physics functions
function physics_init(){
    var svgE = document.getElementById("particleCanvas").childNodes;
    particles = [svgE.length];

    worldX = document.getElementById("particleCanvas").clientWidth;
    worldY = document.getElementById("particleCanvas").clientHeight;

    for (var i = 0; 1 + 2 * i < svgE.length; i++) {
        if(svgE[1 + 2 * i].tagName != null && svgE[1 + 2 * i].tagName.toLowerCase() === "circle"){
            //1+2*i is formula for the "(i+1)th" circle
            //we also tell the particles they start at the origin
            var radius = parseInt(svgE[1 + 2 * i].getAttribute("r"));
            var xPos = (parseInt(svgE[1 + 2 * i].getAttribute("cx")) - 50) * spacialScale;
            var yPos = (parseInt(svgE[1 + 2 * i].getAttribute("cy")) - 50) * spacialScale;

            var particle1 = new Particle(1, xPos, yPos, radius, svgE[1 + 2 * i]);

            particle1.setForce(0, -0 * particle1.mass);
            particle1.setCOR(1);
            particle1.setVelocity((Math.random() - .5) * 100, (Math.random() - .5) * 10);

            particles[i] = particle1;
        } else{
            continue;
        }
    }

    setTimeout(function(){ physics_toggleCollisions(); }, 1000 * 1/temporalScale);
};

function physics_timePass() {
    if (time && ready) {
        ready = false;

        //check collisions
        for (var i = 0; i < particles.length; i++) {
            for(var j = i+1; j < particles.length; j++){
                if(collisions && particles[i].isColliding(particles[j])){
                    particles[i].collidedPart = particles[j].clone();
                    particles[j].collidedPart = particles[i].clone();
                }
            }
        }

        totalKE = 0;
        //cause passage of time
        for(var i = 0; i < particles.length; i++){
            particles[i].experienceTime();
            totalKE += .5 * particles[i].mass + particles[i].velX * particles[i].velX + particles[i].velY * particles[i].velY;
        }
        totalKE = Math.round(totalKE * 1000) / 1000;

        UI_update();

        ready = true;
    }
};

function physics_updateSize(){
    worldX = document.getElementById("particleCanvas").clientWidth;
    worldY = document.getElementById("particleCanvas").clientHeight;
};

function physics_toggleTime(){
    time = !time;
    console.log("Time: " + (time ? "ON" : "OFF"));
};

function physics_toggleCollisions(){
    collisions = !collisions;
    console.log("Collisions: " + (collisions ? "ON" : "OFF"));
};
// UI Functions
function UI_init(){
    clock_hand = document.getElementById("clock");

    pausePlayer = document.getElementById("pausePlay");

    UIFeeds = document.getElementsByClassName("ui-feed");

    pausePlayer.addEventListener("click", UI_pausePlay);

    clock_hand.onload = function () {
        clock_hand = clock.contentDocument.getElementById("tick");
        if (clock_radius == null) { //placed here to ensure clock is loaded correctly
            ready = true;
            clock_radius = 250;
        }
    };
};

function UI_update(){
    UI_updateClock();
    UI_updateFeeds();
};

function UI_updateClock(){
    //clock math
    clock_hand.setAttribute("x2", 255.5 + clock_radius * Math.cos(clock_angle_rads));
    clock_hand.setAttribute("y2", 255 - clock_radius * Math.sin(clock_angle_rads));

    clock_hand.setAttribute("x1", 255.5 + clock_radius * Math.cos(clock_angle_rads)/3);
    clock_hand.setAttribute("y1", 255 - clock_radius * Math.sin(clock_angle_rads)/3);

    clock_angle_rads -= (Math.PI / 360) * temporalScale;
};

function UI_updateFeeds(){
    //remove all elements, then add new info
    var currentFeed;
    var typeOfData;
    var newData;

    for(var i = 0; i < UIFeeds.length; i++){
        currentFeed = UIFeeds[i];

        while(currentFeed.firstChild){
            currentFeed.removeChild(currentFeed.firstChild);
        }

        typeOfData = currentFeed.id;

        if(typeOfData.includes("KE")){
            newData = document.createTextNode(totalKE + " J");
        } else{
            newData = document.createTextNode("Error: Unknown Feed");
        }

        currentFeed.appendChild(newData);
    }
};

function UI_pausePlay() {
    if (time) {
        pausePlayer.setAttribute("src", "play.svg");
    } else {
        pausePlayer.setAttribute("src", "pause.svg");
    }

    physics_toggleTime();
};
