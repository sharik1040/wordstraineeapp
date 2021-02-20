import Letter from './Letter';
import './style.css';

const rnd = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

const shuffle = (arr) => {
  const shuffledArr = arr;
  const length = shuffledArr.length;
  for(let i=0;i<length;i++){
      let rndIndex = rnd(0, length);
      let tmp = shuffledArr[i];
      shuffledArr[i] = shuffledArr[rndIndex];
      shuffledArr[rndIndex] = tmp; 
  }
  return shuffledArr;
}

const toObjectArr = (word) => {
    return Array.from(word).map((letter, index) => {
        return {
            "id": `${new Date().getTime().toString()}${index}`,
            "name": letter
        }
    })
}

const Word = ({word}) => {
    const shuffledArr = shuffle(toObjectArr(word));

    const letters = shuffledArr.map(letter => {
        const {id, name} = letter;
        return (
             <Letter letter={name} key={id}/>
        )
    });

    return (
        <div className="word-block">
            {letters}
        </div>
    )
}

export default Word;