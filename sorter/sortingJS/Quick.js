var QuickSort = function () {
    this.done = false;

    this.phase = 1;
    this.pivot = size - 1;

    this.recursionStack = new Stack(); //a stack to simulate recursion; contains indices
    this.recursionStack.push([0, size - 1]);

    //assumed that n1 == 0 && n2 == 1 as per init
    //n1 will be pivot
    //n2 will be index
};

QuickSort.prototype.splitStackNode = function () {
    var oldNode = this.recursionStack.pop();

    //if odd, greater side is larger
    var halfwayIndex = Math.ceil((oldNode[1] + oldNode[0]) / 2);

    //new Node data
    this.recursionStack.push([halfwayIndex, oldNode[1]]);
    this.recursionStack.push([oldNode[0], halfwayIndex-1]);
};

QuickSort.prototype.isDone = function () {
    return this.done;
};

QuickSort.prototype.takeStep = function () {
    //do lower partition first, then upper partition

    //3 phases?
    //0: Set Pivot to max index of partition
    //1: partition (repeated, one at a time)
    //2: swap pivot with lowestHighVal of partition
};

QuickSort.prototype.setPivot = function () {
    this.recursionStack.peek();
};

//this is only function that can change phase 1 to 2 to simulate loop iteration through array
QuickSort.prototype.partitionStep = function () {

};