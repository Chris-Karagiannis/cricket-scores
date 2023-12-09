let matchInfo = {};
const key = sessionStorage.getItem("key");

let matchHeading = "";
let matchLocation = "";
let tossInfo = "";
let matchStatus = "";
let matchInnings = [];
let matchScore = [];

function getData(){
	window.fetch(`https://api.cricapi.com/v1/match_info?apikey=${key}&offset=0&id=` + sessionStorage.getItem("id"))
		.then(result => result.json())
		.then(result => {
			console.log("We have the result",result);
			matchInfo = result;
			createScore();
		})
		.catch(err => {
			console.log("An error occured. Please check your code",err);
		});	
}

getData()

function createScore(){
	// Heading
	matchHeading = createElement('h1', matchInfo.data.name);
	
	// Venue
	matchLocation = createElement('h2', matchInfo.data.venue);

	// Toss winner
	tossInfo = createElement('p', matchInfo.data.tossWinner + " won the toss and chose to " + matchInfo.data.tossChoice);

	// Info
	for (let i = 0; i < matchInfo.data.score.length ; i++) {
		const n = ordinal_suffix_of(matchInfo.data.score[i].inning.substring(matchInfo.data.score[i].inning.length - 1));
		const team = matchInfo.data.score[i].inning.slice(0,-9);
		const innings = n + " Innings";

		if(matchInfo.data.matchType === "test"){
			if(i === 0 || i === 2){
				matchInnings[i] = createElement('h3', innings);
			}
		}

		matchScore[i] = createElement('h4', team + " " + matchInfo.data.score[i].w + "/" + matchInfo.data.score[i].r + " (" + matchInfo.data.score[i].o + " overs)")
	}
	
	// Status
	matchStatus = createElement('p', matchInfo.data.status);
}

function updateScore(){
	// Info
	for (let i = 0; i < matchInfo.data.score.length ; i++) {
		const n = ordinal_suffix_of(matchInfo.data.score[i].inning.substring(matchInfo.data.score[i].inning.length - 1));
		const team = matchInfo.data.score[i].inning.slice(0,-9);
		const innings = n + " Innings";
	
		if(matchInfo.data.matchType === "test"){
			if(i === 0 || i === 2){
				matchInnings[i].innerHTML = innings;
			}
		}
	
		matchScore[i].innerHTML = team + " " + matchInfo.data.score[i].w + "/" + matchInfo.data.score[i].r + " (" + matchInfo.data.score[i].o + " overs)";
	}
	console.log("Refresh")
}

function createElement(type,text) {
    let elem = document.createElement(type);
    elem.appendChild(document.createTextNode(text));
    document.body.appendChild(elem);
	return elem
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

