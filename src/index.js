import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Word from './Word';
import WordInput from './WordInput';
import Modal from './Modal';
import Vocabulary from './Vocabulary';
import './style.css';
import vocabulary from './words.json';

const App = () => {
  const maxHintNumber = 2;
  const [words, setWords]  = useState(vocabulary);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintNumber, setHintNumber] = useState(0);
  const [isNext, setIsNext] = useState(false);

  const handleCheckAnswer = (answer) => {
    setIsModalOpen(true);
    setIsNext(false);
    setIsCorrect(answer === words[selectedIndex].english);
  }

  const handleNext = () => {
    let nextSelectedIndex = selectedIndex + 1 < words.length ? selectedIndex + 1 : 0; 
    setSelectedIndex(nextSelectedIndex);
    setIsModalOpen(false);
    setHintNumber(0);
    setIsNext(!isNext);
  }

  const handleHint = () => {
    let currentHint = hintNumber === -1 ? 0 : hintNumber;
    let nextHint = currentHint + 1 < 3 ? currentHint + 1 : currentHint;
    setHintNumber(nextHint);
    setIsModalOpen(false);
  }

  const handleOpenVocabulary = () => {
    setHintNumber(-1);
    setIsModalOpen(false);
  }
  
  return (
    <div className="app">
      <div className="modal-wrapper">
        {isModalOpen && <Modal isCorrect={isCorrect}
                      word={words[selectedIndex]}/>}
      </div>
      <div className="word-form-wrapper">
        <div className="word-form">
          <Word word={words[selectedIndex].english}/>
          <WordInput checkAnswer={handleCheckAnswer} 
                     isNext={isNext}/>
        </div>
        <div className="setup-block">
          <button onClick={handleNext}
                  className="button setup-block__button">Next</button>
          <button onClick={handleHint}
                  className="button setup-block__button">
                  {`Hint x ${hintNumber !== -1 ? maxHintNumber - hintNumber : (maxHintNumber - hintNumber) - 1}`}
          </button>
          <button onClick={handleOpenVocabulary}
                  className="button setup-block__button">Vocabulary</button>
        </div>
      </div>
      <div className="vocabulary-wrapper">
        <Vocabulary words={words} 
                    search={words[selectedIndex].english}
                    hintNumber={hintNumber}/>
      </div>
    </div>
  )
}

ReactDom.render(<App />, document.querySelector("#root"));