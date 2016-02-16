var MergeSort = function () {
    this.done = false;

    this.phase = 0;
    this.listSize = 1;
    this.rightStart = 1; //to prevent overflow

    //assumed that n1 == 0 && n2 == 1 as per init
};

MergeSort.prototype.isDone = function () {
    return this.done;
};

MergeSort.prototype.takeStep = function () {
    //need to figure out how to make in-place
};