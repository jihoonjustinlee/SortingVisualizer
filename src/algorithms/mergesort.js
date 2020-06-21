function testmerge(){
	console.log("test");
}

export function mergesort(emptyIndexes, array) {
  var arrays = [array.slice()],
  n = array.length,
  array0 = array,
  array1 = new Array(n);

  for (var m = 1; m < n; m <<= 1) {
    for (var i = 0; i < n; i += (m << 1)) {
      console.log(i);
      merge(emptyIndexes, i, Math.min(i + m, n), Math.min(i + (m << 1), n));
    }
    arrays.push(array1.slice());
    array = array0;
    array0 = array1;
    array1 = array;
  }

function merge(emptyIndexes, left, right, end) {
  // console.log(end);
  for (var i0 = left, i1 = right, j = left; j < end; ++j) {
    // console.log([i0, i1]);
    // console.log(j)
    emptyIndexes.push([i0, i1, end]);
    // console.log([i0, i1]);
    // console.log(j);
    array1[j] = array0[i0 < right && (i1 >= end || array0[i0] <=    array0[i1]) ? i0++ : i1++];
   }
 }
 return arrays;
}  
