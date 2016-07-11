"use strict";

const app = {};

// On form submit, find the number of the persons sugar pass it on to check it
app.inputData = () => {
	$('form').on('submit', (e) => {
		e.preventDefault();
		$('main').empty();
		const sugar = parseInt($('#inputInfo').val());
		if (isNaN(sugar)) {
			alert('please input a number');
		} else {
			app.checkSugar(sugar);
		}
	});
};

app.checkSugar = (sugar) => {
	let i
	let searchTerm
	let offset = Math.floor(Math.random() * 50);
	let number = Math.floor(Math.random() * 25);
	if(sugar > 10) {
		i = app.randomWord(app.searchWords[1].length);
		searchTerm = app.searchWords[1][i].word;
	} 
	else if (sugar < 5) {
		i = app.randomWord(app.searchWords[2].length);
		searchTerm = app.searchWords[2][i].word;
	} 
	else {
		i = app.randomWord(app.searchWords[0].length);
		console.log(`${i} and ${number} and ${offset}`);
		searchTerm = app.searchWords[0][i].word;
	}
		console.log(searchTerm);
		app.findGif(searchTerm, number, offset);
};

app.randomWord = (path) => {
	let i = Math.floor(Math.random() * path);
	return i;
};


app.apiKey = "dc6zaTOxFJmzC";
app.giphy = 'http://api.giphy.com/v1/gifs/search';

app.findGif = (searchTerm, number, offset) => {
	$.ajax({
		url: app.giphy,
		method: 'GET',
		data: {
			api_key: app.apiKey,
			q: searchTerm,
			offset: offset
		},
		dataType: 'json'
	}).then( (res) => {
		// console.log(app.searchWords[i].word);
		app.displayGif(res.data[number].images.downsized.url);
	});
};

app.displayGif = (gif) => {
	const theGif = $('<img>').attr('src', gif);
	$('main').append(theGif);
};

app.searchWords = [
	[
		{
			word: "happy"
		},
		{
			word: "thumbs up"
		},
		{
			word: "funny"
		},
		{
			word: "joy"
		},
		{
			word: "excited"
		},
		{
			word: "lol"
		},
		{
			word: "smile"
		},
		{
			word: "cute"
		},
		{
			word: "yay"
		},
		{
			word: "lmfao"
		}
	],
	[
		{
			word: 'high'
		}
	],
	[
		{
			word: 'sad'
		}
	]
];

// app.randomNumber = () => {
// 	let random = Math.floor(Math.random() * 7);
// };

app.init = () => app.inputData;

$(document).ready(app.init());