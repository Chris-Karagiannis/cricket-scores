const key = document.getElementById("key");
const enter = document.getElementById("enter");

function checkApiKey() {
    sessionStorage.setItem("key",key.value);
    console.log(sessionStorage.getItem("key"));

    window.fetch(`https://api.cricapi.com/v1/cricScore?apikey=${key.value}`)
	.then(result => result.json())
	.then(result => {
		console.log("We have the result",result);
        window.location.href = "matches.html"
	})
	.catch(err => {
		console.log("An error occured. Please check your code",err);
	});
}