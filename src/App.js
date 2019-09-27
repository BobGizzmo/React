import React, { useState } from 'react';
import shuffle from 'lodash.shuffle'
import './App.css';
import Keyboard from './Keyboard';

const App =  () => {

  const keyboard = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  
  const words = ['POMME', 'POIRE', 'PRUNE', 'PATATE', 'PAMPLEMOUSSE', 'POULE', 'PLAT', 'PIRATE']

  const [word, setWord] = useState(shuffle(words)[0]);
  const [usedLetters, addNewLetters] = useState([]);

  //Réinitialise le jeu
  const initState = () => {
    setWord(shuffle(words)[0]);
    addNewLetters([]);
  }

  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  const computeDisplay = (phrase, usedLetters) => {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_ ')
    )
  }

  const addLetter = letter => {
    const newLettersArray = [...usedLetters];
    newLettersArray.push(letter);

    addNewLetters(newLettersArray);
    computeDisplay(word, usedLetters);
  }

    const won = computeDisplay(word, usedLetters).indexOf('_') > -1 ? false : true
    return (
      <section className="App">
        <header className="App-header">
          <h1>The Hangman Game</h1>
        </header>
        <div className="game">
          <p>{computeDisplay(word, usedLetters)}</p>
          <div className="keyboard">
            {
              won ?
                <p>Bravo tu as gagné en {usedLetters.length} coups !<br />
                <button onClick={initState}>REJOUER</button></p> 
              :
                keyboard.map((letter, index) => (
                  <Keyboard keyboard={letter}
                    key={index}
                    onclick={addLetter} />
                ))
            }
          </div>
        </div>
      </section>
    );
  }

export default App;
