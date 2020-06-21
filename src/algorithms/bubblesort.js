export function bubblesort(animations, arr){
  for (let i=0; i<arr.length; i++){
    for (let j=i+1; j<arr.length; j++){
      if (arr[j] < arr[i]){
        swap(animations, arr, i, j);
      } else{
        animations.swapIndex.push(null);
        animations.swapValues.push(null);
      }
      animations.iIndex.push(i);
      animations.jIndex.push(j);
    }
  }
  return animations;
}

function swap(animations, arr, a, b){
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  animations.swapIndex.push([a, b]);
  animations.swapValues.push([arr[a], arr[b]]);
}