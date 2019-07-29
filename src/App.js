import React, { Component } from 'react';
import shuffle from 'lodash.shuffle'
import './App.css';
import Keyboard from './Keyboard';

class App extends Component {

  keyboard = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  
  words = ['POMME', 'POIRE', 'PRUNE', 'PATATE', 'PAMPLEMOUSSE', 'POULE', 'PLAT', 'PIRATE']

  state = {
    word: shuffle(this.words)[0],
    usedLetters: [],
  }

  //Arrow function for binding
  initState = () => {
    this.setState({
      word: shuffle(this.words)[0],
      usedLetters: []
    })
  }

  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_ ')
    )
  }

  //Arrow function for binding
  addLetters = (letter) => {
    const { usedLetters, word} = this.state
    usedLetters.push(letter);

    this.setState({usedLetters: usedLetters})
    this.computeDisplay(word, usedLetters)
  }

  render() {
    const { word, usedLetters } = this.state
    const won = this.computeDisplay(word, usedLetters).indexOf('_') > -1 ? false : true
    return (
      <section className="App">
        <header className="App-header">
          <h1>The Hangman Game</h1>
        </header>
        <div className="game">
          <p>{this.computeDisplay(word, usedLetters)}</p>
          <div className="keyboard">
            {
              won ?
                <p>Bravo tu as gagné en {usedLetters.length} coups !<br />
                <button onClick={this.initState}>REJOUER</button></p> 
              :
                this.keyboard.map((letter, index) => (
                  <Keyboard keyboard={letter}
                    key={index}
                    onclick={this.addLetters} />
                ))
            }
          </div>
        </div>
      </section>
    );
  }
}

export default App;
