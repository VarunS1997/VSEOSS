//
//globals
//
var timer;
var time; //when to continue 
var speed = 10000;
var paused = true; //not ready yet

var dataSize = 100;
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
    if (timer) {
        endTimer();
    }
	
    paused = false;
    n1 = 0;
    n2 = 1;
    auxn = -1;

    document.getElementById("speedInput").setAttribute("value", speed);
    document.getElementById("sizeInput").setAttribute("value", dataSize);

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

        for (var i = 0; i < dataSize; i++) {
            //all of these in percents
            var boxHeight = ((i + 1) * 100 / dataSize) - .5;
            var borderWidth = .2;
            var totalWidth = (100 / dataSize);

            if(boxHeight < 0) {
                boxHeight = 0;
            }

            displayHTML += "<rect width='" + (totalWidth - borderWidth/2) + "%' ";
            displayHTML += "height='" + boxHeight + "%' ";
            displayHTML += "style='fill:none; ";
            displayHTML += "stroke: rgba(125, 200, 255, 1); ";
            displayHTML += "stroke-width: "+ borderWidth + "%' ";
            displayHTML += "x='" + (i * totalWidth) + "%' ";
            displayHTML += "y='" + (100 - boxHeight) + "%'/>";
        }

        document.getElementById("dataDisplay").innerHTML = displayHTML;
    }

    function initData() {
        data = new Array(dataSize);

        for (var i = 0; i < data.length; i++) {
            data[i] = i + 1; //makes it so value is box number + 1
        }

        //randomize
        for (var i = 0; i < data.length * 2; i++) {
            var x = Math.floor(Math.random() * dataSize);
            var y = Math.floor(Math.random() * dataSize);
            swap(x, y);
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
        }, 0)
    }

    function endTimer() {
        window.clearInterval(timer);
    }
}

//
//important universal methods
//
function isLegalIndex(n){
    return (n <= dataSize - 1) && (n >= 0);
}

function swap(x, y) {
    if(x == y){
        return;
    }

    var z = data[x];
    data[x] = data[y];
    data[y] = z;

    //display stuff
    svgE = document.getElementById("dataDisplay").childNodes; //use original data indices due to switch (x <-> y) on right side
    svgE[data[x] - 1].setAttribute("x", (x * (100 / dataSize)) + "%");
    svgE[data[y] - 1].setAttribute("x", (y * (100 / dataSize)) + "%");
}

//only use if compared boxes have changed
function modifyPrimaries(n1Mod, n2Mod) {
    svgE = document.getElementById("dataDisplay").childNodes;
    if (isLegalIndex(n1)) {
        svgE[data[n1] - 1].style.stroke = "rgba(125, 200, 255, 1)";
    }
    if (isLegalIndex(n2)) {
        svgE[data[n2] - 1].style.stroke = "rgba(125, 200, 255, 1)";
    }

    n1 = n1 + n1Mod;
    n2 = n2 + n2Mod;
    if(isLegalIndex(n1)){
        svgE[data[n1] - 1].style.stroke = "rgba(255, 75, 75, 1)";   
    }

    if(isLegalIndex(n2)){
        svgE[data[n2] - 1].style.stroke = "rgba(75, 255, 75, 1)";   
    }
}

function modifyAux(auxMod){
    svgE = document.getElementById("dataDisplay").childNodes;
    if(isLegalIndex(auxn)){
        svgE[data[auxn] - 1].style.stroke = "rgba(125, 200, 255, 1)";
    }

    auxn = auxn + auxMod;

    if (isLegalIndex(auxn)) {
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
    } else if (str == "heap" && !(algorithm instanceof HeapSort)) {
        paused = true;
        algorithm = new HeapSort();
        init();
    } else if(str == "selection" && !(algorithm instanceof SelectionSort)){
        paused = true;
        algorithm = new SelectionSort();
        init();
    }
}

function changeSize(n){
    if(n == dataSize){
        return;
    }

    paused = true;
    dataSize = n;

    reinit();
}

function reinit(){
    if (algorithm instanceof InsertionSort) {
        algorithm = new InsertionSort();
        init();
    } else if (algorithm instanceof BubbleSort) {
        algorithm = new BubbleSort();
        init();
    } else if (algorithm instanceof CocktailSort) {
        algorithm = new CocktailSort();
        init();
    } else if (algorithm instanceof QuickSort) {
        algorithm = new QuickSort();
        init();
    } else if (algorithm instanceof HeapSort) {
        algorithm = new HeapSort();
        init();
    } else if(algorithm instanceof SelectionSort){
        algorithm = new SelectionSort();
        init();
    }
}

function forceStep(){
    paused = true;
    algorithm.takeStep();
    time = new Date().getTime() + speed;
    paused = false;
}