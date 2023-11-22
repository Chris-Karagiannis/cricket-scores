window.fetch("https://api.cricapi.com/v1/currentMatches?apikey=8e901ae6-e77d-4689-ae88-d64df8024fe3&offset=0")
	.then(result => result.json())
	.then(result => {
		console.log("We have the result",result);
        matches = result;
        listMatches();
	})
	.catch(err => {
		console.log("An error occured. Please check your code",err);
	});

let matches = {};

function listMatches(){
    for (let i = 0; i < matches.data.length; i++) {
        h1(matches.data[i].name);
        console.log(matches.data[i].id)
    }
}

function h1(text) {
    var h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(text));
    document.body.appendChild(h1);
}


