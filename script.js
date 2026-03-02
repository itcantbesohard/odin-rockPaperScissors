playGame();

function playGame() {

    let playerScore = 0;
    let computerScore = 0;
    let round = 1;

    renderRound(round);
    renderScores(playerScore, computerScore);
    renderResult("Choose your weapon to start!");


    const choicesEl = document.querySelector(".choices");
    const choiceButtons = choicesEl.querySelectorAll(".btn-choice");
    const resetBtn = document.querySelector("#play-again");

    choicesEl.addEventListener("click", onChoiceClick);
    resetBtn.addEventListener("click", resetGame);
    resetBtn.style.display = "none";

    function onChoiceClick(e) {
        const btn = e.target.closest(".btn-choice");
        if (!btn) return;

        const humanChoice = btn.id; // expects: "rock" | "paper" | "scissors" 
        const computerChoice = getComputerChoice();

        const outcome = playRound(humanChoice, computerChoice);

        if (outcome === "win") playerScore++;
        else if (outcome === "lose") computerScore++;
        // draw -> no score change

        round++;
        renderRound(round);
        renderScores(playerScore, computerScore);

        if (playerScore >= 5 || computerScore >= 5) {
            endGame();
        }
    }

    function endGame() {

        choicesEl.removeEventListener("click", onChoiceClick);
        choiceButtons.forEach(btn => btn.disabled = true);

        const finalMsg =
            playerScore > computerScore
                ? "You win the game!"
                : "You lose the game!";
        renderResult(`${finalMsg} Final score: ${playerScore} : ${computerScore}`);

        resetBtn.style.display = "inline-block";

    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        round = 1;

        renderRound(round);
        renderScores(playerScore, computerScore);
        renderResult("Choose your weapon to start!");

        choiceButtons.forEach((btn) => (btn.disabled = false));
        choicesEl.addEventListener("click", onChoiceClick);

        resetBtn.style.display = "none";
    }
}



function renderResult(text) {
    const resultEl = document.querySelector(".result p");
    if (!resultEl) return;
    resultEl.textContent = text;
}

function renderRound(round) {
    const roundsEl = document.querySelector("#round-number");
    if (!roundsEl) return;
    roundsEl.textContent = `Round ${round}`;
}

function renderScores(playerScore, computerScore) {
    const playerScoreEl = document.querySelector("#player-score");
    const computerScoreEl = document.querySelector("#computer-score");

    if (!playerScoreEl || !computerScoreEl) return;

    playerScoreEl.textContent = `Player: ${playerScore}`;
    computerScoreEl.textContent = `Computer: ${computerScore}`;
}

function getComputerChoice() {
    //Generate random number between 1 to 3
    const choice = Math.floor(Math.random() * 3) + 1;
    return validateChoice(choice);
}

function getHumanChoice() {
    //Get number from user
    let choice;

    while (choice == null) {
        let input = prompt("Enter your choice (1-Rock 2-Paper 3-Scissors): ");
        input = isNaN(input) ? input.toLowerCase() : parseInt(input);
        choice = validateChoice(input);
    }

    return choice;
}

function validateChoice(input) {
    if (input === "rock" || input === "paper" || input === "scissors") return input;
    if (input === 1) return "rock"
    if (input === 2) return "paper"
    if (input === 3) return "scissors"
    return null
}


/**
 * @returns {"win"|"lose"|"draw"}
 */
function playRound(humanChoice, computerChoice, round) {
    //scissors && paper - human win 
    //scissors && rock - computer win
    //paper && rock - human win
    //paper && scissors - cumputer win
    //rock && scissors - human win
    //rock && paper - computer win 
    let message = "";

    if (humanChoice === computerChoice) {
        message = `Draw! You both chose ${humanChoice}.`;
        console.log(message);
        renderResult(message);
        return "draw";
    }

    if (humanChoice === "scissors" && computerChoice === "paper" ||
        humanChoice === "paper" && computerChoice === "rock" ||
        humanChoice === "rock" && computerChoice === "scissors"
    ) {
        message = `You win the round! ${humanChoice} beats ${computerChoice}`;
        console.log(message);
        renderResult(message);
        return "win";
    } else {
        message = `You lose the round! ${computerChoice} beats ${humanChoice}`;
        console.log(message);
        renderResult(message);
        return "lose";
    }
}
