let matchInfo = {};
const key = sessionStorage.getItem("key");

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


function createScore(){
	// Heading
	createElement('h1', matchInfo.data.name);
	
	// Venue
	createElement('h2', matchInfo.data.venue);

	// Toss winner
	createElement('p', matchInfo.data.tossWinner + " won the toss and chose to " + matchInfo.data.tossChoice);

	// Info
	for (let i = 0; i < matchInfo.data.score.length ; i++) {
		const n = ordinal_suffix_of(matchInfo.data.score[i].inning.substring(matchInfo.data.score[i].inning.length - 1));
		const team = matchInfo.data.score[i].inning.slice(0,-9);
		const innings = n + " Innings";

		if(matchInfo.data.matchType === "test"){
			if(i === 0 || i === 2){
				createElement('h3', innings);
			}
		}

		createElement('h4', team + " " + matchInfo.data.score[i].w + "/" + matchInfo.data.score[i].r + " (" + matchInfo.data.score[i].o + " overs)")
	}
	
	// Status
	createElement('p', matchInfo.data.status);
}

function createElement(type,text) {
    let elem = document.createElement(type);
    elem.appendChild(document.createTextNode(text));
    document.body.appendChild(elem);
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

