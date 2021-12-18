
"use strict"

/* Declare Global Variables */
let questionsArray = [];
let currentQuestion = 0;

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
  document.getElementById("answers-area").innerHTML = html;
}

/* Runs when Start Game button clicked */
function startGame() {

  /* Get questions etc from API */
  getQuestions();

  // Hide motivational area
  document.getElementById('motivational-area').classList.add('hide');

  //Show the scores, question area and answers 
  document.getElementById('question-area').classList.remove('hide');
  document.getElementById('answers-area').classList.remove('hide');
  document.getElementById('score-area').classList.remove('hide');

  // Set button text to 'Submit Answer'
  document.getElementById('button').innerText = "Submit Answer";

  // Disable preferences
  document.getElementById('topic-choice').disabled = true;
  document.getElementById('level-choice').disabled = true;
  document.getElementById('num-questions-choice').disabled = true;

}


function isCorrect() {

  // Get the correct answer for that question
  let correctAnswer = questionsArray[currentQuestion - 1].correctAnswer;

  // Get all the radio elements for the question
  let answers = document.getElementsByName('answer');

  // Read through this array looking for the one selected
  let i = 0;
  while (!answers[i].checked) {
    i++;
  }
  // Get the answer selected
  let answerSelected = questionsArray[currentQuestion - 1].answers[i];

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

function displayNextQuestion() {

  if (currentQuestion < parseInt(document.getElementById('num-questions-choice').value)) {
    // Increase question number 
    currentQuestion += 1;
    // Set html to new value
    document.getElementById('question-number').innerHTML = `Q${currentQuestion}`;

    // Set question in html to next question in array
    document.getElementById('question').innerHTML = questionsArray[currentQuestion - 1].question;

    // If answer is boolean only one answer is supplied so just print true and false as we know those are the only possible answers anyway
    getAnswers(currentQuestion);

    // Set button text to 'Submit Answer'
    document.getElementById('button').innerText = "Submit Answer";
  }
  // Last question shown
  else {
    showResults();
  }
}

/* Runs when Next Question button clicked */
/* Runs when Next Question button clicked */
function nextQuestion() {

  // Hide incorrect answer area and show answers area
  document.getElementById('incorrect-answer-area').classList.add('hide');
  document.getElementById('answers-area').classList.remove('hide');

  // display next question
  displayNextQuestion();

}

/* Runs when Next Question button clicked */
function submitAnswer() {

  // last question was correct - show next question
  if (isCorrect()) {

    //Increase Correct score
    const correctScore = document.getElementById('correct');
    correctScore.innerHTML = parseInt(correctScore.innerHTML) + 1;
    displayNextQuestion();

    // Set button text on html page
    //document.getElementById('button').innerText = 'Submit Answer';

  } else {

    //Increase incorrect score
    const incorrectScore = document.getElementById('in-correct');
    incorrectScore.innerHTML = parseInt(incorrectScore.innerHTML) + 1;

    // Set correct answer on html page
    document.getElementById('correct-answer').innerText = questionsArray[currentQuestion - 1].correctAnswer;;

    // Show incorrect answer area and hide answers
    document.getElementById('incorrect-answer-area').classList.remove('hide');
    document.getElementById('answers-area').classList.add('hide');

    // Set button text on html page
    document.getElementById('button').innerText = 'Next Question';
  }
}

function buttonClicked() {
  //Get current button text to decide action
  const buttonText = document.getElementById('button').innerText;

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
      document.getElementById('well-done-area').classList.add('hide');
      document.getElementById('incorrect-answer-area').classList.add('hide');
      document.getElementById('motivational-area').classList.remove('hide');
      document.getElementById('button').innerText = 'Start Game';
      document.getElementById('correct').innerText = '0';
      document.getElementById('in-correct').innerText = '0';

      // Disable preferences
      document.getElementById('topic-choice').disabled = false;
      document.getElementById('level-choice').disabled = false;
      document.getElementById('num-questions-choice').disabled = false;
      break;
    }
  }
}

/* Fetch questions by calling an API and passing the mode required */
async function fetchDataFromAPI(mode) {

  // Get Preferences from html page
  const topicCode = document.getElementById('topic-choice').value;
  const level = document.getElementById('level-choice').value;
  const numQuestions = document.getElementById('num-questions-choice').value;

  // Define urls
  const questionsUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${topicCode}&difficulty=${level}`;
  const categoriesUrl = 'https://opentdb.com/api_category.php';

  let url = (mode === "categories") ? categoriesUrl : questionsUrl;

  try {
    let result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log(error);
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
  modifiedQuestions.forEach(question => questionsArray.push(question));

  // Set current question to 1
  currentQuestion = 1;

  /* Populate the first question and answers */
  document.getElementById('question-number').innerHTML = 'Q1';
  document.getElementById('question').innerHTML = questionsArray[0].question;
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
  document.getElementById('topic-choice').innerHTML = html;
}

// Load categories from API as topics
getCategories();

// Set button click function
document.getElementById('button').addEventListener('click',buttonClicked);