import React, { Component } from 'react';
import Definition from './Definition';

class Flashcard extends Component {
  state = {
    currentTimeout: null,
    timer: 10,
    show: false,
  }

  decrementTimer = () => {
    if (this.state.timer === 0) {
      this.props.onTimerEnd();
    } else {
      clearTimeout(this.state.currentTimeout);
      this.setState(prevState => ({
        timer: prevState.timer - 1,
        currentTimeout: window.setTimeout(this.decrementTimer, 1000)
      }))
    }
  }

  componentWillReceiveProps() {
    clearTimeout(this.state.currentTimeout);
    this.setState({
      timer: 10,
      currentTimeout: window.setTimeout(this.decrementTimer, 1000)
    })
  }

  componentDidMount() {
    this.setState({
      currentTimeout: window.setTimeout(this.decrementTimer, 1000)
    })
  }

  toggleShow = () => {
    this.setState(prevState => ({ show: !prevState.show }) )
  }

  render() {
    let { detail } = this.props
    console.log(detail)
    return (
      <div>
        <div className="card">
          <div className="card-content">
            <h3>{this.state.timer}</h3>
            <h1>{detail.word}</h1>
          </div>
          <div className="card-action">
            <button
              onClick={this.toggleShow}
              className="waves-effect waves-light btn">
              {this.state.show ? 'Hide Definition' : 'Show Definition'}
            </button>
          </div>
        </div>
        <div className="card">
          {this.state.show && detail.definitions.map((def, index) => <Definition def={def} key={def._id} idx={index} />)} 
        </div>
      </div>
    )
  }
}

export default Flashcard;
