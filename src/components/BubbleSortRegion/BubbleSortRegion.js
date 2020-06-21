import React from 'react';
import './BubbleSortRegion.css';

function BubbleSortRegion(props){
  return(
    <div className="bubblesort-region">
      <div className="description">
        <div>Bubble Sort</div>
        <div>Total Bars: {props.bars}</div>
      </div>
      <div className="wrapper">
        <div className="region-color i"></div>
        <div className="label">i = {props.i}</div>
      </div>
      <div className="wrapper">
        <div className="region-color j"></div>
        <div className="label">j = {props.j}</div>
      </div>
    </div>
  );
}

export default BubbleSortRegion;