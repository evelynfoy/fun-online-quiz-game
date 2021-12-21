
"use strict";
/*jshint strict: global */
/*jshint esversion: 8 */

/* Declare Global Variables */
let questionsArray = [];
let currentQuestion = 0;

// Define references to html document elements
const buttonRef = document.querySelector('#button');
const answersAreaRef = document.querySelector('#answers-area');
const motivationalAreaRef = document.querySelector('#motivational-area');
const questionAreaRef = document.querySelector('#question-area');
const scoreAreaRef = document.querySelector('#score-area');
const topicChoiceRef = document.querySelector('#topic-choice');
const levelChoiceRef = document.querySelector('#level-choice');
const numQuestionsChoiceRef =  document.querySelector('#num-questions-choice');
const incorrectRef = document.querySelector('#incorrect');
const numberCorrectRef = document.querySelector('#number-correct');
const wellDoneAreaRef = document.querySelector('#well-done-area');
const totalNumberRef = document.querySelector('#total-number');
const questionNumberRef = document.querySelector('#question-number');
const questionRef =  document.querySelector('#question');
const incorrectAnswerAreaRef = document.querySelector('#incorrect-answer-area');
const correctAnswerRef = document.querySelector('#correct-answer');
const correctRef = document.querySelector('#correct');
const restartRef = document.querySelector('#restart');
const completionMessageRef = document.querySelector('#well-done-message');

/**
 * Reads through the answers for the current question in the questions array and writes then to the html document as radio button elements.
 * The first one is automatically selected to ensure an entry is made.
 */
function getAnswers() {
  let html = ``;

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
  answersAreaRef.innerHTML = html;
}

/**
 * Runs when Start Game button clicked. Gets the questions etc from API. 
 * Hides the motivational area, shows the scores, question area and answers.
 * Sets button text to 'Submit Answer' and disables preferences.
 */
function startGame() {

  getQuestions();

  motivationalAreaRef.classList.add('hide');

  questionAreaRef.classList.remove('hide');
  answersAreaRef.classList.remove('hide');
  scoreAreaRef.classList.remove('hide');

  buttonRef.innerText = `Submit Answer`;

  topicChoiceRef.disabled = true;
  levelChoiceRef.disabled = true;
  numQuestionsChoiceRef.disabled = true;

}

/**
 * Gets the correct answer for the current question.
 * Gets all the radio element answers for the question, 
 * Identifies the chosen answer from the id of the checked answer e.g. if answer1 was checked answerSelectedId is set to 1.
 * Gets the answer text from the questions array using answerSelectedId 
 * @returns {boolean} true if text of the chosen answer same as correct answer in the questions array for that question
 */
function isCorrect() {

  const correctAnswer = questionsArray[currentQuestion - 1].correctAnswer;
  const answers = document.getElementsByName('answer');

  const answerSelectedId = (Array.from(answers).find(answer => answer.checked).id).substring(6);
  const answerSelectedText = questionsArray[currentQuestion - 1].answers[answerSelectedId]; 

  return (correctAnswer === answerSelectedText);

}

/**
 * Sets the text of the well-done-message to 'Well Done' if score achieved is greater than half the number of questions.
 * Displays the number of correct answers and the total number of questions.
 * Displays the Well-done area
 * Hides the question and answers areas
 * Changes the button text to 'Have another Go!'  
 */
function showResults() {

  completionMessageRef.innerHTML = (incorrectRef.innerHTML > (numQuestionsChoiceRef.value/2)) ? `Oh dear` : `Well Done`;

  numberCorrectRef.innerHTML = correctRef.innerHTML;
  totalNumberRef.innerHTML = numQuestionsChoiceRef.value;

  wellDoneAreaRef.classList.remove('hide');
  questionAreaRef.classList.add('hide');
  answersAreaRef.classList.add('hide');

  buttonRef.innerText = `Have another go!`;
}

/**
 *   Gets the number of questions requested
 *   If the last question has been shown it calls the show results function otherwise it 
 *     Increases the question number and displays new value
 *     Displays the next question in array
 *     Calls the function to display all the answers for that question
 *     Changes the button text to 'Submit Answer'
 */
function displayNextQuestion() {

  const numQuestions = parseInt(numQuestionsChoiceRef.value);

  if (currentQuestion < numQuestions) {

    currentQuestion += 1;
    questionNumberRef.innerHTML = `Q${currentQuestion}`;
    questionRef.innerHTML = questionsArray[currentQuestion - 1].question;
    getAnswers(currentQuestion);
    buttonRef.innerText = `Submit Answer`;

  } else {
      showResults();
  }
}

/**
 * Runs when Next Question button clicked, hides the incorrect answer area and shows the answers area, calls display next question function
 */
function nextQuestion() {

  incorrectAnswerAreaRef.classList.add('hide');
  answersAreaRef.classList.remove('hide');
  displayNextQuestion();

}

