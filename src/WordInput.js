import { useEffect, useState } from 'react';
import './style.css';

const WordInput = ({checkAnswer, isNext}) => {
    const [answer, setAnswer] = useState('');

    const handleClick = () => {
        return checkAnswer(answer);
    }

    useEffect(()=>{
        setAnswer('');
    },[isNext]);

    return (
        <div className="word-input__wrapper">
            <input type="text" 
                   value={answer} 
                   onChange={(e) => {setAnswer(e.target.value.toLowerCase())}}
                   placeholder="Type a word using letters above"
                   className="word-input__input"/>
            <button onClick={handleClick}
                    className="button word-input__button">Check</button>
        </div>
    )
}

export default WordInput;