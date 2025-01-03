const determineMultiplayerWinner = (choice1, choice2) => {
    if (choice1 === choice2) return "It's a tie!";
    if (
      (choice1 === "rock" && choice2 === "scissors") ||
      (choice1 === "scissors" && choice2 === "paper") ||
      (choice1 === "paper" && choice2 === "rock")
    ) {
      return "Player 1 wins!";
    }
    return "Player 2 wins!";
  };

  export default determineMultiplayerWinner;