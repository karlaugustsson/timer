window.addEventListener("load" , function(){
	var minutesOutput = document.getElementsByClassName("output minutes")[0];
	var secondsOutput = document.getElementsByClassName("output seconds")[0];
	var hoursOutput = document.getElementsByClassName("output hours")[0];
	var startResetButton = document.getElementsByClassName("start timer")[0];
	var increaseMinutesButton = document.getElementsByClassName("set hours")[0];
	var increaseHoursButton = document.getElementsByClassName("set minutes")[0];
	var increaseSecondsButton = document.getElementsByClassName("set seconds")[0];
	var changeStartbuttonText = function(textPlease){
		setInnerHtmlOfElement(textPlease,startResetButton);
	}
	var maxMinutes = 59;
	var maxSeconds = 59;
	var maxHours = 23;
	var addZeroBeforeIfLessThanTen = function(value){
		if(value < 10){
			return "0" + value;
		}
		return value;
	}
	function resetSecondsIfMax(value){

		if(value > maxSeconds){
			setSecondsValue(0);
		}
	}
	function resetHoursIfMax(value){

		if(value > maxHours){
			setHoursValue(0);
		}
	}
	function resetMinutesIfMax(value){

		if(value > maxMinutes){
			setMinutesValue(0);
		}
	}
	function removeClassFromElement(classN,element){
		element.classList.remove(classN);
	}
	function addClassToElement(classN,element){
		element.classList.add(classN);
	}
	function makeElementBlink(el){
		addClassToElement("blink_me",el)
	}
	function removeBlink(){
		var blinkingElements = document.getElementsByClassName("blink_me");
		var elLength = blinkingElements.length;

		for (var i = 0; i < elLength; i++) {
			console.log(blinkingElements);
			removeClassFromElement("blink_me",blinkingElements[0]);
		};
	}
	function getMinutesValue(){
		return minutesOutput.innerHTML;
	}
	function getSecondsValue(){
		return secondsOutput.innerHTML;
	}
	function setInnerHtmlOfElement(body,el){
		el.innerHTML = body;
	}
	function getHoursValue(){
		return hoursOutput.innerHTML;
	}
	function setMinutesValue(value){
		value = addZeroBeforeIfLessThanTen(value);
		minutesOutput.innerHTML =  value;
	}
	function setSecondsValue(value){
		value = addZeroBeforeIfLessThanTen(value);
		secondsOutput.innerHTML =  value;
	}
	function setHoursValue(value){
		value = addZeroBeforeIfLessThanTen(value);
		hoursOutput.innerHTML = value;
	}
	function startTimer(){
		disableButtons();
		changeStartbuttonText("stop");
		removeBlink();
		addClassToElement("active",startResetButton);
	}
	function enableButtons(){
		enableInput(increaseMinutesButton);
		enableInput(increaseSecondsButton);
		enableInput(increaseHoursButton);		
	}
	function disableButtons(){
		disableInput(increaseMinutesButton);
		disableInput(increaseSecondsButton);
		disableInput(increaseHoursButton);
	}
	function disableInput(inputElement){
		inputElement.disabled = true;
	}
	function enableInput(inputElement){
		inputElement.disabled = false;
	}
	function resetTimerValues(){
		setHoursValue(0);
		setMinutesValue(0);
		setSecondsValue(0);
	}
	function resetTimer(){

		setTimeout(function(){
			enableButtons();
			resetTimerValues();
			removeClassFromElement("active",startResetButton);
			changeStartbuttonText("Start");
			var audio = new Audio('http://mp3-pesni.com/music/c520d6deb7863ada93f235747b10934c.mp3');
			audio.play();

		},1000);
		setHoursValue(88);
		setMinutesValue(88);
		setSecondsValue(88);
		
		
	}
	resetTimer();	
},false);