import { useState } from "react";

function Quiz() {
  const questionBank = [
    {
      question:
        "Which of the following governmental agencies maintain their own crime lab?",
      options: ["DEA", "FBI", "ATF", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "Criminal law is sometimes referred to as",
      options: ["Public law", "Private law", "Civil law", "Common law"],
      answer: "Public law",
    },
    {
      question:
        "Which of the following would not be included under administrative law?",
      options: ["IRS", "FBI", "Social Security", "The Military"],
      answer: "FBI",
    },
    {
      question: "Forensic scientists may examine evidence dealing with:",
      options: [
        "Criminal cases",
        "Civil cases",
        "Both criminal and civil cases",
        "Neither",
      ],
      answer: "Both criminal and civil cases",
    },
    {
      question:
        "The term that means that previous legal decisions are to be followed is:",
      options: ["Stare decisis", "Corpus delicti", "Nolo contendere", "Pro bono"],
      answer: "Stare decisis",
    },
    {
      question: "A person is determined to be an expert by whom?",
      options: ["Judge", "Prosecutor", "Defense attorney", "The person being tried"],
      answer: "Judge",
    },
    {
      question: "Which crime unit would analyze blood stains?",
      options: [
        "Physical science",
        "Biology",
        "Firearms",
        "Document examination",
      ],
      answer: "Biology",
    },
  ];

  const initialAnswers = Array(questionBank.length).fill(null);

  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const selectedAnswer = userAnswers[currentQuestion];

  function handleSelectOption(option) {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = option;
    setUserAnswers(newUserAnswers);
  }

  function goToNext() {
    if (currentQuestion === questionBank.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function goToPrev() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function restartQuiz() {
    setUserAnswers(initialAnswers);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }

  if (isQuizFinished) {
    return (
      <Results
        userAnswers={userAnswers}
        questionBank={questionBank}
        restartQuiz={restartQuiz}
      />
    );
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question">{questionBank[currentQuestion].question}</p>

      {questionBank[currentQuestion].options.map((option, index) => (
        <button
          key={index}
          className={
            "option" + (selectedAnswer === option ? " selected" : "")
          }
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </button>
      ))}

      <div className="nav-buttons">
        <button onClick={goToPrev} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!selectedAnswer}>
          {currentQuestion === questionBank.length - 1
            ? "Finish Quiz"
            : "Next"}
        </button>
      </div>
    </div>
  );
}

// ✅ Results component
function Results({ userAnswers, questionBank, restartQuiz }) {
  const score = userAnswers.reduce((acc, answer, index) => {
    if (answer === questionBank[index].answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p className="score">
        Your Score: {score} / {questionBank.length}
      </p>
      <button className="restart-button" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Quiz;
