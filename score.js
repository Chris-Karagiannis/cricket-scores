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

	// Team 1
	createElement('h2', matchInfo.data.teams[0] + ": " + matchInfo.data.score[0].w + "/" + matchInfo.data.score[0].r + " (" + matchInfo.data.score[0].o + " overs)")

	// Team 2
	createElement('h2', matchInfo.data.teams[1] + ": " + matchInfo.data.score[1].w + "/" + matchInfo.data.score[1].r + " (" + matchInfo.data.score[1].o + " overs)")
}

function createElement(type,text) {
    let elem = document.createElement(type);
    elem.appendChild(document.createTextNode(text));
    document.body.appendChild(elem);
}


