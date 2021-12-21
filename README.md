# Fun Online Quiz Game

This project is to build a fun Online Quiz game.
It should provide entertainment for it's audience. It targets all ages who like quizes.
This is a fully responsive quiz game that supplies as many questions as the user decides. It allows them to pick a level and a topic. 
It has a score tracking system that keeps track of the score as they go throuugh the questions and provides feedback after each question.
They can restart the game at any time if they choose to change the topic or level.
The game uses an API to get the requested number of questions and the categories available to be selected. https://opentdb.com

![Responsive Displays](docs/images/FOQG_Mockup.png)

# Wireframes
I have used [Balsamic](https://balsamiq.com/wireframes/ "Balsamic") to develop some wireframes for my website. 

The wireframes are below:

### [Phone wireframe](docs/wireframes/Phone.png "Phone wireframe")
### [Tablet Wireframe](docs/wireframes/Tablet.png "Tablet wireframe")
### [Desktop Wireframe](docs/wireframes/Desktop.png "Desktop Wireframe")


## Features 

The site consists of a single page with a large heading, a preference area,  a score area, a question area and an answer & feedback area. 
It has a button control to move to the next question and a restart option.


### Existing Features

- __The Fun Quiz Heading__

  - Featured at the top of the page, the Fun Online Quiz Game heading is easy to see for the user and advertises immediately what the site is about. 
  - It also gives the page a 'fun' feel.

- __The Nav bar__
  - The Nav bar is an unordered list containing a single item. Restart.
  - Here it is clearly visible and always available to the player but it is also out of the way of the main button and doesn't interfere with the game.
  - It takes the player back to the Start page where the preferences are enabled and the player can re-pick.

![Nav](docs/images/Heading.png)

- __The Prefences Area__

  - This section will allow the user select the topic, level and no of questions.These are disabled once the game is started. 
  - The options stack on top of each other on small screens like phones.

![Preferences](docs/images/Preferences-Phone.png)
![Preferences](docs/images/Preferences.png)

- __The Landing Area__

  - This section will display a message to encourage users to play and help them get started.

![Landing Area](docs/images/LandingArea.png)


- __The Score Area__

  - This section will allow the user to see exactly how many correct and incorrect answers they have provided. 
  - The correct and incorrect scores stack on top of each other on small screens like phones.

![Score Area](docs/images/ScoreArea-Phone.png)
![Score Area](docs/images/ScoreArea.png)

- __The Game Area__

  - This section will allow the user to play the quiz game. The user will be presented with a question and potential answers. 



- __The Question section__

  - The question section is where the user will be presented with a single question at a time. 

![Question Area](docs/images/QuestionArea.png)


- __The Answer section__

  - The answer section is where the user will be presented with a number of potential answers in a radio button format.
  - To answer they click one of the answers and click the 'Next Question' button. 
  - If they are incorrect a message will appear showing the result and the correct answwer. 
  - If they have reached the last question it will display the result  

![Answers Area](docs/images/AnswersArea.png)

- __The Incorrect Answer section__

  - The incorrect answer section appears when the wrong answer is selected and displays the right answer.

![Incorrect Answer Area](docs/images/IncorrectAnswerArea.png)


- __The Well Done section__

  - The well done section appears at the end and displays the score and a message.
  - If the player gets more than half the questions correct then the message says 'Well Done'. Otherwise it says 'Oh dear'.

![Well Done Area](docs/images/WellDoneArea.png)

- __The Button section__

  - The button in this section allows users to start the game, submit an answer or proceed to the next question. At the end they can choose to play another game.
  - The appropriate prompt will appear on the button as they progress.
  - If they get a question wrong then the button will display the text 'Next Queston'. If they get it right it will show 'Submit Answer'.

![Button Area Start](docs/images/ButtonAreaStart.png) 
![Button Area Next Question](docs/images/ButtonAreaNextQuestion.png)
![Button Area Have another go](docs/images/ButtonAreaHaveAnotherGo.png)  


### Features Left to Implement

- Add another game like matching images.

# Technologies used

## Languages
* HTML
* CSS
* Javascript

## Libraries & Framework
* [Google Fonts](https://fonts.google.com/ "Google Fonts")
* [Font Awesome library](https://fontawesome.com/ "Font Awesome")

## Tools
* [Balsamic](https://balsamiq.com/wireframes/ "Balsamic")
* [Open Trivia Database](https://opentdb.com/ "Open Trivia Database")


## Testing 

To test this site I did the following:-
First I tested the site on a mobile device and then on a tablet and laptop.
1) Clicked the site url in github - https://evelynfoy.github.io/fun-online-quiz-game/
   The site appeared quickly and looked well.
   The Favicon icon appeared correctly beside the title of the page.
   The restart button appeared on the left hand side was obvious but not intrusive. The text enlarged as I hovered over it.
   The topic dropdown was correctly populated with many categories from the API.
   The level was correctly populated with Easy, Medium and Hard.
   The number of questions was defaulted to 10 and appeared as a number that could be increassed or decreased using arrows or typed over.
   The preferences were stacked one over the other correctly and the length of the topic dropdown was limited in size to facilitate a smaller screen.
2) I clicked the Start Game button
   The Score area appeared correctly set to 0.
   The first question appeared with four answers the first of which was pre-selected.
   The button text read 'Submit Answer' 
   The preferences were now disabled but the restart button was clearly available
3) I clcked the button and the incorrect message appeared replacing the answers that had been displayed.
   It was smooth and looked well. The text stood out well in red against the light grey background.
   The button now said 'Next Question' and the incorrect answers had been correctly changed to 1.
4) I clicked the button again
   Another questions appeared as expected. 
5) I chose the correct answer this time and the next question appeared.
   The Correct Answer score increased.
