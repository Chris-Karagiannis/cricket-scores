let matchInfo = {};

window.fetch("https://api.cricapi.com/v1/match_info?apikey=8e901ae6-e77d-4689-ae88-d64df8024fe3&offset=0&id=" + sessionStorage.getItem("id"))
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
		const team = matchInfo.data.score[i].inning.slice(0,-9);
		createElement('h3', team + " " + matchInfo.data.score[i].w + "/" + matchInfo.data.score[i].r + " (" + matchInfo.data.score[i].o + " overs)")
	}
	
	// Status
	createElement('p', matchInfo.data.status);
}

function createElement(type,text) {
    let elem = document.createElement(type);
    elem.appendChild(document.createTextNode(text));
    document.body.appendChild(elem);
}


