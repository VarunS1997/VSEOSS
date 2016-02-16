var QuickSort = function () {
    this.done = false;

    this.phase = 0;

    this.recursionStack = new Stack(); //a stack to simulate recursion; contains indices
    this.recursionStack.push([0, dataSize - 1]); //the stack will contain the start and end of each recursion in a 2 element array

    //assumed that n1 == 0 && n2 == 1 && auxn == -1 as per init
    //n1 will be lower half index
    //n2 will be upper half index
};

QuickSort.prototype.splitStackNode = function (index) {
    var oldNode = this.recursionStack.pop();

    //new "recursion nodes", excluding index of split (it's in final position)
    this.recursionStack.push([index + 1, oldNode[1]]);
    this.recursionStack.push([oldNode[0], index - 1]);
};

QuickSort.prototype.isDone = function () {
    return this.done;
};

QuickSort.prototype.takeStep = function () {
    if (this.phase == 0) {
        this.setPivot();
        this.phase = 1;
    } else if (this.phase == 1) {
        this.partitionStep();
    } else if (this.phase == 2) {
        this.prepareNextRecursion();
        this.phase = 0;
    }
};

QuickSort.prototype.setPivot = function () {
    modifyPrimaries(this.recursionStack.peek()[0] - n1, -n2 + this.recursionStack.peek()[1] - 1);
    modifyAux(this.recursionStack.peek()[1] - auxn);
};

//this is only non-"takeStep" function that can change phase 1 to 2 to simulate loop iteration through array
QuickSort.prototype.partitionStep = function () {
    var n1Attention = data[auxn] < data[n1];
    var n2Attention = data[auxn] > data[n2];

    if (n1Attention && n2Attention) {
        swap(n1, n2);
        modifyPrimaries(1, -1);
    } else {
        modifyPrimaries(n1Attention ? 0 : 1, n2Attention ? 0 : -1);
    }

    if (n1 >= n2) { //done partitioning, prepare for next phase
        if (data[auxn] < data[n1]) {
            modifyPrimaries(0, -n2 + n1 + 1);
        } else {
            modifyPrimaries(1, -n2 + n1 + 2);
        }

        this.phase = 2;
    }
};

QuickSort.prototype.prepareNextRecursion = function () {
    swap(n1, auxn);
    this.splitStackNode(n1);

    var nextRecursion = this.recursionStack.peek();
    while (nextRecursion == null || nextRecursion[1] - nextRecursion[0] < 2) { //3 elements, minimum dataSize
        if (nextRecursion[1] - nextRecursion[0] == 1) { //two elements
            if (data[nextRecursion[1]] < data[nextRecursion[0]]) {
                modifyPrimaries(-n1 + nextRecursion[1], -n2 + nextRecursion[0]);
                swap(n1, n2);
            }
        }
        this.recursionStack.pop();
        nextRecursion = this.recursionStack.peek();

        if (this.checkCompletion()) {
            return;
        }
    }
}

QuickSort.prototype.checkCompletion = function () {
    if (this.recursionStack.isEmpty()) {
        this.done = true;
        this.recursionStack = null; //to free memory

        modifyPrimaries(-n1, -n2 + 1);
        modifyAux(-auxn - 1);
        return true;
    } else {
        return false;
    }
}