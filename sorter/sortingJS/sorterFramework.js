//
//globals
//
var timer;
var time; //when to continue 
var speed = 400;
var paused = true; //not ready yet

var size = 20;
var data; //intended to be "linked" to a visual data representation

var n1; //primary node pointer
var n2; //secondary node pointer
var auxn; //auxillary node pointer

var algorithm = new QuickSort(); //set to sorting algorithm's class 
var sort = function () { algorithm.takeStep(); }; //reference pointer to algorithm stepper 

//
//initializations
//
function init() {
    paused = false;
    n1 = 0;
    n2 = 1;
    auxn = -1;

    var s = new Stack();
    for (var i = 0; i < 10; i++) {
        s.push(i);
    }
    console.log(s.peek());

    if (timer) {
        clearInterval(timer);
    }

    //this order because each of these inits needs the previous done
    initDisplay();
    initData();
    initTimer();

    //color
    modifyPrimaries(0, 0);

    //
    //initialization supplementary functions
    //
    function initDisplay() {
        displayHTML = "";

        for (var i = 0; i < size; i++) {
            //both of these in percents
            var boxHeight = ((i + 1) * 100 / size) - .5;
            var boxWidth = (100 / size);

            displayHTML += "<rect width='" + boxWidth + "%' ";
            displayHTML += "height='" + boxHeight + "%' ";
            displayHTML += "style='fill:none; ";
            displayHTML += "stroke: rgba(125, 200, 255, 1); ";
            displayHTML += "stroke-width: "+ (3 - Math.floor(size/150)) + "px' ";
            displayHTML += "x='" + (i * boxWidth) + "%' ";
            displayHTML += "y='" + (100 - boxHeight) + "%'/>";
        }

        document.getElementById("dataDisplay").innerHTML = displayHTML;
    }

    function initData() {
        data = new Array(size);

        for (var i = 0; i < data.length; i++) {
            data[i] = i + 1; //makes it so value is box number + 1
        }

        //randomize
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

    function endTimer() {
        window.clearInterval(timer);
    }
}

//
//important universal methods
//
function swap(x, y) {
    if(x == y){
        return;
    }

    var z = data[x];
    data[x] = data[y];
    data[y] = z;

    //display stuff
    svgE = document.getElementById("dataDisplay").childNodes; //use original data indices due to switch (x <-> y) on right side
    svgE[data[x] - 1].setAttribute("x", (x * (100 / size)) + "%");
    svgE[data[y] - 1].setAttribute("x", (y * (100 / size)) + "%");

    var numberFeed = "";
    for(var i = 0; i < data.length; i++){
        numberFeed += data[i] + " | ";
    }
    document.getElementById('dataFeed').innerHTML = numberFeed;
}

//only use if compared boxes have changed
function modifyPrimaries(n1Mod, n2Mod) {
    svgE = document.getElementById("dataDisplay").childNodes;
    if (n1 <= size - 1) {
        svgE[data[n1] - 1].style.stroke = "rgba(125, 200, 255, 1)";
    }
    if (n2 <= size - 1) {
        svgE[data[n2] - 1].style.stroke = "rgba(125, 200, 255, 1)";
    }

    n1 = n1 + n1Mod;
    n2 = n2 + n2Mod;
    if(n1 <= size - 1){
        svgE[data[n1] - 1].style.stroke = "rgba(255, 75, 75, 1)";   
    }

    if(n2 <= size - 1){
        svgE[data[n2] - 1].style.stroke = "rgba(75, 255, 75, 1)";   
    }
}

function modifyAux(auxMod){
    svgE = document.getElementById("dataDisplay").childNodes;
    if(auxn > 0){
        svgE[data[auxn] - 1].style.stroke = "rgba(125, 200, 255, 1)";
    }

    auxn = auxn + auxMod;

    if (auxn > 0) {
        svgE[data[auxn] - 1].style.stroke = "rgba(255, 255, 75, 1)";
    }
}

//
// User I/O Functions
//

function changeAlgorithm(str) {
    str = str.toLowerCase();
    if (str == "insertion" && !(algorithm instanceof InsertionSort)) {
        paused = true;
        algorithm = new InsertionSort();
        init();
    } else if (str == "bubble" && !(algorithm instanceof BubbleSort)) {
        paused = true;
        algorithm = new BubbleSort();
        init();
    } else if (str == "cocktail" && !(algorithm instanceof CocktailSort)) {
        paused = true;
        algorithm = new CocktailSort();
        init();
    } else if (str == "quick" && !(algorithm instanceof QuickSort)) {
        paused = true;
        algorithm = new QuickSort();
        init();
    }
}