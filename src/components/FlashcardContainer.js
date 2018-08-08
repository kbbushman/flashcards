import React, { Component } from 'react';
import axios from 'axios';
import { CLIENT_URL } from '../constants.js';
import Flashcard from './Flashcard';

class FlashcardContainer extends Component {
    state = {
      flashcards: [],
      currentIndex: 0
    }

    next = () => {
      let nextIndex = (this.state.currentIndex + 1) !== this.state.flashcards.length
        ? this.state.currentIndex + 1
        : this.state.currentIndex;

      this.setState({ currentIndex: nextIndex })
    }

    prev = () => {
      let prevIndex = (this.state.currentIndex - 1) < 0
        ? 0
        : (this.state.currentIndex - 1);

      this.setState({ currentIndex: prevIndex })
    }

    handleKeyup = (event) => {
      if (event.keyCode === 39) {
        this.next();
      }
      if (event.keyCode === 37) {
        this.prev();
      }
    }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyup)

    axios.get(CLIENT_URL)
      .then(response => this.setState({ flashcards: response.data }))
  }

  render() {
    let flashcard = this.state.flashcards[this.state.currentIndex];
    return (
      <div className="row">
        <div className="container">
          {flashcard && <Flashcard detail={flashcard} onTimerEnd={this.next} />}
        </div>
      </div>
    )
  }
}

export default FlashcardContainer;
