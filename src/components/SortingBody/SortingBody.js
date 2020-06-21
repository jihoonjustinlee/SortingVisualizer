import React from 'react';
import './SortingBody.css';
import './bubblesort.css';
import './quicksort.css';
import './mergesort.css';
import BubbleSortRegion from '../BubbleSortRegion/BubbleSortRegion';
import QuickSortRegion from '../QuickSortRegion/QuickSortRegion';
import MinMaxInput from '../MinMaxInput/MinMaxInput';
import { quicksort  } from '../../algorithms/quicksort.js';
import { bubblesort } from '../../algorithms/bubblesort.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import { mergesort } from '../../algorithms/mergesort.js';

class SortingBody extends React.Component{
  constructor(props){
    super(props)
    this.timer = [];
    this.state = {
      bars: 5,
      array: [],
      timeDelay: 1500,
      minNum: 10,
      maxNum: 500,
      minmaxinput_opened: false,
      showBarLabel: true,
      disableUI: false,
      algorithm: '',
      bubblesort_i: '',
      bubblesort_j: '',
      quicksort_i: '',
      quicksort_swap_index: '',
      quicksort_partition_index: ''
    };
  }

  componentDidMount(){
    this.randomizeArray();
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  handleWindowResize(){
    const bar = document.getElementsByClassName('bar')[0];
    if (bar.offsetWidth <= 28){
      this.setState({showBarLabel: false});
    } else{
      this.setState({showBarLabel: true});
    }
  }

  randomizeArray(){
    const tempArray = [];
    for (let i=0; i<this.state.bars; i++){
      tempArray.push(getRandomizedNumberFromInterval(this.state.minNum, this.state.maxNum));
    } 
    this.setState({
      array: tempArray
    });
  }

  addElementToArray(){
    const bar = document.getElementsByClassName('bar')[0];
    if (bar.offsetWidth <= 28){
      this.setState({showBarLabel: false});
    } else{
      this.setState({showBarLabel: true});
    }
    const newVal = getRandomizedNumberFromInterval(this.state.minNum, this.state.maxNum);
    this.setState(prevState => ({
      bars: prevState.bars + 1,
      array: [...prevState.array, newVal]
    }))
  }

  removeElementFromArray(){
    if (this.state.array.length > 2){
      const bar = document.getElementsByClassName('bar')[0];
      if (bar.offsetWidth > 28){
        this.setState({showBarLabel: true});
      } else{
        this.setState({showBarLabel: false});
      }
      this.state.array.pop();
      this.setState(prevState=>({
        bars: prevState.bars-1
      }));
    }
  }

  updateTimeDelay(e){
    this.setState({
      timeDelay: e.target.value
    });
  }

  getRegion(){
    if (this.state.algorithm === 0){
      return <BubbleSortRegion 
              i={this.state.bubblesort_i} 
              j={this.state.bubblesort_j}
              bars={this.state.bars}>
              </BubbleSortRegion>
    } 
    else if (this.state.algorithm === 1){
      return <QuickSortRegion
              i={this.state.quicksort_i}
              swap_index={this.state.quicksort_swap_index}
              partition_index={this.state.quicksort_partition_index}
              bars={this.state.bars}>
              </QuickSortRegion>
    }
  }

  applyMinMaxChange(min, max){
    this.setState({
      minNum: min,
      maxNum: max
    }, () => {
      this.randomizeArray();
    });
  }

  StopAndReset(){
    if (this.timer.length > 0){
      const bars = document.getElementsByClassName('bar');
      for (let i=0; i<bars.length; i++){
        if (bars[i].classList.length > 1){
          bars[i].classList = "bar";
        }
      }
      this.timer.map(time => clearTimeout(time));
      this.timer = [];
      console.log(this.timer);
      this.randomizeArray();
      this.setState({
        algorithm: '',
        disableUI: false
      });
    }
    else{
      console.log("test");
    }
  }

  bubbleSort(){
    const emptyAnimations = {
      iIndex: [],
      jIndex: [],   
      swapIndex: [],
      swapValues: []
    }
    this.setState({
      algorithm: 0,
      disableUI: true
    });
    const tempArray = this.state.array.slice();
    const animations = bubblesort(emptyAnimations, tempArray);
    const { iIndex, jIndex, swapIndex, swapValues } = animations;
    let bars = document.getElementsByClassName('bar');
    for (let i=0; i<iIndex.length; i++){
        this.timer[i] = setTimeout(() => {
        this.setState({
          bubblesort_i: iIndex[i],
          bubblesort_j: jIndex[i]
        });
        bars[iIndex[i]].classList.add('i-index');
        if (iIndex[i-1] !== undefined && iIndex[i] !== iIndex[i-1]){
          bars[iIndex[i-1]].classList.remove('i-index');
        }
        bars[jIndex[i]].classList.add('j-index');
        if (jIndex[i-1] !== undefined && jIndex[i] !== jIndex[i-1]){
          bars[jIndex[i-1]].classList.remove('j-index');
        }
        if (swapIndex[i] !== null){
          bars[swapIndex[i][0]].style.height = `${swapValues[i][0]}px`;
          bars[swapIndex[i][1]].style.height = `${swapValues[i][1]}px`;
          bars[swapIndex[i][0]].children[0].innerHTML = `${swapValues[i][0]}`;
          bars[swapIndex[i][1]].children[0].innerHTML = `${swapValues[i][1]}`;
        }
        if (i === iIndex.length - 1){
          bars[iIndex[i]].classList.remove('i-index');
          bars[jIndex[i]].classList.remove('j-index');
          this.setState({
            array: tempArray,
            algorithm: '',
            disableUI: false
          });
          this.timer = [];
        }
      }, this.state.timeDelay * i);
    }
  }

  quickSort(){
    const emptyAnimations = {
      pivotIndex: [],
      indexes: [],
      pivotEnd: [],
      swapIndexes: [],
      values: []
    }
    this.setState({
      algorithm: 1,
      disableUI: true
    });
    const bars = document.getElementsByClassName('bar');
    const tempArray = this.state.array.slice();
    const animations = quicksort(emptyAnimations, tempArray, 0, this.state.array.length-1);
    const { pivotIndex, indexes, swapIndexes, values, pivotEnd } = animations;
    for (let i=0; i<indexes.length; i++){
      this.timer[i] = setTimeout(() => {
        this.setState({
          quicksort_i: indexes[i],
          quicksort_swap_index: pivotIndex[i],
          quicksort_partition_index: pivotEnd[i]
        });
        bars[pivotIndex[i]].classList.add('quicksort-pivot-index');
        if (pivotIndex[i-1] !== undefined && pivotIndex[i] !== pivotIndex[i-1]){
          bars[pivotIndex[i-1]].classList.remove('quicksort-pivot-index');
        }
        bars[indexes[i]].classList.add('quicksort-index'); 
        if (indexes[i-1] !== undefined && indexes[i] !== indexes[i-1]){
          bars[indexes[i-1]].classList.remove('quicksort-index');
        }
        
        bars[pivotEnd[i]].classList.add('quicksort-pivot-end');
        if (pivotEnd[i-1] !== undefined && pivotEnd[i] !== pivotEnd[i-1]){
          bars[pivotEnd[i-1]].classList.remove('quicksort-pivot-end');
        }
        
        if (swapIndexes[i] !== null){
          bars[swapIndexes[i][0]].style.height = `${values[i][0]}px`;
          bars[swapIndexes[i][1]].style.height = `${values[i][1]}px`;
          bars[swapIndexes[i][0]].children[0].innerHTML = `${values[i][0]}`;
          bars[swapIndexes[i][1]].children[0].innerHTML = `${values[i][1]}`;
        }
        if (i === indexes.length-1){
          bars[pivotIndex[i]].classList.remove('quicksort-pivot-index');
          bars[pivotEnd[i]].classList.remove('quicksort-pivot-end');
          bars[indexes[i]].classList.remove('quicksort-index');
          this.setState({
            array: tempArray,
            algorithm: '',
            disableUI: false
          });
          this.timer = [];
        }
      }, this.state.timeDelay * i);
    }
  }

  // mergeSort(){
  //   const emptyIndexes = [];
  //   this.setState({algorithm: 2});
  //   const tempArray = this.state.array.slice();
  //   const animations = mergesort(emptyIndexes,tempArray);
  //   let mergedArray = []
  //   for (let i=1; i<animations.length; i++){
  //     mergedArray = mergedArray.concat(animations[i]);
  //   }
  //   console.log(mergedArray);
  //   const bars = document.getElementsByClassName('bar');
  //   for (let i=0; i<mergedArray.length; i++){
  //     setTimeout(() => {
  //       const index = i % (this.state.bars);
  //       if (emptyIndexes[i-1] !== undefined){
  //         if (bars[emptyIndexes[i-1][0]] !== undefined){
  //           bars[emptyIndexes[i-1][0]].classList.remove('pair');
  //         }
  //         if (bars[emptyIndexes[i-1][1]] !== undefined){
  //           bars[emptyIndexes[i-1][1]].classList.remove('pair');
  //         }
  //         if (bars[emptyIndexes[i-1][2]] !== undefined){
  //           bars[emptyIndexes[i-1][2]].classList.remove('end');
  //         }
  //       }
  //       if (emptyIndexes[i] !== undefined){
  //         if (bars[emptyIndexes[i][0]] !== undefined){
  //           bars[emptyIndexes[i][0]].classList.add('pair');
  //         }
  //         if (bars[emptyIndexes[i][1]] !== undefined){
  //           bars[emptyIndexes[i][1]].classList.add('pair');
  //         }
  //         if (bars[emptyIndexes[i][2]] !== undefined){
  //           bars[emptyIndexes[i][2]].classList.add('end');
  //         }
  //       }
  //       bars[index].style.height = `${mergedArray[i]}px`;
  //       bars[index].children[0].innerHTML = `${mergedArray[i]}`;
  //       if (i === mergedArray.length-1){
  //         if (bars[emptyIndexes[i][0]] !== undefined){
  //           bars[emptyIndexes[i][0]].classList.remove('pair');
  //         }
  //         if (bars[emptyIndexes[i][1]] !== undefined){
  //           bars[emptyIndexes[i][1]].classList.remove('pair');
  //         }
  //         // console.log(emptyIndexes[i]);
  //       }
  //     }, i * this.state.timeDelay);
  //   }
  // }

  toggleMinMaxInputState(){
    this.setState(prevState => ({
      minmaxinput_opened: !prevState.minmaxinput_opened
    }));
  }
  render(){
    return(
      <div className="sorting-body">
        <div className="ui-container">
          <div className="project-name">Sorting Visualizer</div>
          <button onClick={() => this.bubbleSort()} disabled={this.state.disableUI}>Bubble Sort</button>
          <button onClick={() => this.quickSort()} disabled={this.state.disableUI}>Quick Sort</button>
          {/* <button onClick={() => this.mergeSort()} disabled={this.state.disableUI}>Merge Sort</button> */}
          <button onClick={() => this.addElementToArray()} disabled={this.state.disableUI} className="add-button">Add Element</button>
          <button onClick={() => this.removeElementFromArray()} disabled={this.state.disableUI}>Remove Element</button>
          <button onClick={() => this.randomizeArray()} disabled={this.state.disableUI}>Randomize Array</button>
          <button onClick={() => this.toggleMinMaxInputState()} disabled={this.state.disableUI}>Change Min and Max</button>
          <MinMaxInput 
            in={this.state.minmaxinput_opened} 
            disableUI={this.state.disableUI}
            currentMin={this.state.minNum}
            currentMax={this.state.maxNum}
            applyMinMaxChange={(min, max) => this.applyMinMaxChange(min, max)}
            >
          </MinMaxInput>
          <div className="speed-container">
            <div>Delay</div>
            <input id="time-delay-controller" type="range" value={this.state.timeDelay} min="1" max="3000" onChange={(e)=>this.updateTimeDelay(e)} disabled={this.state.disableUI}/>
          </div>
          <div className="delay-indicator">Current Delay: {this.state.timeDelay} ms</div>
          <button className="reset-button" onClick={() => this.StopAndReset()} disabled={!this.state.disableUI} style={{marginTop: '2em'}}>Stop and Reset</button>
        </div>
        <div className="main-body">
          <div className="regions">
            { this.getRegion() }
          </div>
            <TransitionGroup className="bars-container">
              {this.state.array.map((value, index)=>{
                return(
                  <CSSTransition
                    key={index}
                    timeout={500}
                    style={{height: `${value}px`, width: `calc(100% / ${this.state.bars})`}}
                    className="bar">
                    <div>
                      <div className={`value${!this.state.showBarLabel ? ' hidden' : ''}`}>{value}</div>
                      <div className={`index${!this.state.showBarLabel ? ' hidden' : ''}`}>i={index}</div>  
                    </div>  
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
        </div>
      </div>
    );
  }
}

function getRandomizedNumberFromInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingBody;