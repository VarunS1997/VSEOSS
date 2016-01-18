
var BubbleSort = function () {
    this.done = false;

    this.edge = size - 1;
    this.phase = 1;

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
    if (this.edge == 0) {
        modifyPrimaries(-n1, -n2 + 1);
        this.done = true;
    } else if (n2 == this.edge) {
        this.edge--;
        modifyPrimaries(-n1, -n2 + 1);
    } else {
        modifyPrimaries(1, 1);
    }
}

BubbleSort.prototype.calculateSwap = function () {
    if (data[n1] > data[n2]) {
        swap(n1, n2);
    }
}