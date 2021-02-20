import './style.css';

const Letter = ({letter}) => {
    return (
        <div className="letter-block">
            {letter}
        </div>
    );
}

export default Letter;