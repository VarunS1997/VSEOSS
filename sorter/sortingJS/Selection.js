var SelectionSort = function () {
    this.done = false;

    this.phase = 1;
    this.lastSortedIndex = 0;

    //assumed that n1 == 0 && n2 ==1
    //n1 points at lowest data value so far
    //n2 points at data currently being checked
};

SelectionSort.prototype.isDone = function () {
    return this.done;
};

SelectionSort.prototype.takeStep = function () {
    if (this.phase == 0) {
        this.setComparision(); //will set next phase
    } else if (this.phase == 1) {
        this.calculateSwap();
        this.phase = 0;
    } else if (this.phase == 2) {
        this.swapMin();
        this.phase = 1;
    }
};

SelectionSort.prototype.setComparision = function () {
    if (n1 < this.lastSortedIndex) {
        modifyPrimaries(1, -n2 + n1 + 1);
    } else if (n2 >= dataSize - 1) { //last index already compared
        modifyPrimaries(0, -n2 + this.lastSortedIndex);
        this.phase = 2;
    } else {
        modifyPrimaries(0, 1);
        this.phase = 1;
    }
};

SelectionSort.prototype.calculateSwap = function () {
    if (data[n1] > data[n2]) {
        modifyPrimaries(-n1 + n2, 0);
    }
};

SelectionSort.prototype.swapMin = function () {
    swap(n1, n2);
    this.lastSortedIndex++;
};
