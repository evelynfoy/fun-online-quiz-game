/* Declare Global Variables */
let questionsArray = [];
const booleanAnswers = `<div>
  <input type="radio" id="answer1" name="answer" >
  <label for="answer1">True</label>
</div>
<div>
  <input type="radio" id="answer1" name="answer" >
  <label for="answer1">False</label>
</div>`


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
      correctAnswer: q.correctAnswer,
      answers: [...q.incorrect_answers, q.correctAnswer],
      type: q.type
    }
  });

  /* Clear the array first */
  questionsArray = [];

  for (let i = 0; i < modifiedQuestions.length; i++) {
    questionsArray.push(modifiedQuestions[i]);
  }
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

    let html = '';
    // If answer is boolean only one answer is supplied so just print true and false as we know those are the only possible answers anyway
    if (questionsArray[0].type === 'boolean') {
      html = booleanAnswers
    } else {
      // Loop through any defined answers provided
      for (let i = 0; i < questionsArray[0].answers.length; i++) {
        if (questionsArray[0].answers[i]) {
          html += `<div>
          <input type="radio" id="answer${i}" name="answer" >
          <label for="answer${i}">${questionsArray[0].answers[i]}</label>
        </div>`
        }
      }
      document.getElementById("answers-area").innerHTML = html;
    }
  }, 800);

  document.getElementById('button').innerText = "Next Question";

}

function isCorrect() {
  console.log('Check if correct');
  return true;
}

/* Runs when Next Question button clicked */
function nextQuestion() {

  if (isCorrect()) {
    /* Get current question number */
    let questionNumber = parseInt(document.getElementById('question-number').innerHTML.substring(1));
    // Increase question number 
    questionNumber += 1;
    // Set html to new value
    document.getElementById('question-number').innerHTML = `Q${questionNumber}`;

    // Set question in html to next question in array
    document.getElementById('question').innerHTML = questionsArray[questionNumber].question;

    // If answer is boolean only one answer is supplied so just print true and false as we know those are the only possible answers anyway
    let html = '';
    if (questionsArray[questionNumber].type === 'boolean') {
      html = booleanAnswers;
    } 
    else {
      // Loop through any defined answers provided
      for (let i = 0; i < questionsArray[questionNumber].answers.length; i++) {
        if (questionsArray[questionNumber].answers[i]) {
          html += `<div>
            <input type="radio" id="answer${i}" name="answer" >
            <label for="answer${i}">${questionsArray[questionNumber].answers[i]}</label>
          </div>`;
        }
      }
    }
    document.getElementById("answers-area").innerHTML = html;
  } else {
    console.log('Incorrect');
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
    default: {
      startGame();
      break;
    }
  }
}