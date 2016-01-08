//initializations
var speed = 1000; //speed between steps, ms
var paused = false;

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

//MAYBE IMPLEMENT AS OOP??? ADD DONE INSTANCE VARIABLE? ELSE MORE CALCULATIONS TO CHECK SORTED (line 33)
var algorithm = insertStep(); //set to sorting algorithm's step procedure
var sort = function() { algorithm(); }; //reference pointer to algorithm
var timer = setInterval(function(){
  var time = new Date().getTime() + speed; //when to continue
  
  while(!paused){
    if(new Date().getTime() > time){
      
      sort();
      
      if(sorted()){
        paused = true;
      }
      
      new Date().getTime() + speed;
  }
}, 10)



//important universal methods
function sorted(){
  for(var i = 1; i < data.length; i++){
    if(data[i] < data[i-1]){
      return false;
    }
  }
  return true;
}

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
  
  for(var i = 0; i < size * 2; i++){ //randomize
     var x = Math.trunc(Math.random() * size);
     var y = Math.trunc(Math.random() * size);
    
    swap(x, y);
  }
}
