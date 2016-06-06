//
//globals
//
var timer;
var time; //when to continue
var speed = 100;

var paused = true; //not ready yet

var fillBoxes = false;
var randomness = 1;

var dataSize = 100;
var data; //intended to be "linked" to a visual data representation

var n1; //primary node pointer
var n2; //secondary node pointer
var auxn; //auxillary node pointer

var algorithm = new QuickSort(); //set to sorting algorithm's class
var sort = function () { algorithm.takeStep(); }; //reference pointer to algorithm stepper

var COLORS = {
    BLUE: "rgb(125, 200, 255)",
    RED: "rgb(255, 75, 75)",
    GREEN: "rgb(75, 255, 75)",
    YELLOW: "rgb(255, 255, 75)"
};

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
    document.getElementById("randomnessInput").setAttribute("value", randomness * 100);
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
            var borderWidth = dataSize >= 1000 ? (dataSize >= 10000 ? 0.05 : 0.1) : 0.2;
            var totalWidth = (100 / dataSize);

            var boxHeight = ((i + 1) * 100 / dataSize) - 0.5;
            var boxWidth = totalWidth - borderWidth / 2;

            if (boxHeight < 0) {
                boxHeight = 0;
            }

            displayHTML += "<rect width='" + ((boxWidth <= 0) ? borderWidth : boxWidth) + "%' ";
            displayHTML += "height='" + boxHeight + "%' ";
            displayHTML += "style='fill:none; ";
            displayHTML += "stroke: " + COLORS.BLUE + "; ";
            displayHTML += "stroke-width: " + borderWidth + "%' ";
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
        for (var i = 0; i < data.length; i++) {
            if (isNaN(randomness) || Math.random() > randomness) {
                continue;
            }
            var y = Math.floor(Math.random() * dataSize);
            swap(i, y);
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
function isLegalIndex(n) {
    return (n <= dataSize - 1) && (n >= 0);
}

function swap(x, y) {
    if (x == y) {
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
        svgE[data[n1] - 1].style.stroke = COLORS.BLUE;

        if (fillBoxes) {
            svgE[data[n1] - 1].style.fill = COLORS.BLUE;
        }
    }
    if (isLegalIndex(n2)) {
        svgE[data[n2] - 1].style.stroke = COLORS.BLUE;

        if (fillBoxes) {
            svgE[data[n2] - 1].style.fill = COLORS.BLUE;
        }
    }

    n1 = n1 + n1Mod;
    n2 = n2 + n2Mod;

    if (isLegalIndex(n1)) {
        svgE[data[n1] - 1].style.stroke = COLORS.RED;

        if (fillBoxes) {
            svgE[data[n1] - 1].style.fill = COLORS.RED;
        }
    }

    if (isLegalIndex(n2)) {
        svgE[data[n2] - 1].style.stroke = COLORS.GREEN;

        if (fillBoxes) {
            svgE[data[n2] - 1].style.fill = COLORS.GREEN;
        }
    }
}

function modifyAux(auxMod) {
    svgE = document.getElementById("dataDisplay").childNodes;
    if (isLegalIndex(auxn)) {
        svgE[data[auxn] - 1].style.stroke = COLORS.BLUE;

        if (fillBoxes) {
            svgE[data[auxn] - 1].style.fill = COLORS.BLUE;
        }
    }

    auxn = auxn + auxMod;

    if (isLegalIndex(auxn)) {
        svgE[data[auxn] - 1].style.stroke = COLORS.YELLOW;

        if (fillBoxes) {
            svgE[data[auxn] - 1].style.fill = COLORS.YELLOW;
        }
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
    } else if (str == "selection" && !(algorithm instanceof SelectionSort)) {
        paused = true;
        algorithm = new SelectionSort();
        init();
    }
}

function changeSize(n) {
    if (n == dataSize) {
        return;
    }

    paused = true;
    dataSize = n;

    reinit();
}

function reinit() {
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
    } else if (algorithm instanceof SelectionSort) {
        algorithm = new SelectionSort();
        init();
    }
}

function forceStep() {
    algorithm.takeStep();
    time = new Date().getTime() + speed;
}

function setFill(bool) {
    if (fillBoxes != bool) {
        paused = true;
        fillBoxes = bool;

        svgE = document.getElementById("dataDisplay").childNodes;
        for (var i = 0; i < svgE.length; i++) {
            if (i != data[n1] - 1 && i != data[n2] - 1 && i != data[auxn] - 1) {
                svgE[i].style.fill = fillBoxes ? COLORS.BLUE : "none";
            } else if (i == data[n1] - 1) {
                svgE[data[n1] - 1].style.fill = fillBoxes ? COLORS.RED : "none";
            } else if (i == data[n2] - 1) {
                svgE[data[n2] - 1].style.fill = fillBoxes ? COLORS.GREEN : "none";
            } else if (i == data[auxn] - 1) {
                svgE[data[auxn] - 1].style.fill = fillBoxes ? COLORS.YELLOW : "none";
            }
        }

        paused = false;
    }
}

function pausePlay() {
    paused = !paused;
    document.getElementById("pausePlayButton").innerHTML = paused ? "Play" : "Pause";
}
