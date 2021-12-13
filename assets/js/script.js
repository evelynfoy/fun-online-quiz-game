/* Declare Global Variables */
let questionsArray = [];

/* Fetch questions by calling an API and passing the preferences selected */
async function fetchQuestionsFromAPI(topic_code, level, num_questions) {
  let url = `https://opentdb.com/api.php?amount=${num_questions}&category=${topic_code}&difficulty=${level}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/* Populate global questions array with questions etc from API */
async function getQuestions(topic_code, level, num_questions) {

  let questions = await fetchQuestionsFromAPI(topic_code, level, num_questions);
  const modifiedQuestions = questions.results.map(q => {
    return {
      question: q.question,
      correctAnswer: q.correct_answer,
      answers: [...q.incorrect_answers, q.correct_answer],
      type: q.type
    }
  });

  /* Clear the array first */
  questionsArray = [];

  for (let i = 0; i < modifiedQuestions.length; i++) {
    questionsArray.push(modifiedQuestions[i]);
  }
}

function getAnswers(questionNumber) {
  let html = '';

  for (let i = 0; i < questionsArray[questionNumber - 1].answers.length; i++) {
    if (questionsArray[questionNumber - 1].answers[i]) {
      html += `<div>
            <input type="radio" id="answer${i}" name="answer" >
            <label for="answer${i}">${questionsArray[questionNumber - 1].answers[i]}</label>
          </div>`;
    }
  }
  document.getElementById("answers-area").innerHTML = html;
}

/* Runs when Start Game button clicked */
function startGame() {
  /* Get Preferences */

  /* Get topic chosen from html*/
  let topic = document.getElementById('topic-choice').value;

  /* Convert description to code required by the API */
  let topic_code;
  switch (topic) {
    case 'General Knowledge': {
      topic_code = 9;
      break;
    }
  }

  /* Get level and number of questions from html also */
  let level = document.getElementById('level-choice').value;
  let num_questions = document.getElementById('num-questions-choice').value;

  /* Get questions etc from API */
  getQuestions(topic_code, level, num_questions);

  /* Show the start up screen by showing the motivational-area and hiding the questions, answers and score area */
  document.getElementById('motivational-area').classList.add('hide');
  document.getElementById('question-area').classList.remove('hide');
  document.getElementById('answers-area').classList.remove('hide');
  document.getElementById('score-area').classList.remove('hide');

  /* Populate the first question and answers */
  document.getElementById('question-number').innerHTML = 'Q1';

  // Need to wait for the answers to become available
  setTimeout(function () {
    document.getElementById('question').innerHTML = questionsArray[0].question;
    getAnswers(1);
  }, 800);

  document.getElementById('button').innerText = "Next Question";

}

function isCorrect() {
  // Get current question number 
  let questionNumber = parseInt(document.getElementById('question-number').innerHTML.substring(1));

  // Get the correct answer for that question
  let correctAnswer = questionsArray[questionNumber - 1].correctAnswer;

  // Get all the radio elements for the question
  let answers = document.getElementsByName('answer');

  // Read through this array looking for the one selected
  let i = 0;
  while (!answers[i].checked) {
    i++;
  }
  // Get the answer selected
  let answerSelected = questionsArray[questionNumber - 1].answers[i];

  // If same as correct answer then isCorrect returns true else false
  if (correctAnswer === answerSelected) {
    return true
  } else {
    return false
  }
}


function showResults() {
  // Display the results area and update the final score value
  document.getElementById('well-done-area').classList.remove('hide');
  document.getElementById('number-correct').innerHTML = document.getElementById('correct').innerHTML;
  document.getElementById('total-number').innerHTML = document.getElementById('num-questions-choice').value;

  // Hide the question and answers area
  document.getElementById('question-area').classList.add('hide');
  document.getElementById('answers-area').classList.add('hide');

  // Change the text on the button to have another go
  document.getElementById('button').innerText = 'Have another go!';
}

function displayNextQuestion(questionNumber) {

  if (questionNumber < parseInt(document.getElementById('num-questions-choice').value)) {
    // Increase question number 
    questionNumber += 1;
    // Set html to new value
    document.getElementById('question-number').innerHTML = `Q${questionNumber}`;

    // Set question in html to next question in array
    document.getElementById('question').innerHTML = questionsArray[questionNumber - 1].question;

    // If answer is boolean only one answer is supplied so just print true and false as we know those are the only possible answers anyway
    getAnswers(questionNumber);
  }
  // Last question shown
  else {
    showResults();
  }
}

/* Runs when Next Question button clicked */
function nextQuestion() {
  /* Get current question number */
  let questionNumber = parseInt(document.getElementById('question-number').innerHTML.substring(1));

  // Incorrect answer area showing - hide and display next question
  if (!document.getElementById('incorrect-answer-area').classList.contains('hide')) {
    document.getElementById('incorrect-answer-area').classList.add('hide');
    // If more questions to show
    displayNextQuestion(questionNumber);
  } else {
    // last question was correct - show next question
    if (isCorrect()) {

      //Increase Correct score
      document.getElementById('correct').innerHTML = parseInt(document.getElementById('correct').innerHTML) + 1;
      displayNextQuestion(questionNumber);

    } else {

      //Increase incorrect score
      document.getElementById('in-correct').innerHTML = parseInt(document.getElementById('in-correct').innerHTML) + 1;
      // Show incorrect answer area and hide answers
      document.getElementById('incorrect-answer-area').classList.remove('hide');
      document.getElementById('answers-area').classList.remove('hide');
      document.getElementById('correct-answer').innerText = questionsArray[questionNumber - 1].correctAnswer;
    }
  }
}

function buttonClicked() {
  switch (document.getElementById('button').innerText) {
    case 'Start Game': {
      startGame();
      break;
    }
    case 'Next Question': {
      nextQuestion();
      break;
    }
    case 'Have another go!': {
      document.getElementById('well-done-area').classList.add('hide');
      document.getElementById('incorrect-answer-area').classList.add('hide');
      document.getElementById('button').innerText = 'Next Question';
      document.getElementById('correct').innerText = '0';
      document.getElementById('in-correct').innerText = '0';
      startGame();
      break;
    }
    default: {
      startGame();
      break;
    }
  }
}