/*  */
/**
 * Runs when Submit Question button clicked
 * if the last question was correct it increase the correct answers score and shows the next question
 * otherwise it increases the incorrect anmswer score, shows the correct answer and changes the button text to Next Question
 */
function submitAnswer() {

  // 
  if (isCorrect()) {

    correctRef.innerHTML = parseInt(correctRef.innerHTML) + 1;
    displayNextQuestion();

  } else {

    incorrectRef.innerHTML = parseInt(incorrectRef.innerHTML) + 1;
    correctAnswerRef.innerText = questionsArray[currentQuestion - 1].correctAnswer;
    incorrectAnswerAreaRef.classList.remove('hide');
    answersAreaRef.classList.add('hide');

    buttonRef.innerText = `Next Question`;
  }
}

/**
 * Calls the appropriate function when the button is clicked based on its text value or
 * resets the game to start again
 */
function buttonClicked() {

  switch (buttonRef.innerText) {
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
      wellDoneAreaRef.classList.add('hide');
      incorrectAnswerAreaRef.classList.add('hide');
      motivationalAreaRef.classList.remove('hide');
      scoreAreaRef.classList.add('hide');
      buttonRef.innerText = `Start Game`;
      correctRef.innerText = `0`;
      incorrectRef.innerText = `0`;

      // Disable preferences
      topicChoiceRef.disabled = false;
      levelChoiceRef.disabled = false;
      numQuestionsChoiceRef.disabled = false;
      break;
    }
  }
}

/**
 * Runs when the restart button is clicked.
 * Resets the game to start again
 */
function restart() {
  
  wellDoneAreaRef.classList.add('hide');
  incorrectAnswerAreaRef.classList.add('hide');
  motivationalAreaRef.classList.remove('hide');
  scoreAreaRef.classList.add('hide');
  answersAreaRef.classList.add('hide');
  questionAreaRef.classList.add('hide');

  buttonRef.innerText = `Start Game`;
  correctRef.innerText = `0`;
  incorrectRef.innerText = `0`;

  // Enable preferences
  topicChoiceRef.disabled = false;
  levelChoiceRef.disabled = false;
  numQuestionsChoiceRef.disabled = false;
}

/**
 * If mode is categories then it returns a list of categories otherwise it returns a list of questions.
 * For categories it fetches the list using the https://opentdb.com/api_category.php url
 * For questions it retrieves the preferences made by the player and uses the https://opentdb.com/api.php?amount=${numQuestions}&category=${topicCode}&difficulty=${level} url 
 * If the site is unavailable then an alert message is shown and the button is disabled.
 * @param {string} mode 
 * @returns {Response} Results of the fetch requested, categories or questions
 */
async function fetchDataFromAPI(mode) {

  const topicCode = topicChoiceRef.value;
  const level = levelChoiceRef.value;
  const numQuestions = numQuestionsChoiceRef.value;

  const questionsUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${topicCode}&difficulty=${level}`;
  const categoriesUrl = `https://opentdb.com/api_category.php`;

  const url = (mode === "categories") ? categoriesUrl : questionsUrl;

  try {
    const result = await fetch(url);
    return await result.json();
  } 
  catch (error) {
    alert(
      `Unfortunately the questions site is currently unavailable. 
Please try again later.`);
    buttonRef.disabled = true;
  }
}

/**
 * Calls the async function that fetches the questions using the API
 * Reads through the returned questions and extracts the data required.
 * It then pushes each entry to a global questions array.
 * As the corrrect answer is always the last one returned, it is moved to a random position instead.
 * Sets the current question to 1, populates the first question and calls the function to gets the answers 
 */
async function getQuestions() {

  const questions = await fetchDataFromAPI("questions");
  const modifiedQuestions = questions.results.map(q => {
    return {
      question: q.question,
      correctAnswer: q.correct_answer,
      answers: [...q.incorrect_answers, q.correct_answer],
      type: q.type
    };
  });

  questionsArray = [];

  modifiedQuestions.forEach(question =>  {

    const randomPosition = Math.floor(Math.random() * question.answers.length);
    question.answers[question.answers.length - 1] = question.answers[randomPosition];
    question.answers[randomPosition] = question.correctAnswer;

    questionsArray.push(question);
    });

  currentQuestion = 1;

  questionNumberRef.innerHTML = `Q1`;
  questionRef.innerHTML = questionsArray[0].question;
  getAnswers(currentQuestion);

}

/**
 * Calls the async function that fetches the categories using an API passing in a mode of 'Categories'.
 * Creates an html option for each category and updates the html page with the list
 */
async function getCategories() {

  const categories = await fetchDataFromAPI("categories");

  let html = `<select name="topic" value="General Knowledge" id="topic-choice" >`;

  categories.trivia_categories.forEach(
    category => {
      html += `<option value="${category.id}">${category.name}</option>`;
    }
  );

  topicChoiceRef.innerHTML = html;
}

// Load categories from API as topics
getCategories();

// Set button click functions
buttonRef.addEventListener('click', buttonClicked);
restartRef.addEventListener('click', restart);