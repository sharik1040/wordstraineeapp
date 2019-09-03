const LETTER_CLASS_NAME = "letter-block";
const LETTER_CORRECT_CLASS_NAME = "letter-block--correct";
const LETTER_USED_CLASS_NAME = "letter-block--used";
const LETTER_SELECT_CLASS_NAME = "letter-block--select";
const WORD_CLASS_NAME = "word-block init";
const WORD_SHUFF_CLASS_NAME = "word-block shuffled";

//////////////////////////////
function Letter(name, static){
    this.name = name;
    this.static = static;
}

Letter.prototype.create = function(){
    var letterContainer = document.createElement("div");
    letterContainer.className = LETTER_CLASS_NAME;
    letterContainer.innerHTML = this.name;
    letterContainer.draggable = "true";
    
    if(!this.static){
        letterContainer.title = "Double click and move.";
    }
    return letterContainer;
} 

/////////////////
function Word(name){
    this.name = name;
}

Word.prototype.createLetters = function(source, container, static){
    for(var i=0;i<source.length;i++){
        var newLetter = new Letter(source[i], static);
        var newLetterContainer = newLetter.create();
        container.appendChild(newLetterContainer);
    }
}

Word.prototype.create =  function(){
    var newWord = document.createElement("div");
    newWord.className = WORD_CLASS_NAME;

    this.createLetters(this.name, newWord, true);
    return newWord;
}

Word.prototype.rnd = function(min, max){
    return Math.floor((Math.random() * (max - min)) + min);
}

Word.prototype.shuffle = function(){
    var newShuffledWord = document.createElement("div");
    newShuffledWord.className = WORD_SHUFF_CLASS_NAME;

    var letters = this.name.split("");
    for(var i=0;i<letters.length;i++){
        var rndIndex = this.rnd(0, letters.length);
        var tmp = letters[i];
        letters[i] = letters[rndIndex];
        letters[rndIndex] = tmp; 
    }

    this.createLetters(letters, newShuffledWord, false);
    return newShuffledWord;
}

////////////////////////////////////////////////
function Round(newWord, initConainer, shuffledContainer){
    this.name = newWord.word;
    this.translation = newWord.translation;
    this.word = new Word(newWord.word);

    this.initWordContainer = initConainer;
    this.shuffledWordContainer = shuffledContainer;
    this.sameCount = 0;

    this.shuffledSelectLetter;
}

Round.prototype.clear = function(container){
    var child = container.lastElementChild;
    while(child){
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

Round.prototype.init = function(){
    this.createInitWord(this.name);
    this.createShuffledWord(this.name);
}

Round.prototype.updateCorrectCount = function(){
    this.sameCount++;
    if(this.sameCount === this.name.length){
        var msg = "CORRECT" + "\n(" + this.name + " - " + this.translation + ")";
        alert(msg);
    }
}

Round.prototype.updateInitLetter = function(container){
    container.classList.add(LETTER_CORRECT_CLASS_NAME);
}

Round.prototype.markUsed = function(){
    this.shuffledSelectLetter.classList.add(LETTER_USED_CLASS_NAME);
}

Round.prototype.unselect = function(){
    this.shuffledSelectLetter.classList.remove(LETTER_SELECT_CLASS_NAME);
    this.shuffledSelectLetter = null;
}

Round.prototype.checkUserVersionCorrect = function(answerLetter, userVersionName){
    if(answerLetter.innerHTML.toLowerCase() === userVersionName){
        this.updateInitLetter(answerLetter);
        this.markUsed();
        this.unselect();
        this.updateCorrectCount();
    }
}

Round.prototype.createInitWord = function(){
    var newWord = this.word.create(this.name);
    var currentRoundContext = this;

    this.initWordContainer.addEventListener("dragstart", function(event){
        event.dataTransfer.setData("Text", event.target.innerHTML);
    },false);

    this.initWordContainer.addEventListener("dragover", function(event){
        event.preventDefault();
    },false);

    this.initWordContainer.addEventListener("drop", function(e){
        e.preventDefault();
        var data = e.dataTransfer.getData("Text");
        currentRoundContext.checkUserVersionCorrect(e.target, data);
    },false);

    this.initWordContainer.addEventListener("click", function(e){
        if(currentRoundContext.shuffledSelectLetter){
            currentRoundContext.checkUserVersionCorrect(e.target, currentRoundContext.shuffledSelectLetter.innerHTML);
        }
    },false);
    this.initWordContainer.appendChild(newWord);
}

Round.prototype.createShuffledWord = function(){
    var newShuffledWord = this.word.shuffle(this.name);

    this.shuffledWordContainer.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("Text", e.target.innerHTML);
        if(currentRoundContext.shuffledSelectLetter) currentRoundContext.unselect();

        currentRoundContext.shuffledSelectLetter = e.target;
    },false);

    this.shuffledWordContainer.addEventListener("dragover", function(event){
        event.preventDefault();
    },false);

    this.shuffledWordContainer.addEventListener("drop", function(e){
        e.preventDefault();
    },false);

    var currentRoundContext = this;
    this.shuffledWordContainer.addEventListener("click", function(e){
        var same = false;

        if(currentRoundContext.shuffledSelectLetter === e.target) same =true;
        if(currentRoundContext.shuffledSelectLetter) currentRoundContext.unselect();

        if(!same && !e.target.classList.contains(LETTER_USED_CLASS_NAME) 
                && e.target.classList.contains(LETTER_CLASS_NAME)){
            e.target.classList.add(LETTER_SELECT_CLASS_NAME);
            currentRoundContext.shuffledSelectLetter = e.target;
        }   
        
    }, false);

    this.shuffledWordContainer.appendChild(newShuffledWord);
}