
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
			console.log(questions[i].question);
		  	var answers = [];
			function shuffleArray(array) {
			    for (var i = array.length - 1; i > 0; i--) {
			        var j = Math.floor(Math.random() * (i + 1));
			        var temp = array[i];
			        array[i] = array[j];
			        array[j] = temp;
			    }
			};
			if (questions[i].type == "multiple") {
				answers.push(questions[i].correct_answer, questions[i].incorrect_answers[0], questions[i].incorrect_answers[1], questions[i].incorrect_answers[2]);
				shuffleArray(answers);
				console.log(answers);
				$('#main').append(formatTrivia(questions[i], answers));
			} else {
				answers.push(questions[i].correct_answer, questions[i].incorrect_answers[0]);
				shuffleArray(answers);
				console.log(answers);
				$('#main').append(formatTorF(questions[i], answers));
			}
		}
	  }
	});
}

var today = new Date();
var dd = today.getDate();
var day = today.getDay();
var mm = today.getMonth();
var yyyy = today.getFullYear();
var monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

$(document).ready(function() {
	// var count = 0;
	$('.intro').prepend("<h5>" + daysOfWeek[day].toLowerCase() + ", " + monthsOfYear[mm].toLowerCase() + " " + dd + ", " + yyyy + "</h5>");
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

	// if user clicks on trivia-q element, run it against that trivia.correct_answer

	$(document).on('click', 'h4', function() {
		$(this).toggle();
		$(this).next().removeAttr('id');
	});

	$(document).on('click', 'li', function() {
		var compare = $(this).parent().next()[0].textContent;
		if (this.textContent == compare) {
			$(this).css('color', 'lime');
			$(this).siblings().css('color', 'lightcoral');
			$(this).parent().parent().append('<i class="far fa-check-circle fa-4x"></i>');
			// count++;
		} else {
			$(this).css('color', 'lightcoral');
			// $(this).prepend('<i class="fas fa-times"></i>');
		}
	})
});

function formatTrivia(trivia, response) {
	var result = '<div class="trivia-q">' +  
        '<h2>' + trivia.question + '</h2>' + 
        '<ul><li>' + response[0] + '</li>' +
        '<li>' + response[1] + '</li>' +
        '<li>' + response[2] + '</li>' +
        '<li>' + response[3] + '</li></ul>' +  
        '<h5 id="hidden">' + trivia.correct_answer + '</h5>' +  
      '</div>';
      return result;
} 

function formatTorF(trivia, response) {
	var result = '<div class="trivia-q">' +  
        '<h2>' + trivia.question + '</h2>' + 
        '<ul><li>' + response[0] + '</li>' +
        '<li>' + response[1] + '</li></ul>' + 
        '<h5 id="hidden">' + trivia.correct_answer + '</h5>' + 
      '</div>';
      // could i hide the correct answer here, and then if they click one of the a links, check the equality that way?
      return result;
} 


// results.question
// if results.type === "multiple" put radio buttons
// if results.type === "boolean" put true or false radio buttons
// https://opentdb.com/api_config.php