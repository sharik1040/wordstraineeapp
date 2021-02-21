import { useState, useEffect } from 'react';
import './style.css';

const Vocabulary = ({words, search, hintNumber}) => {
    const [vocabulary, setVocabulary] = useState([]);
    
    const getFilteredVocabulary = (filterPart) => {
        const newWords = [...words];
        // return filterPart !== "" ? newWords.filter(word => word.english.startsWith(filterPart)): newWords;
        return filterPart !== "" ? newWords.filter(word => word.english === filterPart): newWords;
    }

    useEffect(() => {
        const newWords = hintNumber === -1 ? words : getFilteredVocabulary(search);//if we use as whole vocabulary
        setVocabulary(newWords);
    }, [search, hintNumber]);

    return (
        <div className="vocabulary">
            <div className="vocabulary__body">
                {
                    vocabulary.map(word => {
                        const {id, english, russian} = word;
                        const englishPart = <VocabularyPart className="vocabulary__english"
                                                            content={english}/>;
                        const russianPart = <VocabularyPart className="vocabulary__russian"
                                                            content={russian}/>;
                        return (
                            <div className="vocabulary__item"
                                key={id}>
                                {(hintNumber === -1 || hintNumber >= 2) && englishPart}
                                {(hintNumber === -1 || hintNumber >= 1) && russianPart}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const VocabularyPart = ({content, className}) => {
    return (
        <div className={`vocabulary__part ${className}`}>
            {content}
        </div>
    )
}

export default Vocabulary;