var chatLines = new Array();
var sessionId = 0;
var userLabel = "TÚ";

function toggleVisibility(id) {
	var element = document.getElementById(id);
	if (element.style.display == "none") {
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
}

function chat() {
	var form = document.forms.chatForm;
	var userInput = form.chatInput.value;
	if (userInput != '') {
		var userLine = userLabel + ":" + "          ".slice(-(7-userLabel.length)) + userInput;
		var outputbot=bot.transform(userInput);
		var botLine =  botName + ":" + "          ".slice(-(7-botName.length)) + outputbot;
		form.chatInput.value = '';
		chatLines.push(userLine);
		displayLines();
		chatLines.push(botLine);
		logText(sessionId,userLine + "||" + botLine); 

		// linea tunning
	
		habla(outputbot); //
		document.getElementById('textPelotita').value = outputbot;



		window.setTimeout(displayLines, 1000); 
	} else if (chatLines.length == 0) {
		var botLine = botName + ":" + "          ".slice(-(7-botName.length)) + bot.getInitial();
		chatLines.push(botLine);
		displayLines();
	}
}

function displayLines() {
	var chatText = document.getElementById('chatText');
	chatText.value = chatLines.join('\n');
	chatText.scrollTop = chatText.scrollHeight;
}

function generateSessionId() {
	return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

function reset() {
	sessionId = generateSessionId();
	bot.reset();
	chatLines.length = 0;
	document.forms.chatForm.chatInput.value = '';
	document.forms.chatForm.chatInput.focus();
	chat();
}

function eventWindowLoaded () {
	reset();
}

window.addEventListener("load", eventWindowLoaded, false);