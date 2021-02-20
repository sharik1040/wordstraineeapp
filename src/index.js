import React, { useState } from 'react';//ES6 modules, 'react' - just dependencies from node_modules
import ReactDom from 'react-dom';
import Word from './Word';
import WordInput from './WordInput';
import Modal from './Modal';
import './style.css';
import vocabulary from './words.json';

const App = () => {
  const [words, setWords]  = useState(vocabulary);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheckAnswer = (answer) => {
    setIsCorrect(answer === words[selectedIndex].english);
    setIsModalOpen(true);
  }

  const handleNext = () => {
    let nextSelectedIndex = selectedIndex + 1 < words.length ? selectedIndex + 1 : 0; 
    setSelectedIndex(nextSelectedIndex);
    setIsModalOpen(false);
  }
  
  return (
    <div className="app">
      {isModalOpen && <Modal isCorrect={isCorrect}
                            word={words[selectedIndex]}/>}
      <div className="wor-form-wrapper">
        {words[selectedIndex].english !== "" && <div className="word-form">
          <Word word={words[selectedIndex].english}/>
          <WordInput word={words[selectedIndex].english} 
                    checkAnswer={handleCheckAnswer} />
        </div>
        }
        <div className="setup-block">
          <button onClick={handleNext}
                  className="button setup-block__button">Next</button>
        </div>
      </div>
    </div>
  )
}

ReactDom.render(<App />, document.querySelector("#root"));