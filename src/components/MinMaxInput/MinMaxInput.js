import React from 'react';
import './MinMaxInput.css';
import { CSSTransition } from 'react-transition-group';

class MinMaxInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      min: this.props.currentMin,
      max: this.props.currentMax,
      message: '',
      isValid: true
    }
  }

  applyChange(){
    const { min, max } = this.state;
    let message;
    if (!isNaN(min) && !isNaN(max) && parseInt(max) > parseInt(min) && parseInt(min) > 0 && parseInt(max) <= 500){
      this.setState({isValid: true});
      this.props.applyMinMaxChange(parseInt(min), parseInt(max));
    }
    else{
      this.setState({
        isValid: false,
        message: "There was an error. Please revise your input"
      })
    }
  }



  render(){
    return(
      <CSSTransition 
        in={this.props.in}
        timeout={200}
        unmountOnExit
        className="min-max-container">
        <div>
          <div className="input-wrapper">
            <div className="label">Min Number (1 - 499): </div>
            <input 
              disabled={this.props.disableUI} 
              type="text" 
              id="min-number-input" 
              value={this.state.min} 
              onChange={(e) => this.setState({min: e.target.value, isValid: true})}/>
          </div>
          <div className="input-wrapper">
            <div className="label">Max Number (2 - 500):</div>
            <input 
              disabled={this.props.disableUI} 
              type="text" id="max-number-input" 
              value={this.state.max} 
              onChange={(e) => this.setState({max: e.target.value, isValid: true})}/>
          </div>
          <button disabled={this.props.disableUI} className="apply" onClick={()=>this.applyChange()}>Apply Change And Randomize</button>
          <CSSTransition
            className="message"
            timeout={200}
            in={!this.state.isValid}
            unmountOnExit>
            <div>{this.state.message}</div>
          </CSSTransition>
        </div>
      </CSSTransition>
    );
  }
}

export default MinMaxInput;