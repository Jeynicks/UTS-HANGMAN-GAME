
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
        hint: "A group of people living together that influences one’s self-concept."
    },
    {
        word: "sociology",
        hint: "The study of society and social interactions."
    },
    {
        word: "anthropology",
        hint: "The study of human cultures, behaviors, and evolution."
    },
    {
        word: "collectivism",
        hint: "The principle valuing the group over the individual, common in Eastern cultures."
    },
    {
        word: "individualism",
        hint: "A Western value emphasizing personal independence and self-reliance."
    },
    {
        word: "norms",
        hint: "Unwritten rules in society that guide behavior."
    },
    {
        word: "socialization",
        hint: "The lifelong process of learning culture and developing the self."
    },
    {
        word: "looking glass",
        hint: "The theory that we shape our identity based on how others see us."
    },
    {
        word: "symbolic",
        hint: "Type of interactionism focusing on symbols and meanings in self-concept."
    },
    {
        word: "role",
        hint: "A set of behaviors expected from someone in a specific social position."
    },
    {
        word: "ego",
        hint: "The rational part of the Freudian self that mediates between desires and morals."
    },
    {
        word: "id",
        hint: "Freud's term for the primal, pleasure-seeking part of the self."
    },
    {
        word: "super ego",
        hint: "Freud's concept of the moral and ideal self."
    },
    {
        word: "unconscious",
        hint: "Part of the mind that influences behavior without conscious awareness."
    },
    {
        word: "rene descartes",
        hint: "Philosopher who claimed 'I think, therefore I am.'"
    },
    {
        word: "plato",
        hint: "Believed the soul is immortal and divided into rational, spirited, and appetitive parts."
    },
    {
        word: "aristotle",
        hint: "Saw the self as the soul that makes the body alive and purposeful."
    },
    {
        word: "confucius",
        hint: "Taught that the self is relational, shaped by social roles and harmony."
    },
    {
        word: "buddhism",
        hint: "A belief system where the self is impermanent and ever-changing."
    },
    {
        word: "anatta",
        hint: "Buddhist concept that there is 'no self'—only a flow of experiences."
    },
    {
        word: "karma",
        hint: "The law of cause and effect in both Hinduism and Buddhism."
    },
    {
        word: "dharma",
        hint: "In Hinduism, the duties and moral responsibilities tied to one's role."
    },
    {
        word: "existentialism",
        hint: "A philosophy that emphasizes individual freedom and responsibility."
    },
    {
        word: "self awareness",
        hint: "The ability to reflect on oneself as an individual entity."
    },
    {
        word: "psychoanalysis",
        hint: "Freud's theory of the mind and method of exploring the unconscious."
    },
    {
        word: "socialidentity",
        hint: "Part of the self derived from group memberships like nationality or religion."
    },
    {
        word: "gender",
        hint: "A social construct often confused with biological sex."
    },
    {
        word: "ethnicity",
        hint: "A cultural identity based on shared heritage, language, or ancestry."
    },
    {
        word: "religion",
        hint: "A belief system that often contributes to self-concept and meaning."
    },
    {
        word: "narrative",
        hint: "The personal story we tell ourselves about who we are."
    },
    {
        word: "self esteem",
        hint: "The value a person places on themselves."
    },
    {
        word: "humanistic",
        hint: "Psychological perspective focused on personal growth and self-actualization."
    },
    {
        word: "maslow",
        hint: "Psychologist known for the hierarchy of needs."
    },
    {
        word: "selfactualization",
        hint: "The realization of one’s potential, according to Maslow."
    },
    {
        word: "jung",
        hint: "Psychologist who introduced the idea of the collective unconscious and archetypes."
    },
    {
        word: "archetypes",
        hint: "Universal, symbolic images found in myths, art, and dreams (Jung)."
    },
    {
        word: "self concept",
        hint: "One’s perception of themselves shaped by experience and feedback."
    },
    {
        word: "essentialism",
        hint: "The belief that people have an unchanging essence or nature."
    },
    {
        word: "dualism",
        hint: "The idea that mind and body are separate entities."
    },
    {
        word: "existence",
        hint: "In existentialism, it comes before essence."
    },
    {
        word: "phenomenology",
        hint: "A philosophical method focusing on direct experience."
    },
    {
        word: "nietzsche",
        hint: "Philosopher who said, 'God is dead' and emphasized the will to power."
    },
    {
        word: "jean paul sartre",
        hint: "Existentialist who claimed 'existence precedes essence.'"
    },
    {
        word: "beauvoir",
        hint: "Existentialist feminist who explored how gender shapes the self."
    },
    {
        word: "dialectic",
        hint: "Hegel's method of arriving at truth through contradiction and synthesis."
    },

    {
        word: "behaviorism",
        hint: "Psychological perspective focused on observable behavior only."
    },
    {
        word: "conditioning",
        hint: "Learning process explored by Pavlov and Skinner."
    },
    {
        word: "cognition",
        hint: "Mental processes like thinking, memory, and perception."
    },
    {
        word: "personality",
        hint: "Enduring patterns of thoughts, feelings, and behaviors."
    },
    {
        word: "trait",
        hint: "A consistent characteristic used to describe personality."
    },
    {
        word: "identity crisis",
        hint: "Erikson’s term for a period of uncertainty about one’s role in society."
    },
    {
        word: "projection",
        hint: "A defense mechanism where one attributes their own thoughts to others."
    },
    {
        word: "introvert",
        hint: "A personality type that prefers internal reflection over social interaction."
    },
    {
        word: "extrovert",
        hint: "A person who gains energy through social engagement."
    },
    {
        word: "group",
        hint: "Two or more individuals who interact and identify with one another."
    },
    {
        word: "roleset",
        hint: "The multiple expectations attached to a single status."
    },
    {
        word: "status",
        hint: "A recognized social position in society."
    },
    {
        word: "deviance",
        hint: "Behavior that violates cultural norms."
    },
    {
        word: "agency",
        hint: "The capacity of individuals to act independently and make choices."
    },
    {
        word: "structure",
        hint: "The recurring patterns and systems that influence behavior."
    },
    {
        word: "ritual",
        hint: "A culturally patterned behavior that communicates meaning and identity."
    },
    {
        word: "ethnocentrism",
        hint: "Evaluating other cultures based on the standards of your own."
    },
    {
        word: "enculturation",
        hint: "The process of learning one's own culture."
    },
    {
        word: "ethnography",
        hint: "A detailed observational study of a particular culture."
    },
    {
        word: "kinship",
        hint: "Anthropological term for family and social relationships."
    },
    {
        word: "taboo",
        hint: "A cultural or religious prohibition."
    },
    {
        word: "myth",
        hint: "A traditional story that conveys cultural beliefs and values."
    },
    {
        word: "totem",
        hint: "An animal or natural object considered symbolic of a group or clan."
    },
    {
        word: "ancestor",
        hint: "Someone from whom you are descended, often honored in cultural traditions."
    },
    {
        word: "freedom",
        hint: "A central theme in existentialism—responsibility for one’s choices."
    },
    {
        word: "alienation",
        hint: "Marx’s term for the feeling of being disconnected from one’s work and self."
    },
    {
        word: "authenticity",
        hint: "Living in accordance with your true self and values."
    },
    {
        word: "morality",
        hint: "Principles concerning the distinction between right and wrong."
    },
    {
        word: "introspection",
        hint: "The act of examining one’s own thoughts and feelings."
    },
    {
        word: "transcendence",
        hint: "Rising above physical or material existence; often spiritual."
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
