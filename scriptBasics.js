
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
        word: "organizational strategy",
        hint: "A long-term plan for a company's goals, resources, and direction."
    },
    {
        word: "competitive advantage",
        hint: "What makes a company better than its rivals."
    },
    {
        word: "information systems",
        hint: "Technology that helps businesses manage operations and data."
    },
    {
        word: "business process reengineering",
        hint: "Radical redesign of workflows to improve efficiency and quality."
    },
    {
        word: "business process improvement",
        hint: "Step-by-step method for enhancing business workflows."
    },
    {
        word: "business process management",
        hint: "Systematic monitoring and optimization of business activities."
    },
    {
        word: "focus strategy",
        hint: "Targeting a specific niche market for business success."
    },
    {
        word: "low-cost production",
        hint: "Minimizing expenses to offer the cheapest prices."
    },
    {
        word: "differentiation",
        hint: "Offering unique features that stand out from competitors."
    },
    {
        word: "comparative advantage",
        hint: "Producing goods at a lower opportunity cost than others."
    },
    {
        word: "data analytics",
        hint: "Examining large datasets to uncover insights."
    },
    {
        word: "customer relationship management",
        hint: "System for improving business relationships with customers."
    },
    {
        word: "cloud computing",
        hint: "Using remote servers to store and manage data."
    },
    {
        word: "business intelligence",
        hint: "Using data to make smarter business decisions."
    },
    {
        word: "e-commerce",
        hint: "Buying and selling products online."
    },
    {
        word: "cybersecurity",
        hint: "Protecting systems and data from digital attacks."
    },
    {
        word: "enterprise resource planning",
        hint: "Software for managing a company's resources across departments."
    },
    {
        word: "big data",
        hint: "Very large sets of information analyzed to reveal patterns."
    },
    {
        word: "agile workforce",
        hint: "A flexible team that quickly adapts to market changes."
    },
    {
        word: "help desk support",
        hint: "Front-line technical assistance for users."
    },
    {
        word: "remote support",
        hint: "Providing IT help from a distance."
    },
    {
        word: "flatter hierarchies",
        hint: "Reducing layers of management for faster communication."
    },
    {
        word: "executive information systems",
        hint: "Systems providing top managers with key business insights."
    },
    {
        word: "transaction processing systems",
        hint: "Systems that handle routine business transactions like payroll."
    },
    {
        word: "expert systems",
        hint: "AI-driven systems that imitate expert decision-making."
    },
    {
        word: "strategic information systems",
        hint: "Systems used to gain a competitive business advantage."
    },
    {
        word: "business strategy",
        hint: "An organizational master plan to achieve strategic goals."
    },
    {
        word: "global reach",
        hint: "Ability to expand business operations internationally through technology."
    },
    {
        word: "electronic commerce",
        hint: "The buying and selling of goods or services using the internet."
    },
    {
        word: "data-driven decisions",
        hint: "Using facts and analytics to guide business choices."
    },
    {
        word: "organization culture",
        hint: "Shared values, attitudes, and behaviors within a company."
    },
    {
        word: "networking and virtual corporations",
        hint: "Using technology to form business partnerships remotely."
    },
    {
        word: "improved decision-making",
        hint: "Using tools like dashboards and analytics to make smarter choices."
    },
    {
        word: "streamlined processes",
        hint: "Automating and improving workflows to boost efficiency."
    },
    {
        word: "enhanced communication",
        hint: "Speeding up how teams and departments share information."
    },
    {
        word: "changing nature of work",
        hint: "New roles and skills emerging due to technology."
    },
    {
        word: "increased productivity",
        hint: "Technology helping employees work more efficiently."
    },
    {
        word: "focus on innovation",
        hint: "Encouraging creativity and new ideas through tech."
    },
    {
        word: "flexibility and mobility",
        hint: "Enabling employees to work anytime, anywhere."
    },
    {
        word: "improved collaboration",
        hint: "Better teamwork using technology like cloud services."
    },
    {
        word: "enhanced safety and security",
        hint: "Using technology to protect workplaces and people."
    },
    {
        word: "versatility across industries",
        hint: "IS professionals can work in healthcare, finance, retail, and more."
    },
    {
        word: "entrepreneurship opportunities",
        hint: "Starting a tech-driven business using IS knowledge."
    },
    {
        word: "high demand",
        hint: "Information systems skills are needed by almost every company."
    },
    {
        word: "high earning potential",
        hint: "Information systems careers often pay competitive salaries."
    },
    {
        word: "enterprise architect",
        hint: "A specialist who designs IT systems to support business goals."
    },
    {
        word: "chief information officer",
        hint: "Top executive responsible for managing a company's IT strategy."
    },
    {
        word: "machine learning",
        hint: "AI technique helping computers learn from data automatically."
    },
    {
        word: "supply chain management",
        hint: "Coordinating production, shipping, and sales using technology."
    },
    {
        word: "regulatory compliance",
        hint: "Following government rules using business process management tools."
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
