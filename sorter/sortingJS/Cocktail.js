var CocktailSort = function () {
    this.done = false;

    this.upEdge = size - 1;
    this.lowEdge = 0;

    this.goingUp = true;

    this.phase = 1;

    //assumed that n1 == 0 && n2 == 1 as per init
};

CocktailSort.prototype.isDone = function () {
    return this.done;
};

CocktailSort.prototype.takeStep = function () {
    if (this.phase == 0) {
        this.setComparision();
        this.phase = 1;
    } else if (this.phase == 1) {
        this.calculateSwap();
        this.phase = 0;
    } else {
        phase == 0;
    }
};

CocktailSort.prototype.setComparision = function () {
    if (this.goingUp) {
        modifyPrimaries(1, 1);
    } else {
        modifyPrimaries(-1, -1);
    }

    if (this.upEdge == this.lowEdge) {
        modifyPrimaries(-n1, -n2 + 1);
        this.done = true;
    }
};

CocktailSort.prototype.calculateSwap = function () {
    if (data[n1] > data[n2]) {
        swap(n1, n2);
    }

    if (this.goingUp && n2 == this.upEdge) {
        this.upEdge--;
        this.goingUp = false;
    } else if (!this.goingUp && n1 == this.lowEdge) {
        this.lowEdge++;
        this.goingUp = true;
    }
};