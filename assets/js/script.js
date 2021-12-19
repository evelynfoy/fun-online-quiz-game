/**
 * The following program contains source code for a Fun Online Quiz Game.
 * It allows the player to select the level, topic or category and the number of questions they would like.
 * The categories available to the player are retrieved from an API called https://opentdb.com .
 * When the selections are made then the player clicks on the 'Start' button and the program retrieves the requested number of questions from the API.
 * The first question is displayed along with potential answers in a radio button format.
 * When the player clicks the 'Submit Answer' button then the chosen answer is checked against the actual correct answer and their score tracked.
 * If an incorrect answer is chosen then the correct answer is displayed and the button text changes to 'Next Question'.
 * If the correct answer is chosen then the next question is displayed.
 * Once all the questions have been answered the results will be displayed together with either a 'Well Done' message if they scored more than half correct 
 * or an 'Oh dear' message if they scored less than half.
 * At this point the button text changes to 'Have another go!' and if this is clicked the game resets and allows the player to change the parameters and start again.
 */
"use strict"

/* Declare Global Variables */
let questionsArray = [];
let currentQuestion = 0;

// Define references to html document elements
const button = document.querySelector('#button');
const answersArea = document.querySelector('#answers-area');

function getAnswers() {
  let html = '';

  for (let i = 0; i < questionsArray[currentQuestion - 1].answers.length; i++) {
    if (questionsArray[currentQuestion - 1].answers[i]) {
      if (i === 0) {
        html += `<div>
            <input type="radio" id="answer${i}" name="answer" checked>
            <label for="answer${i}">${questionsArray[currentQuestion - 1].answers[i]}</label>
          </div>`;
      }
      else {
      html += `<div>
            <input type="radio" id="answer${i}" name="answer" >
            <label for="answer${i}">${questionsArray[currentQuestion - 1].answers[i]}</label>
          </div>`;
      }
    }
  }
  answersArea.innerHTML = html;
}

/* Runs when Start Game button clicked */
function startGame() {

  /* Get questions etc from API */
  getQuestions();

  // Hide motivational area
  document.querySelector('#motivational-area').classList.add('hide');

  //Show the scores, question area and answers 
  document.querySelector('#question-area').classList.remove('hide');
  answersArea.classList.remove('hide');
  document.querySelector('#score-area').classList.remove('hide');

  // Set button text to 'Submit Answer'
  button.innerText = "Submit Answer";

  // Disable preferences
  document.querySelector('#topic-choice').disabled = true;
  document.querySelector('#level-choice').disabled = true;
  document.querySelector('#num-questions-choice').disabled = true;

}

function isCorrect() {

  // Get the correct answer for that question
  const correctAnswer = questionsArray[currentQuestion - 1].correctAnswer;

  // Get all the radio element answers for the question
  const answers = document.getElementsByName('answer');

  // Identify the chosen answer from the id of the checked answer e.g. if answer1 was checked 1 is returned 
  const answerSelectedId = (Array.from(answers).find(answer => answer.checked).id).substring(6);
  const answerSelectedText = questionsArray[currentQuestion - 1].answers[answerSelectedId]; 

  // If same as correct answer then isCorrect returns true else false
  return (correctAnswer === answerSelectedText) ? true : false;

}

function showResults() {

  // Display the results area and update the final score value
  const numberIncorrect = document.querySelector('#in-correct').innerHTML;
  const totalNumber = document.querySelector('#num-questions-choice').value;
  const completionMessage = document.querySelector('#well-done-message');

  completionMessage.innerHTML = (numberIncorrect > (totalNumber/2)) ? 'Oh dear' : 'Well Done';

  document.querySelector('#number-correct').innerHTML = document.querySelector('#correct').innerHTML;
  document.querySelector('#total-number').innerHTML = document.querySelector('#num-questions-choice').value;
  document.querySelector('#well-done-area').classList.remove('hide');

  // Hide the question and answers area
  document.querySelector('#question-area').classList.add('hide');
  answersArea.classList.add('hide');

  // Change the text on the button to have another go
  button.innerText = 'Have another go!';
}

function displayNextQuestion() {

  // Get num of questions required
  const numQuestions = parseInt(document.querySelector('#num-questions-choice').value);

  if (currentQuestion < numQuestions) {

    // Increase question number 
    currentQuestion += 1;

    // Set html to new value
    document.querySelector('#question-number').innerHTML = `Q${currentQuestion}`;

    // Set question in html to next question in array
    document.querySelector('#question').innerHTML = questionsArray[currentQuestion - 1].question;
    getAnswers(currentQuestion);

    // Set button text on html page
    button.innerText = 'Submit Answer';

  } else {
    // Last question shown - show results
    showResults();
  }
}

