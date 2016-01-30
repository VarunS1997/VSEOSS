var InsertionSort = function () {
    this.done = false;

    this.phase = 1;
    this.edge = 1;  //index of last sorted index

    this.swapped = false;

    //assume n1 == 0 and n2 == 1 due to loop invariant
};

InsertionSort.prototype.isDone = function () {
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

InsertionSort.prototype.setComparision = function () {
    if (n1 >= 1) {
        modifyPrimaries(-1, -1);
    } else {
        this.edge++;

        if (this.edge == data.length) {
            this.done = true;
            return;
        }

        modifyPrimaries(-n1 + this.edge - 1, -n2 + this.edge);
    }
};

InsertionSort.prototype.calculateSwap = function () {
    if (data[n1] > data[n2]) {
        swap(n1, n2);
    } else {
        modifyPrimaries(-n1, -n2 + 1);
    }
};
