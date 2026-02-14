
playGame();

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    let rounds = 0;

    while (rounds < 5) {

        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        console.log("Human: " + humanSelection);
        console.log("Computer: " + computerSelection);

        playRound(humanSelection, computerSelection) === 1 ? humanScore++ : computerScore++;
        rounds++;
    }

    showResult(humanScore, computerScore);

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

function playRound(humanChoice, computerChoice) {
    //scissors && paper - human win 
    //scissors && rock - computer win
    //paper && rock - human win
    //paper && scissors - cumputer win
    //rock && scissors - human win
    //rock && paper - computer win 
    if (humanChoice === computerChoice) {
        console.log("Draw! Keep playing!");
        return null;
    }

    if (humanChoice === "scissors" && computerChoice === "paper" ||
        humanChoice === "paper" && computerChoice === "rock" ||
        humanChoice === "rock" && computerChoice === "scissors"
    ) {
        console.log(`You win round! ${humanChoice} beats ${computerChoice}`);
        return 1;
    } else {
        console.log(`You lose round! ${computerChoice} beats ${humanChoice}`);
        return 0;
    }
}

function showResult(humanScore, computerScore) {
    let message;

    if (humanScore > computerScore) message = "You win the game!";
    else if (humanScore < computerScore) message = "You lose the game!";
    else message = "Draw!";

    console.log(`${message} ${humanScore} : ${computerScore}`);
}