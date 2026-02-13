let humanScore = 0;
let computerScore = 0;

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

console.log("Human: " + humanSelection);
console.log("Computer: " + computerSelection);

playRound(humanSelection, computerSelection);

function getComputerChoice() {
    //Generate random number between 1 to 3
    const choice = Math.floor(Math.random() * 3) + 1;
    return validateChoice(choice);
}

function getHumanChoice() {
    //Get number from user
    const input = prompt("Enter your choice (1-Rock 2-Paper 3-Scissors): ");
    const choice = isNaN(input) ? input.toLowerCase() : parseInt(input);
    return validateChoice(choice);
}

function validateChoice(choice) {
    if (choice === "rock" || choice === "paper" || choice === "scissors") return choice;
    if (choice === 1) return "rock"
    if (choice === 2) return "paper"
    if (choice === 3) return "scissors"
    return null
}

function playRound(humanChoice, computerChoice) {
    //code
}