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
      correctAnswer: q.correctAnswer,
      answers: [...q.incorrect_answers, q.correctAnswer]
    }
  });
  for (let i=0;i< modifiedQuestions.length; i++)  {
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
      case 'General Knowledge' :
         { topic_code = 9; 
        break;}
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
  
}




