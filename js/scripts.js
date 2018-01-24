
var url = "https://opentdb.com/api.php?amount=9&category=9&difficulty=";

var difficulty = ["easy", "medium", "hard"];
// assign easy, medium, or hard to difficulty variable based on user's input 

function getTrivia(difficulty) { 
	$.ajax({
	  dataType: "json",
	  url: url + difficulty,
	  success: function(result) {
	  	var questions = result.results;
	  	console.log(questions);
	  	console.log(questions[0].question)
	  	var trivia = questions;
	  	for (var i = 0; i < questions.length; i++) {
			// var triviaQ = result.results.question;
			var answers = [];
			console.log(questions[i].question);
			function shuffleArray(array) {
			    for (var i = array.length - 1; i > 0; i--) {
			        var j = Math.floor(Math.random() * (i + 1));
			        var temp = array[i];
			        array[i] = array[j];
			        array[j] = temp;
			    }
			};
			if (questions[i].type == "multiple") {
				$('#main').append(formatTrivia(questions[i]));
				answers.push(questions[i].correct_answer, questions[i].incorrect_answers[0], questions[i].incorrect_answers[1], questions[i].incorrect_answers[2]);
				shuffleArray(answers);
				console.log(answers);
			} else {
				$('#main').append(formatTorF(questions[i]));
				answers.push(questions[i].correct_answer, questions[i].incorrect_answers[0]);
				shuffleArray(answers);
				console.log(answers);
			}
		}
	  }
	});
}

$(document).ready(function() {
	$('#easy').click(function() {
		getTrivia(difficulty[0]);
		$('.intro').hide();
		$('#hidden').removeAttr('id');
	});

	$('#medium').click(function() {
		getTrivia(difficulty[1]);
		$('.intro').hide();
		$('#hidden').removeAttr('id');
	});

	$('#hard').click(function() {
		getTrivia(difficulty[2]);
		$('.intro').hide();
		$('#hidden').removeAttr('id');
	});

	$('#hidden').click(function() {
		location.reload();
	});
	
});

function formatTrivia(trivia) {
	var result = '<div class="trivia-q">' +  
        '<h2>' + trivia.question + '</h2>' + 
        '<ul><a href="#"><li> a) ' + trivia.correct_answer + '</li></a>' +
        '<a href="#"><li> b) ' + trivia.incorrect_answers[0] + '</li></a>' +
        '<a href="#"><li> c) ' + trivia.incorrect_answers[1] + '</li></a>' +
        '<a href="#"><li> d) ' + trivia.incorrect_answers[2] + '</li></a></ul>' + 
      '</div>';
      return result;
} 

function formatTorF(trivia) {
	var result = '<div class="trivia-q">' +  
        '<h2>' + trivia.question + '</h2>' + 
        '<ul><a href="#"><li> a) ' + trivia.correct_answer + '</li></a>' +
        '<a href="#"><li> b) ' + trivia.incorrect_answers[0] + '</li></a></ul>' + 
      '</div>';
      return result;
} 

// shuffle correct answer and incorrect answers


// results.question
// if results.type === "multiple" put radio buttons
// if results.type === "boolean" put true or false radio buttons
// https://opentdb.com/api_config.php