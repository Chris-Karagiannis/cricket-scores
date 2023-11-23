let matches = {};

window.fetch("https://api.cricapi.com/v1/currentMatches?apikey=8e901ae6-e77d-4689-ae88-d64df8024fe3&offset=0")
	.then(result => result.json())
	.then(result => {
		console.log("We have the result",result);
        matches = result;
        listMatches();
        addClick();
	})
	.catch(err => {
		console.log("An error occured. Please check your code",err);
	});

function listMatches(){
    for (let i = 0; i < matches.data.length; i++) {
        a(matches.data[i].name,matches.data[i].id);
    }
}

function a(text, id) {
    let a = document.createElement('a');
    a.appendChild(document.createTextNode(text));
    document.body.appendChild(a);
    a.setAttribute("href","score.html");
    a.setAttribute("id",id);
    br = document.createElement('br');
    a.appendChild(br);
}

function setId(v){
    sessionStorage.setItem("id",v);
}

function addClick(){
    let listItems = document.querySelectorAll("a");
    for (let i = 0; i < listItems.length; i++) {
        console.log(listItems[i].id);
        listItems[i].addEventListener("click", function(e) {
            setId(e.target.id);
        });
    }
}

