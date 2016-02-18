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
    //need to figure out how to make in-place without loss of algorithm clarity
    //potentially skip steps and show only completely sorted merges
    //store working array "behind the scenes"/in local scope only
    //and force working array pattern onto global data array
    //show pointers to ends of merged lists
    //else, two stacks, one per sublist
};