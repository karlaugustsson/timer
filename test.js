window.addEventListener("load" , function(){
	var minutesOutput = document.getElementsByClassName("output minutes")[0];
	var secondsOutput = document.getElementsByClassName("output seconds")[0];
	var hoursOutput = document.getElementsByClassName("output hours")[0];
	var display = document.getElementsByClassName("display")[0];
	var counterInterval = null;
	var alarmInterval = null;
	var maxMinutes = 59;
	var maxSeconds = 59;
	var maxHours = 23;
	var audio = null;

	var startResetButton = document.getElementsByClassName("start timer")[0];
		startResetButton.addEventListener("click",startOrStopCountDown,false)
	var increaseMinutesButton = document.getElementsByClassName("set minutes")[0];
		increaseMinutesButton.addEventListener("click",addOneMinute,false);
	var increaseHoursButton = document.getElementsByClassName("set hours")[0];
		increaseHoursButton.addEventListener("click",addOneHour,false)
	var increaseSecondsButton = document.getElementsByClassName("set seconds")[0];
		increaseSecondsButton.addEventListener("click",addOneSecond,false);

	var changeStartbuttonText = function(textPlease){
		setInnerHtmlOfElement(textPlease,startResetButton);
	}

	function addZeroBeforeIfLessThanTen(value){
		if(value < 10){
			return "0" + value;
		}
		return value;
	};
	function startOrStopCountDown(){
		if(! startResetButton.classList.contains("active")){
			startTimer();
		}else{
			stopTimer();
		}
		
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

		if( element != undefined && element.classList.contains(classN)){
			element.classList.remove(classN);
		}
		
	}
	function addClassToElement(classN,element){
		if(element != undefined && !element.classList.contains(classN)){
			element.classList.add(classN);
		}
		
	}
	function makeElementBlink(el){
		addClassToElement("blink_me",el);
		setTimeout(function(){removeClassFromElement("blink_me",el);},30000);
	}
	function removeBlink(){
		var blinkingElements = document.getElementsByClassName("blink_me");
		var elLength = blinkingElements.length;

		for (var i = 0; i < elLength; i++) {
			removeClassFromElement("blink_me",blinkingElements[0]);
		};
	}
	function getMinutesValue(){
		return parseInt(minutesOutput.innerHTML);
	}
	function getSecondsValue(){
		return parseInt(secondsOutput.innerHTML);
	}
	function setInnerHtmlOfElement(body,el){
		el.innerHTML = body;
	}
	function getHoursValue(){
		return parseInt(hoursOutput.innerHTML);
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
		counterInterval = setInterval(decreaseSecondValue,200);
		
	}
	function decreaseSecondValue(){

		var secondsValue = getSecondsValue() -1;
		var hourValue = getHoursValue();
		var minuteValue = getMinutesValue();

		if(secondsValue < 0){
			if(minuteValue -1 >= 0){
				setMinutesValue(minuteValue -1);
				setSecondsValue(59);
			}
			else if( minuteValue -1 == -1 && hourValue -1 >= 0 ){
				setMinutesValue(59);
				setSecondsValue(59)
				setHoursValue(hourValue -1);
			}


		}else{
			setSecondsValue(secondsValue);
			if(minuteValue == 0 && hourValue == 0 && secondsValue == 0){
				alarm();
			}
		}
	
	}

	function enableButtons(){
		enableInput(increaseMinutesButton);
		enableInput(increaseSecondsButton);
		enableInput(increaseHoursButton);		
	}
	function addOneMinute(){
		removeBlink();
		makeElementBlink(minutesOutput);
		setMinutesValue(getMinutesValue() + 1);
		resetMinutesIfMax(getMinutesValue());
	}
	function addOneSecond(){
		removeBlink();
		makeElementBlink(secondsOutput);
		setSecondsValue(getSecondsValue() + 1);
		resetSecondsIfMax(getSecondsValue());
	}
	function addOneHour(){
		removeBlink();
		makeElementBlink(hoursOutput);
		setHoursValue(getHoursValue() + 1);
		resetHoursIfMax(getHoursValue());
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
	function playThatFrogSong(){
		audio = new Audio('frog.mp3');
		audio.play();		
	}
	function alarm(){

		setTimeout(function(){
			resetTimer();
		},120000);

		alarmInterval = setInterval(function(){
			makeElementBlink(secondsOutput);
			makeElementBlink(minutesOutput);
			makeElementBlink(hoursOutput);
			playThatFrogSong();
		},30000);
		makeElementBlink(secondsOutput);
		makeElementBlink(minutesOutput);
		makeElementBlink(hoursOutput);
		playThatFrogSong();
		addClassToElement("active",display);
	}
	function stopAlarm(){
		removeClassFromElement("active",display);
		removeBlink();
		audio.pause();
		clearInterval(alarmInterval);
	}
	function pauseCounter(){
		clearInterval(counterInterval);
	}
	function resetTimer(){

		setTimeout(function(){
			enableButtons();
			resetTimerValues();
			removeClassFromElement("active",startResetButton);
			stopAlarm();

			changeStartbuttonText("Start");

		},1000);
		pauseCounter();
		setHoursValue(88);
		setMinutesValue(88);
		setSecondsValue(88);
		
		
	}
	function stopTimer(){
		enableButtons();
		removeClassFromElement("active",startResetButton);
		changeStartbuttonText("Start");

		pauseCounter();
		stopAlarm();

	}	
},false);