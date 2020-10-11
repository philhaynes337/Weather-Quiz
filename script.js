



// Start Data and questions for quiz
const QUIZ = { questions: [ 	{ question: 'What kind of weather would you expect in a low pressure system?', answer: 'Rainy', answers: [ 'Sunny', 'Calm Winds', 'Hot', 'Rainy'] },
								{ question: 'What season happens in the Northern hemisphere in December?', answer: 'Winter', answers: [ 'Spring', 'Summer', 'Winter', 'Fall'] },
								{ question: 'What season happens in the Southern hemisphere in December?', answer: 'Summer', answers: [ 'Spring', 'Summer', 'Winter', 'Fall'] }, 
								{ question: 'What is the process called when a liquid turns into a gas?', answer: 'Evaporation', answers: [ 'Evaporation', 'Condensation', 'Vapor Pressure', 'Fumigation'] }, 
								{ question: 'What measures wind speed?', answer: 'Anemometer', answers: [ 'Anemometer', 'Wind Gauge', 'Thermometer', 'Kestrel'] } 
								],

				quizStarted: false,
  				currentQuestion: 0,
  				score: 0

				};





// This is the start page for the render

function startHtml () {
	return `
<div class="start">
	<p>Are you ready to test your basic knowledge of Weather? Click the ready button!</p>
	<button type="button" id="start" class="btn-start centerit">Ready!</button>
	</div>
	`
}

// This is the catch all render
 function render() {
  let html = '';

  if (QUIZ.quizStarted === false) {
  	console.log("Start HTML has started!");
    $('.js-html-weather').html(startHtml());
    return;
  }


 if (QUIZ.quizStarted === true && QUIZ.currentQuestion < QUIZ.questions.length) {
 	console.log("Quiz has started");
 	html = genScoreHtml();
 	html += questionsHtml();
 	$('.js-html-weather').html(html)
 	$('#next-question-btn').hide();

 }
  else {
    $('.js-html-weather').html(resultsHtml());
  }
}



// deals with the ready button
function readyButton() {
  $('.js-html-weather').on('click', '#start', function (event) {
    QUIZ.quizStarted = true;
    render();
  });
}


// shows the questions
function questionsHtml() {
	console.log("Questions is being ran");
	let currentQuestion = QUIZ.questions[QUIZ.currentQuestion].question;
	console.log(QUIZ.questions[QUIZ.currentQuestion].question);



	return `
<form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${currentQuestion}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${ganswersHtml()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5" class="btn-start centerit">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6" class="btn-start centerit"> Next &gt;></button>
      </fieldset>
    </form >
	`




}


// Recieves the answers from the array and checks against it

function ganswersHtml() {
  const answersArray = QUIZ.questions[QUIZ.currentQuestion].answers
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;

    i++;
  });
  return answersHtml;
}


// Code displays score and current question number

function genScoreHtml() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${QUIZ.currentQuestion + 1}/${QUIZ.questions.length}
      </li>
      <li id="score">
        Score: ${QUIZ.score}/${QUIZ.questions.length}
      </li>
    </ul>
  `;
}



// code handles what happens when you click the submit button. 
// holds the value from the selected option then checks against the correct answer

function questionSubmission() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = QUIZ.questions[QUIZ.currentQuestion];

    
    let selectedOption = $('input[name=options]:checked').val();




    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === currentQuestion.answer) {
      QUIZ.score++;
      $(optionContainerId).append(feedbackHTML('correct'));
    }
    else {
      $(optionContainerId).append(feedbackHTML('incorrect'));
    }
    QUIZ.currentQuestion++;
   
    $('#submit-answer-btn').hide();
    
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    
    $('#next-question-btn').show();

  });
}


// Code displays on the site if the answer was correct or not.

function feedbackHTML(answerStatus) {
  let correctAnswer = QUIZ.questions[QUIZ.currentQuestion].answer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">That is correct!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
    `;
  }
  return html;
}



// This function handles the next button. Sends it back to the render function

function nextQuestion() {
  $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}



// this function handles the overall results on the site.

function resultsHtml() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${QUIZ.score}/${QUIZ.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart" class="btn-restart centerit">Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}



// This handels the restart button and sets all attributes back to default.

function restartButton() {
  $('body').on('click', '#restart', () => {
    QUIZ.quizStarted = false;
  	QUIZ.currentQuestion = 0;
  	QUIZ.score = 0;
    render();
  });
}


// This bundle handle's all the functions that need to be started after the site loads

function weatherQuiz() {
 render(); 
 readyButton();
 questionSubmission();
 nextQuestion();
 restartButton();

}



// loads all the functions after the site loads
$(weatherQuiz);