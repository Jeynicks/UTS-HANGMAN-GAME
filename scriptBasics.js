
const hangmanVid = document.querySelector(".hangman-box video");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const scorePoints = document.querySelector(".score-points h4");
const loadingVideo = document.getElementById("loadingVideo");
const loadingSound = document.getElementById("loadingSound");

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const contentContainer = document.getElementById("content-container");
    const loadingBar = document.getElementById("loading-bar");
    const loadingSound = document.getElementById("loadingSound");

    const totalTime = 6500;
    const interval = 20;
    const increment = (interval / totalTime) * 100;

    let currentWidth = 0;

    loadingSound.play();

    const loadingInterval = setInterval(function () {
        currentWidth += increment;
        loadingBar.style.width = currentWidth + "%";

        if (currentWidth >= 100) {
            clearInterval(loadingInterval);
            loadingScreen.style.opacity = 0;
            setTimeout(function () {
                loadingScreen.style.display = "none";
                contentContainer.style.display = "block";
            }, 500);

            loadingSound.pause();
            loadingSound.currentTime = 0;
        }
    }, interval);
});


let currentWord, correctLetters = [], wrongGuessCount = 0, score = 0;
const maxGuess = 6;
let currentWordIndex = 0; 

const resetGame = () => {
    const victorySound = document.getElementById("victorySound");
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanVid.src = `hangman/hangman-${wrongGuessCount}.mp4`;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    
    wordDisplay.innerHTML = currentWord.split("").map(letter => {
        if(letter === " ") {
            correctLetters.push(" ");
            return `<li class="letter guessed">&nbsp;</li>`;
        } else {
            return `<li class="letter"></li>`;
        }
    }).join("");
    
    gameModal.classList.remove("show");
    victorySound.pause();
    victorySound.currentTime = 0;
    defeatSound.pause();
    defeatSound.currentTime = 0;

    scorePoints.innerText = `Score: ${score}/${wordList.length}`;
};
const wordList = [
    {
        word: "self",
        hint: "The individual's awareness and understanding of their identity."
    },
    {
        word: "identity",
        hint: "A combination of personal traits, social roles, and group memberships."
    },
    {
        word: "culture",
        hint: "Anthropologists believe the self is shaped by this shared way of life."
    },
    {
        word: "society",
        hint: "A group of people living together that influences one's self-concept."
    },
    {
        word: "cogito ergo sum",
        hint: "Descartes' famous phrase meaning 'I think, therefore I am'."
    },
    {
        word: "bundle theory",
        hint: "Hume's view that the self is merely a collection of perceptions."
    },
    {
        word: "categorical imperative",
        hint: "Kant's moral principle that one should act as if their actions were universal law."
    },
    {
        word: "dasein",
        hint: "Heidegger's term for human existence or 'being-there'."
    },
    {
        word: "jean paul sartre",
        hint: "French existentialist who claimed 'existence precedes essence'."
    },
    {
        word: "phenomenology",
        hint: "Philosophical approach focusing on the structures of conscious experience."
    },
    {
        word: "dualism",
        hint: "The view that mind and body are distinct entities."
    },
    {
        word: "monism",
        hint: "The view that reality is fundamentally made of one substance."
    },
    {
        word: "tabula rasa",
        hint: "Locke's concept that we are born as a 'blank slate'."
    },
    {
        word: "confucius",
        hint: "Chinese philosopher who emphasized the relational nature of self."
    },
    {
        word: "no self",
        hint: "Buddhist concept of 'anatta' denying a permanent self."
    },
    {
        word: "carl jung",
        hint: "Psychologist who developed concepts of the collective unconscious and archetypes."
    },
    {
        word: "sigmund freud",
        hint: "Founder of psychoanalysis who described the id, ego, and superego."
    },
    {
        word: "george herbert mead",
        hint: "Sociologist who proposed the self develops through social interaction."
    },
    {
        word: "looking glass self",
        hint: "Cooley's theory that we develop our self-concept based on how others see us."
    },
    {
        word: "social construction",
        hint: "Theory suggesting reality is created through human interaction and language."
    },
    {
        word: "mindfulness",
        hint: "Eastern practice of being aware of the present moment."
    },
    {
        word: "enlightenment",
        hint: "State of awakening or liberation in Buddhist tradition."
    },
    {
        word: "friedrich nietzsche",
        hint: "Philosopher who explored nihilism and the 'will to power'."
    },
    {
        word: "authenticity",
        hint: "Being true to one's own personality, spirit, or character."
    },
    {
        word: "symbolic interactionism",
        hint: "Theory focusing on how people interact through symbols and meaning."
    },
    {
        word: "persona",
        hint: "Jung's concept of the social mask we present to others."
    },
    {
        word: "individualism",
        hint: "Western ideology emphasizing personal freedom and self-reliance."
    },
    {
        word: "collectivism",
        hint: "Cultural value prioritizing group harmony over individual goals."
    },
    {
        word: "tao",
        hint: "Chinese concept of the natural order of the universe."
    },
    {
        word: "meditations",
        hint: "Marcus Aurelius' stoic reflections on the self and virtue."
    },
    {
        word: "enculturation",
        hint: "Anthropological process of learning culture's values and norms."
    },
    {
        word: "autopoiesis",
        hint: "Systems theory concept of self-creating and self-maintaining identity."
    },
    {
        word: "brahman",
        hint: "Hindu concept of ultimate reality or universal consciousness."
    },
    {
        word: "atman",
        hint: "Hindu concept of individual soul or self."
    },
    {
        word: "socrates",
        hint: "Greek philosopher who said 'know thyself'."
    },
    {
        word: "autonomy",
        hint: "Self-governance and freedom from external control."
    },
    {
        word: "agency",
        hint: "Capacity of individuals to act independently and make choices."
    },
    {
        word: "self actualization",
        hint: "Maslow's concept of fulfilling one's potential."
    },
    {
        word: "dialectical self",
        hint: "Concept that the self is formed through contradictions and synthesis."
    },
    {
        word: "intersubjectivity",
        hint: "Shared understanding between individuals through social interaction."
    },
    {
        word: "rene descartes",
        hint: "French philosopher who doubted everything except his own existence."
    },
    {
        word: "david hume",
        hint: "Scottish philosopher who challenged the notion of a continuous self."
    },
    {
        word: "immanuel kant",
        hint: "German philosopher who explored the limits of human knowledge."
    },
    {
        word: "martin heidegger",
        hint: "German philosopher who explored the question of Being."
    },
    {
        word: "john locke",
        hint: "English philosopher who believed experience shapes who we are."
    },
    {
        word: "charles horton cooley",
        hint: "Sociologist who developed the looking glass self theory."
    },
    {
        word: "erving goffman",
        hint: "Sociologist who described social life as a theatrical performance."
    },
    {
        word: "abraham maslow",
        hint: "Psychologist famous for his hierarchy of needs theory."
    },
    {
        word: "william james",
        hint: "Philosopher and psychologist who explored the stream of consciousness."
    },
    {
        word: "martin buber",
        hint: "Jewish philosopher who explored I-Thou relationships."
    },
    {
        word: "maurice merleau ponty",
        hint: "Phenomenologist who emphasized the body's role in perception."
    },
    {
        word: "lao tzu",
        hint: "Ancient Chinese philosopher considered the founder of Taoism."
    },
    {
        word: "siddhartha gautama",
        hint: "Founder of Buddhism who taught about the illusion of self."
    },
    {
        word: "michel foucault",
        hint: "French philosopher who explored how power shapes identity."
    },
    {
        word: "simone de beauvoir",
        hint: "Feminist philosopher who wrote 'One is not born, but rather becomes, a woman.'"
    }
];