6) I continued to click forward for a few more questions and it worked consistently.
7) At question 7 I clciked the restart button
   The landing page was re-displayed inviting me to start a game.
   The preferences were re-enabled but retained the previous choices.
8) Is chnaged the number of questions to 3 and re-started.
   The first question appeared.
   I clicked through the three questions which performed as expected.
9) After I completed the three questions the results appeared.
   Oh dear, I only got 1 out of 3 right. But never mind, I am invited to 'Have another go'.
10) I click the button again and I am back at the landing page.
11) I run it again this time getting more than half right and again the results appeared.
    Well Done - I am congratulated and my score appears correctly.
    Again I am invited to 'Have another go'.

I continue to play, chosing different topics, levels and questions amounts.
It is fun, engaging and a pleasant user experiance

I notice it changes to adapt to different screen sizes, displaying the aresa in single column format on a small screen and  two and three colums as the 
screen size gets bigger. Also I notice the padding and width size adjust comfortably for each screen size.

I am satisfied with the results

I then tested the error processing but changing the name of the url for the API to be incorrect.
It displayed an alert informing me that the questions site was currently unavailable and that I should try again later.
The button was disabled correctly preventing confusion.


### Validator Testing 

- HTML
    - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fevelynfoy.github.io%2Ffun-online-quiz-game%2F)
    - See [Results](docs/images/htmlValidatorResult.png)
- CSS
    - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fevelynfoy.github.io%2Ffun-online-quiz-game%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
    - See [Results](docs/images/cssValidation.png)
- JavaScript
    - No errors were found when passing through the official [Jshint validator](https://jshint.com/)
    - See [Results](docs/images/jsHintResults.png)
- Lighthouse Report
    - Accessibility score 97
    - See [Results](docs/images/LightHouseResults.png)
     
## Deployment

I created a repository in github for this project https://github.com/evelynfoy/fun-online-quiz-game
I then used the gitpod editor to build it.

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - Then click the Pages tab.
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refresh with a link to the deployed site. 

The live link can be found here - https://evelynfoy.github.io/fun-online-quiz-game/


## Credits 

For code inspiration, help and advice,
* [Simen Daehlin](https://github.com/Eventyret "Simen Daehlin")
* [JavaScript Fetch API](https://www.javascripttutorial.net/javascript-fetch-API, "JavaScript Fetch API")

- The font I used was Roboto from Google Fonts [Roboto](https://fonts.google.com/?query=Roboto "Roboto") which I felt gave the game a clean and fun look.

### Content 

For content and style inspiration,

* [Free Astronomy Quiz](https://www.free-astronomy-quiz.com/index.html)
* [Open Trivia Database](https://opentdb.com)
* [Font Awesome](https://fontawesome.com/)







