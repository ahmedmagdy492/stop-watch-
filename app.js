let allCounters = document.querySelectorAll('span');
let allQuots = document.querySelectorAll('q');
let startBtn = document.querySelector('.btn-start');
let lapBtn = document.querySelector('.btn-lap');
let lapCounterEle = document.querySelector('.lap-counter');
let lapContainer = document.querySelector('.laps');
let workMode = false;
let paused = false;
var stopWatchId = null;
var lapId = null;
let lapElementsCount = 0;

const stopWatchCounter = () => {
	let stopWatchId = setInterval(()=>{
		/// mili seconds
		if(parseInt(allCounters[2].innerText) <= 59)
		{
			allCounters[2].innerText = parseInt(allCounters[2].innerText) + 1;
			if(parseInt(allCounters[2].innerText) >= 10)
			{
				allQuots[2].innerText = "";
			}
			else{
				allQuots[2].innerText = "0";
			}
		}
		else{
			allCounters[2].innerText = "00";
			///mins
			if(parseInt(allCounters[1].innerText) <= 59)
			{
				allCounters[1].innerText = parseInt(allCounters[1].innerText) + 1;
				if(parseInt(allCounters[0].innerText) >= 10)
				{
					allQuots[0].innerText = "";
				}
				else{
					allQuots[0].innerText = "0";
				}
			}
			else{
				allCounters[1].innerText = "00";
				allCounters[0].innerText = parseInt(allCounters[0].innerText) + 1;
				if(parseInt(allCounters[0].innerText) >= 10)
				{
					allQuots[0].innerText = "";
				}
				else{
					allQuots[0].innerText = "0";
				}
			}
			if(parseInt(allCounters[1].innerText) >= 10)
			{
				allQuots[1].innerText = "";
			}
			else{
				allQuots[1].innerText = "0";
			}
		}
	},10);
	return stopWatchId;
}

const lapCounter = () => {
	const lapCounterId = setInterval( ()=>{
	/// mili seconds
		if(parseInt(allCounters[5].innerText) <= 59)
		{
			allCounters[5].innerText = parseInt(allCounters[5].innerText) + 1;
			if(parseInt(allCounters[5].innerText) >= 10)
			{
				allQuots[5].innerText = "";
			}
			else{
				allQuots[5].innerText = "0";
			}
		}
		else{
			allCounters[5].innerText = "0";
			///mins
			if(parseInt(allCounters[4].innerText) <= 59)
			{
				allCounters[4].innerText = parseInt(allCounters[4].innerText) + 1;
				if(parseInt(allCounters[3].innerText) >= 10)
				{
					allQuots[3].innerText = "";
				}
				else{
					allQuots[3].innerText = "0";
				}
			}
			else{
				allCounters[4].innerText = "0";
				allCounters[3].innerText = parseInt(allCounters[3].innerText) + 1;
				if(parseInt(allCounters[3].innerText) >= 10)
				{
					allQuots[3].innerText = "";
				}
				else{
					allQuots[3].innerText = "0";
				}
			}
			if(parseInt(allCounters[4].innerText) >= 10)
			{
				allQuots[4].innerText = "";
			}
			else{
				allQuots[4].innerText = "0";
			}
		}
	},10);
	return lapCounterId;
}

const StartAll = () => {
	
	if(!workMode)
	{
		/// setting the text of the reset button back to lap
		lapBtn.innerText = "Lap";
		/// set working mode to be on
		workMode = true;
		//paused = false;
		/// changing the start btn text
		startBtn.innerText = "Stop";
		/// stopwatch counter starts
		stopWatchId = stopWatchCounter();
		/// lap counter starts
		lapId = lapCounter();
	}
	else
	{
		workMode = false;
		///change the text of lap button to reset
		lapBtn.innerText = "Reset";
		/// change the text of the start button to resume
		startBtn.innerText = "Resume";
		/// stop both counters

		clearInterval(stopWatchId);
		clearInterval(lapId);
	}
}

const ResetOrLap = () => {
	if(!workMode)
	{
		location.reload();
	}
	else{
		/// stop the lap counter
		clearInterval(lapId);
		/// getting the current lap value
		let lapCounterValue = lapCounterEle.innerText;
		/// setting the values of the counter to 0
		for(let i = 3; i < allCounters.length; i++)
		{
			allCounters[i].innerText = "0";
		}
		/// start a new lap counter
		lapId = lapCounter();
		/// create new lap item and append to the lap container
		CreateNewElement(lapCounterValue);
	}
}

const CreateNewElement = (lapValue)=>{
	lapElementsCount++;
	let parent = document.createElement('div');
	parent.style.display = "flex";
	parent.style.justifyContent = "space-between";
	lapContainer.appendChild(parent);
	let lsideEle = document.createElement('div');
	let lsideEleTxt = document.createTextNode("Lap"+lapElementsCount);
	lsideEle.appendChild(lsideEleTxt);
	parent.appendChild(lsideEle);
	let rsideEle = document.createElement('div');
	let rsideTxt = document.createTextNode(lapValue);
	rsideEle.appendChild(rsideTxt);
	parent.appendChild(rsideEle);
}