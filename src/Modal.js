import './style.css';

const Modal = ({isCorrect, word}) => {
    const {english, russian, meaning, usage} = word;
    return (
        <div className="modal">
            <h4 className="modal__header">
                {isCorrect ? `Yeees, you are totally right!` : "Nooo, please try again..."}
            </h4>
            {isCorrect && <h5 className="modal__subheader">{english} - {russian}</h5>}
            {isCorrect && <div className="modal__body">
                <div>{meaning}</div>
                <div>{usage}</div>
            </div>}
        </div>
    )
}

export default Modal;