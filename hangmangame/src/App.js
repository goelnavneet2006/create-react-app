import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import KeyBoard from "./components/KeyBoard.js";
import UserInput from "./components/UserInput.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressedKeys: [],
      remainingLives: 10,
      gameWon: false,
      gameOver: false,
      allowedQuestions: [
        { "Silicon Valley state": "california" },
        { "Country with most population": "China" },
        { "Author homecountry": "india" },
        { "Author resident country": "usa" },
        { "Diet abstaining from animal products": "vegan" },
        { "What everyone wants": "peace" }
      ],
      selectedQuestionIndex: 0
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.setPressedKeys = this.setPressedKeys.bind(this);
    this.getRandomQuestionIndex = this.getRandomQuestionIndex.bind(this);
    this.isMatched = this.isMatched.bind(this);
    this.getSelectedQuestion = this.getSelectedQuestion.bind(this);
  }

  componentWillMount() {
    this.setState({
        selectedQuestionIndex: this.getRandomQuestionIndex()
    });
  }

  getSelectedQuestion() {
    const questionObj = this.state.allowedQuestions[this.state.selectedQuestionIndex];
    const question = Object.keys(questionObj)[0];
    return [
      question,
      questionObj[question].toUpperCase().split("")
    ];
  }

  getRandomQuestionIndex() {
    return Math.ceil(Math.random() * (this.state.allowedQuestions.length)) - 1;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hang Man Game</h1>
        </header>
        <main>
          <UserInput
            pressedKeys={this.state.pressedKeys}
            remainingLives={this.state.remainingLives}
            gameCallback={this.gameCallback}
            questionAnsArr={this.getSelectedQuestion()[1]}
            questionTitle={this.getSelectedQuestion()[0]}
          />
          { this.state.gameOver ?
            <h3>
              Game over: You <span>{this.state.gameWon ? "Won" : "Lost"}</span>
            </h3> : null
          }
          <KeyBoard
            onKeyPress={this.onKeyPress}
            pressedKeys={this.state.pressedKeys}
          />
        </main>

      </div>
    );
  }

  onKeyPress(pressedKey) {
    this.setPressedKeys(this.state.pressedKeys, pressedKey);
  }

  isMatched(pressedKeys) {
    return this.getSelectedQuestion()[1].every((answerLetter) => {
      if (pressedKeys.indexOf(answerLetter) > -1) {
        return true;
      }
      return false;
    });
  }

  setPressedKeys(pressedKeys, pressedKey) {
    if (this.state.gameOver) {
      return;
    }
  
    if (pressedKeys.indexOf(pressedKey) > -1) {
      return;
    }

    pressedKeys = [...pressedKeys, pressedKey];

    if (this.isMatched(pressedKeys)) {
      this.setState({
        pressedKeys,
        remainingLives: this.state.remainingLives - 1,
        gameOver: true,
        gameWon: true
      });
      return;
    } else if (this.state.remainingLives === 1) {
      this.setState({
        pressedKeys,
        remainingLives: this.state.remainingLives - 1,
        gameOver: true,
        gameWon: false
      });
      return;
   }

    this.setState({
      pressedKeys,
      remainingLives: this.state.remainingLives - 1
    });
  }

  handleKeyPress(event) {
    const pressedKey = event.key.toUpperCase();
    if (pressedKey.match(/[A-Z]+/g)) {
      this.setPressedKeys(this.state.pressedKeys, pressedKey);
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
  }
}

export default App;
