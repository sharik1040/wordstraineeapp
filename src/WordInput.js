import { useState } from 'react';
import './style.css';

const WordInput = ({word, checkAnswer}) => {
    const [answer, setAnswer] = useState('');

    const handleClick = () => {
        return checkAnswer(answer);
    }

    return (
        <div className="word-input__wrapper">
            <input type="text" 
                   value={answer} 
                   onChange={(e) => setAnswer(e.target.value.toLowerCase())}
                   placeholder="Type your answer"
                   className="word-input__input"/>
            <button onClick={handleClick}
                    className="button word-input__button">Check</button>
        </div>
    )
}

export default WordInput;