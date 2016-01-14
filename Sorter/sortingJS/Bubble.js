
var BubbleSort = function () {
    this.done = false;

    this.edge = size - 1;
    this.swapped = false;
    this.phase = 0;

    //assumed that n1 == 0 && n2 == 1 as per init
}

BubbleSort.prototype.isDone = function () {
    return this.done;
}

BubbleSort.prototype.takeStep = function () {
    if (this.phase == 0) {
        this.setComparision();
        this.phase = 1;
    } else if (this.phase == 1) {
        this.calculateSwap();
        this.phase = 0;
    } else {
        this.phase = 0;
    }
}

BubbleSort.prototype.setComparision = function () {
    if (this.swapped) {
        this.swapped = false;
        modifyPrimaries(n2 - n1, n1 - n2);
    }

    if (this.edge == 0) {
        modifyPrimaries(-n1, -n2 + 1);
        this.done = true;
    } else if (n2 == this.edge) {
        this.edge--;
        modifyPrimaries(-n1, -n2 + 1);
    } else if (this.swapped) {
        this.swapped = false;

        modifyPrimaries(n2 - n1 + 1, n1 - n2 + 1); //add 1 for loop invariant
    } else {
        modifyPrimaries(1, 1);
    }
}

BubbleSort.prototype.calculateSwap = function () {
    if (data[n1] > data[n2]) {
        swap(n1, n2, true);
        this.swapped = true;
    }
}