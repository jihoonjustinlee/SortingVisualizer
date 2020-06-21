export function quicksort(animations, arr, start, end){
  if (start >= end){
    return;
  }
  let partitionIndex =  partition(animations, arr, start, end);
  quicksort(animations, arr, start, partitionIndex-1);
  quicksort(animations, arr, partitionIndex+1, end);
  return animations;
}

function partition(animations, arr, start, end){
  let pivotIndex = start;
  let pivotValue = arr[end];
  for (let i=start; i<end; i++){
    if (arr[i] < pivotValue){
      swap(animations, arr, i, pivotIndex);
      pivotIndex++;
    } else{
      animations.swapIndexes.push(null);
      animations.values.push(null);
    }
    animations.pivotIndex.push(pivotIndex);
    animations.indexes.push(i);
    animations.pivotEnd.push(end);
  }
  swap(animations, arr, pivotIndex, end);
  animations.indexes.push(pivotIndex);
  animations.pivotIndex.push(pivotIndex);
  animations.pivotEnd.push(end);
  return pivotIndex;
}

function swap(animations, arr, a, b){
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  animations.swapIndexes.push([a, b]);
  animations.values.push([arr[a], arr[b]]);
}
