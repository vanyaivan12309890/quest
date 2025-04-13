//Time controll/---------------------------------

let timeStorage = localStorage;
let time;

if (timeStorage.getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"));
} else {
	time = 300;
	timeStorage.setItem("time", time);
}

//------------------------------------------------

let firstCard = null;
let secondCard = null;

let cards = [
	{
		name: "php",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
		id: 1,
	},
	{
		name: "css3",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
		id: 2
	},
	{
		name: "html5",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
		id: 3
	},
	{
		name: "jquery",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
		id: 4
	}, 
	{
		name: "javascript",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
		id: 5
	},
	{
		name: "node",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
		id: 6
	},
	{
		name: "photoshop",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
		id: 7
	},
	{
		name: "python",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
		id: 8
	},
	{
		name: "rails",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
		id: 9
	},
	{
		name: "sass",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
		id: 10
	},
	{
		name: "sublime",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
		id: 11
	},
	{
		name: "wordpress",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
		id: 12
	}
];

let progress = 0;

$(document).ready(function () {
	$("#rules").hide();
	$(".progress").knob({
		'min': 0, 
		'max': 12,
		'angleOffset': -60,
		'angleArc': 120,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'round',
		'displayInput' : false,
		'bgColor' : '#38A3A5',
		'fgColor' : '#22577A'
	});
	$(".time").knob({
		'min': 0, 
		'max': 300,
		'angleOffset': 0,
		'angleArc': 360,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'butt',
		'displayInput' : false,
		'bgColor' : '#38A3A5',
		'fgColor' : '#22577A'
	});

	$(".slideRules").click(function () {
		$("#rules").slideToggle();
	});

	$("#start").click(function () {
		$("#start").css('display', 'none');
		$(".gameBoard").css('display', 'grid');
		fillBoard();
		$('.card').on('click', cardClicked);
		startTime();
	});
});

function fillBoard() {
	let board = shuffle([...cards, ...cards]);
	for(let i = 0; i < board.length; i++){
		let cardHtml = `<div class="card" data-id="${board[i].id}">
			<div class="front">R0B0C0DE</div>
			<div class="back"><img src="${board[i].img}" alt="${board[i].name}"></div>
		</div>`;
		$('.gameBoard').append(cardHtml);
	}
}

function shuffle(array){
	let counter = array.length;
	let temp;
	let index;
   // While there are elements in the array
   while (counter > 0) {
	// Pick a random index
	index = Math.floor(Math.random() * counter);
	// Decrease counter by 1
	counter--;
	// And swap the last element with it
	temp = array[counter];
	array[counter] = array[index];
	array[index] = temp;
	}
	return array;
}

function cardClicked(event) {
	if(secondCard || $(this).hasClass('matched')){
		return
	}
	if(!firstCard){
		firstCard = $(this);
		firstCard.addClass('flip');
		return
	}
	if(firstCard){
		secondCard = $(this);
		secondCard.addClass('flip');
		if(firstCard.attr('data-id') == secondCard.attr('data-id')){
			firstCard.addClass('matched');
			secondCard.addClass('matched');
			firstCard = null;
			secondCard = null;
			progress++;
			$('.progress').val(progress).trigger('change');
			if(progress==12) {
				win();
			}
			return
		}
		else {
			setTimeout(function(){
				firstCard.removeClass('flip');
				secondCard.removeClass('flip');
				firstCard = null;
				secondCard = null;
			},600);
		}
	}
}

function win(){
	$(".gameBoard").css({
		'display' : 'none'
	});
	$("#win").css({
		'display' : 'flex'
	});
	localStorage.removeItem("time");
}

function startTime () {
	setInterval(function () {
		time = parseInt(localStorage.getItem("time")) - 1;
		$(".time").val(time).trigger('change');
		if (time == 0) {
			alertify.error("Time is out!");
			setTimeout(() => window.open("../Task1/task1.html", "_self", false), 2000);
			localStorage.removeItem("time");
		} else if (time > 0) {
			localStorage.setItem("time", time);
		}
	}, 1000);
}
