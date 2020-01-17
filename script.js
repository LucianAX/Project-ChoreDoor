let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";

let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';

let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';

let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let startButton = document.getElementById('start');

let currentlyPlaying = true;

// let current_streak = document.getElementById('current-streak'); // = 0
// let best_streak = document.getElementById('best-streak'); // = 0
let current_streak = 0;
let best_streak = 0;

let isBot = (door) => {
  if(door.src === botDoorPath)
    	return true;
  else
    	return false;
}

function isClicked(door) {
  if(door.src === closedDoorPath)
    	{
        return false;
      }
  else
    		return true;
}

function playDoor(door) {
  numClosedDoors--;

  if(numClosedDoors === 0)
    	{
        gameOver('win');
      }
  else if(isBot(door) === true)
    				gameOver();
}

let randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor( Math.random() * numClosedDoors );

    if(choreDoor === 0)
        {
          openDoor1 = botDoorPath;

          openDoor2 = beachDoorPath;
          openDoor3 = spaceDoorPath;
        }

    else if(choreDoor === 1)
        {
          openDoor2 = botDoorPath;

          openDoor1 = spaceDoorPath;
          openDoor3 = beachDoorPath;
        }

    else if(choreDoor === 2)
        {
          openDoor3 = botDoorPath;

          openDoor1 = beachDoorPath;
          openDoor2 = spaceDoorPath;
        }

// *** For showing the number of the door where chore bot is hiding
    // let secretKey = document.createElement('div');
    // secretKey.innerHTML = choreDoor;
    // secretKey.style.color = 'white';
    // document.body.appendChild(secretKey);
}


doorImage1.onclick = () => {
  // doorImage1.src = botDoorPath;

  if(isClicked(doorImage1) === false && currentlyPlaying)
      {
				doorImage1.src = openDoor1;
  			playDoor(doorImage1);
      }
}

doorImage2.onclick = () => {
  // doorImage2.src = beachDoorPath;

  if(isClicked(doorImage2) === false && currentlyPlaying)
    	{
        doorImage2.src = openDoor2;
  			playDoor(doorImage2);
      }
}

doorImage3.onclick = () => {
  // doorImage3.src = spaceDoorPath;

  if(isClicked(doorImage3) === false && currentlyPlaying)
      {
				doorImage3.src = openDoor3;
  			playDoor(doorImage3);
      }
}


startButton.onclick = () => {
    if( !currentlyPlaying)
  		{
      	startRound();
			}
}


let startRound = () => {
		doorImage1.src = closedDoorPath;
  	doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;

  	numClosedDoors = 3;
  	startButton.innerHTML = "Good luck!";
  	currentlyPlaying = true;

  	randomChoreDoorGenerator();
}


function gameOver(status) {
  if(status === 'win')
    	{
        startButton.innerHTML = "You win! Play again?";

        current_streak++;

        if(current_streak > best_streak)
            {
              best_streak = current_streak;
            }
      }
  else
    {
      	startButton.innerHTML = "Game over! Play again?";
        current_streak = 0;
    }


  document.getElementById('current-streak').innerHTML = current_streak.toString();
  document.getElementById('best-streak').innerHTML = best_streak.toString();
  currentlyPlaying = false;
}

// randomChoreDoorGenerator();
startRound();
