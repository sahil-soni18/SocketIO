// backend/game.js
const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      return "draw";
    }
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return "player";
    }
    return "computer";
  };
  
export default determineWinner
  