let completedAllWords = false;

const getNextWord = () => {
   
    if (currentWordIndex >= wordList.length) {

        currentWordIndex = 0;
        score = 0;
        scorePoints.innerText = `Score: ${score}/${wordList.length}`;
    }
    

    const { word, hint } = wordList[currentWordIndex];
    
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    
    resetGame();
    

    currentWordIndex++;
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Congratulations you guessed the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!!!' : 'Game Over!'}`;
        
        if (currentWordIndex >= wordList.length) {
            gameModal.querySelector("p").innerText = `Final score: ${score}/${wordList.length}`;
            playAgainBtn.innerText = 'Play Again';

        } else {

            gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        }


        const victorySound = document.getElementById("victorySound");
        const defeatSound = document.getElementById("defeatSound");

        if (isVictory) {
            victorySound.loop = true;
            victorySound.play();
        } else {
            defeatSound.loop = true;
            defeatSound.play();
        }

        gameModal.classList.add("show");
    }, 300);
};

const initGame = (button, clickedLetter) => {
    click.currentTime = 1.5;
    click.play();
    click.volume = 0.5;
    
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                click.currentTime = 0.2;
                click.play();
                click.volume = 0.5;
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;    
        hangmanVid.src = `hangman/hangman-${wrongGuessCount}.mp4`; 
    }

    button.disabled = true;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuess}`;

    if(wrongGuessCount === maxGuess) return gameOver(false);
    // Change this line in initGame function
    if(correctLetters.length === currentWord.replace(/ /g, "").length + (currentWord.match(/ /g) || []).length) {
        score++; 
        scorePoints.innerText = `Score: ${score}/${wordList.length}`;
        gameOver(true);
    }
};


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}


getNextWord();
playAgainBtn.addEventListener("click", getNextWord);
