/* Runs when Start Game button clicked */
function startGame() {
  /* Get Preferences */

  /* Get topic chosen from html*/
  let topic = document.getElementById('topic-choice').value;

  /* Convert description to code required by the API */
  let topic_code;
  switch (topic) {
      case 'General Knowledge' :
          topic_code = 9; 
  }

  /* Get level and number of questions from html also */
  let level = document.getElementById('level-choice').value;
  let num_questions = document.getElementById('num-questions-choice').value;

  
}