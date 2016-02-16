var HeapSort = function () {
    this.done = false;

    this.phase = 0;

    this.upperBound = dataSize - 1;

    this.heapComplete = false;

    this.recursionStack = new Stack();

    //assumed that n1 == 0 && n2 == 1 && auxn == -1 as per init
    //n1 will be first root
    //n2 will be second root
};

HeapSort.prototype.isDone = function () {
    return this.done;
};

HeapSort.prototype.takeStep = function () {
    if (this.phase == 0) {
        this.setNodes();
        this.phase = 1;
    } else if (this.phase == 1) {
        this.calculateSwap(); //this will handle next phase
    } else if (this.phase == 2) {
        this.setupExtraction();
        this.phase = 3;
    } else if (this.phase == 3) {
        this.extractMaxValue();
        this.phase = 0;
    }
};

HeapSort.prototype.setNodes = function () {
    if (auxn == -1) {
        if (dataSize % 2 != 0) {
            modifyPrimaries(-n1 + this.upperBound - 1, -n2 + this.upperBound);
        } else {
            modifyPrimaries(-n1 + this.upperBound, -n2 + this.upperBound + 1);
        }

        modifyAux(-auxn + Math.floor(n1 / 2));
        this.recursionStack.push(auxn);
    } else {
        var nextNode;
        if (this.recursionStack.isEmpty()) {
            nextNode = auxn - 1;
        } else {
            nextNode = this.recursionStack.pop();
        }

        modifyPrimaries(-n1 + 2 * (nextNode + 1) - 1, -n2 + 2 * (nextNode + 1));
        modifyAux(-auxn + nextNode);
    }
};

//this will set next phase in response to state of pointers
HeapSort.prototype.calculateSwap = function () {
    if (n2 > this.upperBound || data[n1] > data[n2]) {
        if (n1 <= this.upperBound && data[auxn] < data[n1]) {
            swap(auxn, n1);
            
            if (2 * (n1 + 1) - 1 <= this.upperBound) { //if has roots
                this.recursionStack.push(n1);
            }

            this.phase = 0;
        } else if (this.heapComplete) {
            this.phase = 2;
            return;
        } else {
            if (auxn == 0) {
                this.heapComplete = true;
                this.phase = 2;
            } else {
                this.phase = 0;
            }
        }
    } else {
        if (data[auxn] < data[n2]) {
            swap(auxn, n2);

            if (2 * (n2 + 1) - 1 <= this.upperBound) { //if has roots
                this.recursionStack.push(n2);
            }

            this.phase = 0;
        } else if (this.heapComplete) {
            this.phase = 2;
            return;
        } else {
            if (auxn == 0) {
                this.heapComplete = true;
                this.phase = 2;
            } else {
                this.phase = 0;
            }
        }
    }
};

HeapSort.prototype.setupExtraction = function () {
    modifyAux(-auxn);
    modifyPrimaries(-n1, -n2 + this.upperBound);
};

HeapSort.prototype.extractMaxValue = function () {
    swap(n1, n2);
    this.recursionStack.push(n1);
    this.upperBound--;

    if (this.upperBound == 0) {
        this.done = true;
        this.recursionStack = null; //to free memory

        modifyAux(-auxn - 1);
        modifyPrimaries(-n1, -n2 + 1);
    }
};