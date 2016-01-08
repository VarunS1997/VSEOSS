//initializations
var speed = 1000; //speed between steps, ms
var paused = false;

var n1 = 0; //primary node pointer
var n2 = 0; //secondary node pointer
var auxn = -1; //auxillary node pointer

var size = 10;
var data = new Array(size);
for (var i = 0; i < size; i++) {
    data[i] = i + 1;
}

for (var i = 0; i < size * 2; i++) {
    var x = Math.trunc(Math.random() * size);
    var y = Math.trunc(Math.random() * size);

    swap(x, y);
}

var algorithm = InsertionSort; //set to sorting algorithm's class
var sort = function () { algorithm.takeStep(); }; //reference pointer to algorithm stepper
var timer = setInterval(function () {
    var time = new Date().getTime() + speed; //when to continue

    while (!paused) {
        if (new Date().getTime() > time) {

            sort();

            if (algorithm.isDone()) {
                paused = true;
            }

            new Date().getTime() + speed;
        }
    }
}, 10)



//important universal methods
function sorted() {
    for (var i = 1; i < data.length; i++) {
        if (data[i] < data[i - 1]) {
            return false;
        }
    }
    return true;
}

function swap(x, y, primaries) { //useful for various algorithms
    if (primaries) {
        n1 = y;
        n2 = x;
    }
    var z = data[x];
    data[x] = data[y];
    data[y] = z;
}

function reset(newSize) {
    size = newSize;
    data = new Array(size);

    for (var i = 0; i < size; i++) {
        data[i] = i + 1;
    }

    for (var i = 0; i < size * 2; i++) { //randomize
        var x = Math.trunc(Math.random() * size);
        var y = Math.trunc(Math.random() * size);

        swap(x, y, false);
    }
}
