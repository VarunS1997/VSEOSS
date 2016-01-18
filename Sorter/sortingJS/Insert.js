
var InsertionSort = function () {
    this.done = false;

    this.phase = 2;
    this.edge = 0;  //index of last sorted index

    this.swapped = false;

    n1 = 0;
    n2 = 1;
    auxn = -1;
};

InsertionSort.prototype.isDone = function(){
    return this.done;
};

InsertionSort.prototype.takeStep = function () {
    if (this.phase == 0) {
        this.setComparision();
        this.phase = 1;
    } else if (this.phase == 1) {
        this.calculateSwap();
        this.phase = 0;
    } else {
        this.phase = 0;
    }
};

//fix these
InsertionSort.prototype.setComparision = function () {
    if (this.swapped && n2 != 0) {
        var old = n2; //switch n1/n2 because swap switches n1/n2 to make it visually clearer what happened
        n2 = n1;
        n1 = old;

        n1--;
        n2--;
    } else {
        this.edge++;

        if (this.edge == data.length) {
            this.done = true;
            return;
        }

        n1 = this.edge;
        n2 = n1 + 1;
    }
};

InsertionSort.prototype.calculateSwap = function () {
    if (data[n1] > data[n2]) {
        this.swapped = true;
        swap(n1, n2, true);
    } else {
        this.swapped = false;
    }
};