var Stack = function () {
    this.first = null; //pointer to top of stack
};

Stack.prototype.isEmpty = function () {
    return this.first == null;
};

Stack.prototype.push = function (dataArray) {
    this.first = new this.Node(dataArray, this.first);
};

Stack.prototype.pop = function () {
    if (this.isEmpty()) {
        console.log("Attempted illegal pop");
        return false;
    }

    var oldFirst = this.first.dataArray;
    this.first = this.first.next;
    return oldFirst;
};

Stack.prototype.peek = function () {
    return this.first.dataArray;
}

//node-based implementation requires basic "Node" nested class primarily for OOP cleanliness and performance gains due to this project's conventions
Stack.prototype.Node = function (dataArray, next) {
    this.dataArray = dataArray; //just data

    this.next = next; //key to stack implementation
};