var speed = 1000; //speed between steps, ms

var n1 = 0; //primary node pointer
var n2 = 0; //secondary node pointer
var auxn = -1; //auxillary node pointer

var size = 10;
var data = new Array(size);
for(var i = 0; i < size; i++){
  data[i] = i + 1;
}

for(var i = 0; i < size * 2; i++){
   var x = Math.trunc(Math.random() * size);
   var y = Math.trunc(Math.random() * size);
  
  swap(x, y);
}

var algorithm = insertSort(); //set to sorting algorithm
var sort = function() { algorithm(); }; //reference pointer to algorithm

function swap(x, y){ //useful for various algorithms
  var z = data[x];
  data[x] = data[y];
  data[y] = z;
}

function reset(newSize){
  size = newSize;
  data = new Array(size);
  
  for(var i = 0; i < size; i++){
    data[i] = i + 1;
  }
  
  for(var i = 0; i < size * 2; i++){
     var x = Math.trunc(Math.random() * size);
     var y = Math.trunc(Math.random() * size);
    
    swap(x, y);
  }
}