/* Runs when Next Question button clicked */
function nextQuestion() {

  // Hide incorrect answer area and show answers area
  document.querySelector('#incorrect-answer-area').classList.add('hide');
  answersArea.classList.remove('hide');

  // display next question
  displayNextQuestion();

}

/* Runs when Next Question button clicked */
function submitAnswer() {

  // last question was correct - show next question
  if (isCorrect()) {

    //Increase Correct score
    const correctScore = document.querySelector('#correct');
    correctScore.innerHTML = parseInt(correctScore.innerHTML) + 1;
    displayNextQuestion();

    // Set button text on html page
    //button.innerText = 'Submit Answer';

  } else {

    //Increase incorrect score
    const incorrectScore = document.querySelector('#in-correct');
    incorrectScore.innerHTML = parseInt(incorrectScore.innerHTML) + 1;

    // Set correct answer on html page
    document.querySelector('#correct-answer').innerText = questionsArray[currentQuestion - 1].correctAnswer;;

    // Show incorrect answer area and hide answers
    document.querySelector('#incorrect-answer-area').classList.remove('hide');
    answersArea.classList.add('hide');

    // Set button text on html page
    button.innerText = 'Next Question';
  }
}

function buttonClicked() {
  //Get current button text to decide action
  const buttonText = button.innerText;

  switch (buttonText) {
    case 'Start Game': {
      startGame();
      break;
    }
    case 'Submit Answer': {
      submitAnswer();
      break;
    }
    case 'Next Question': {
      nextQuestion();
      break;
    }
    // Re-start 
    default: {
      document.querySelector('#well-done-area').classList.add('hide');
      document.querySelector('#incorrect-answer-area').classList.add('hide');
      document.querySelector('#motivational-area').classList.remove('hide');
      document.querySelector('#score-area').classList.add('hide');
      button.innerText = 'Start Game';
      document.querySelector('#correct').innerText = '0';
      document.querySelector('#in-correct').innerText = '0';

      // Disable preferences
      document.querySelector('#topic-choice').disabled = false;
      document.querySelector('#level-choice').disabled = false;
      document.querySelector('#num-questions-choice').disabled = false;
      break;
    }
  }
}

/* Fetch questions by calling an API and passing the mode required */
async function fetchDataFromAPI(mode) {

  // Get Preferences from html page
  const topicCode = document.querySelector('#topic-choice').value;
  const level = document.querySelector('#level-choice').value;
  const numQuestions = document.querySelector('#num-questions-choice').value;

  // Define urls
  const questionsUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${topicCode}&difficulty=${level}`;
  const categoriesUrl = 'https://opentdb.com/api_category.php';

  let url = (mode === "categories") ? categoriesUrl : questionsUrl;

  try {
    let result = await fetch(url);
    return await result.json();
  } 
  catch (error) {
    alert('Unfortunately the questions site is currently unavailable. \nPlease try again later.');
    button.disabled = true;
  }
}

/* Populate global questions array with questions etc from API */
async function getQuestions() {

  let questions = await fetchDataFromAPI("questions");
  const modifiedQuestions = questions.results.map(q => {
    return {
      question: q.question,
      correctAnswer: q.correct_answer,
      answers: [...q.incorrect_answers, q.correct_answer],
      type: q.type
    }
  });

  // Clear the array first 
  questionsArray = [];

  // Push each member of modifiedQuestions array to global array  
  modifiedQuestions.forEach(question =>  {

    // As corrrect answer is always last move to a random position instead
    const randomPosition = Math.floor(Math.random() * question.answers.length);
    question.answers[question.answers.length - 1] = question.answers[randomPosition];
    question.answers[randomPosition] = question.correctAnswer;

    // Push question to global array
    questionsArray.push(question);
    }
    );

  // Set current question to 1
  currentQuestion = 1;

  /* Populate the first question and answers */
  document.querySelector('#question-number').innerHTML = 'Q1';
  document.querySelector('#question').innerHTML = questionsArray[0].question;
  getAnswers(currentQuestion);

}

/* Populate categories from API */
async function getCategories() {

  // Get Categories from API
  let categories = await fetchDataFromAPI("categories");

  // Create the html dynamically for each category
  let html = '<select name="topic" value="General Knowledge" id="topic-choice" >';

  categories.trivia_categories.forEach(
    category => {
      html += `<option value="${category.id}">${category.name}</option>`;
    }
  );

  // Update html page
  document.querySelector('#topic-choice').innerHTML = html;
}

// Load categories from API as topics
getCategories();

// Set button click function
button.addEventListener('click', buttonClicked);