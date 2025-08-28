function Results({ questionBank, userAnswers }) {
  function getScore() {
    let finalScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questionBank[index].answer) {
        finalScore++;
      }
    });
    return finalScore;
  }

  const score = getScore();

  return (
    <div>
      <h2>Quiz Completed</h2>
      <p>Your Score: {score}/{questionBank.length}</p>
      <button
        className="restart-button"
        onClick={() => window.location.reload()}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Results;
