//
//globals
//
var timer;
var time; //when to continue 
var speed = 100;
var paused = true; //not ready yet

var size = 15;
var data;

var n1; //primary node pointer
var n2; //secondary node pointer
var auxn; //auxillary node pointer

var algorithm = new InsertionSort(); //set to sorting algorithm's class 
var sort = function () { algorithm.takeStep() ;}; //reference pointer to algorithm stepper 

//
//initializations
//
function init() {
    paused = false;

    //this order because each of these inits needs the previous done
    initDisplay();
    initData();
    initTimer();

    //
    //initialization supplementary functions
    //
    function initDisplay() {
        displayHTML = "";

        for(var i = 0; i < size; i++){
            //both of these in percents
            var boxHeight = ((i+1) * 100 / size) - .5;
            var boxWidth = (100 / size);

            displayHTML += "<rect width='" + boxWidth + "%' ";
            displayHTML += "height='" + boxHeight + "%' ";
            displayHTML += "style='fill:none; stroke: rgba(125, 200, 255, 1); stroke-width:1px' ";
            displayHTML += "x='" + (i*boxWidth) +"%' ";
            displayHTML += "y='" + (100 - boxHeight) + "%'/>";
        }

        document.getElementById("dataDisplay").innerHTML = displayHTML;
    }

    function initData() {
        data = new Array(size);

        for (var i = 0; i < data.length; i++) {
            data[i] = i+1; //makes it so value is box number + 1
        }

        for (var i = 0; i < data.length * 2; i++) {
            var x = Math.trunc(Math.random() * size);
            var y = Math.trunc(Math.random() * size);
            swap(x, y, false);
        }
    }

    function initTimer() {
        time = new Date().getTime() + speed;
        timer = setInterval(function () {
            if (!paused && new Date().getTime() > time) {
                if (algorithm.isDone()) {
                    paused = true;
                    endTimer();
                    return;
                }

                sort();

                time = new Date().getTime() + speed;
            }
        }, 10)
    }

    function endTimer(){
        window.clearInterval(timer);
    }
}

//
//important universal methods
//
function swap(x, y, primaries) {
    if (primaries) {
        var n1n = n1;
        n1 = n2;
        n2 = n1n;
    }

    var z = data[x];
    data[x] = data[y];
    data[y] = z;

    //display stuff
    svgE = document.getElementById("dataDisplay").childNodes;//use converted data indices due to switch (x <-> y) on right side
    svgE[data[x]-1].setAttribute("x",(x*(100/size)) + "%");
    svgE[data[y]-1].setAttribute("x",(y*(100/size)) + "%");

    document.getElementById("dataFeed").innerHTML = data;
}
