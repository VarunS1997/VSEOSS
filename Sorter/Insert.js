
var InsertionSort = function () {
    this.done = false;

    this.phase = 2;

    this.swapping = true;

    n1 = 0;
    n2 = 1;
};

InsertionSort.prototype.isDone = function(){
    return this.done;
};

InsertionSort.prototype.takeStep = function () {
    if (this.phase == 1) {
        this.setComparision();
    } else if (this.phase == 2) {
        this.calculateSwap();
    } else {
        this.phase = 1;
    }
};

//fix these
InsertionSort.prototype.setComparision = function () {
    
};

InsertionSort.prototype.calculateSwap = function () {

};