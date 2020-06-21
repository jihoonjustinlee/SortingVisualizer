import React from 'react';
import './QuickSortRegion.css';

function QuickSortRegion(props){
  return(
    <div className="quicksort-region">
      <div className="description">
        <div>Quick Sort</div>
        <div>Total Bars: {props.bars}</div>
      </div>
      <div className="wrapper">
        <div className="region-color i"></div>
        <div className="label">i = {props.i} </div>
      </div>
      <div className="wrapper">
        <div className="region-color swap-index"></div>
        <div className="label">Swap Index = {props.swap_index}</div>
      </div>
      <div className="wrapper">
        <div className="region-color partition-index"></div>
        <div className="label">Partition Index = {props.partition_index}</div>
      </div>
    </div>
  );
}

export default QuickSortRegion;