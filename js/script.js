console.log('Ready!');
let timeGiven = 8;
let timeRemaining = timeGiven;
let timerRunning = false;
let timerId = null;
let colorOfText = null;
const colors = ['yellow', 'red', 'blue', 'green', 'purple', 'orange'];
const backgroundColors = ['gold', 'crimson', 'lightskyblue', 'limegreen', 'darkorchid', 'darkorange'];
let round = 0;
let level = 1;
let startTime = null;
let secondsTaken = null;

function setup() {

  const $instructionPage = $('.instructionPage');
  const $levelOnePage = $('.levelOnePage');
  const $levelTwoPage = $('.levelTwoPage');
  const $levelThreePage = $('.levelThreePage');
  const $tryAgainPage = $('.tryAgainPage');
  const $playerPassedLevelOnePage = $('.playerPassedLevelOne');
  const $playerPassedLevelTwoPage = $('.playerPassedLevelTwo');
  const $playerPassedLevelThreePage = $('.playerPassedLevelThree');
  const $beginButton = $('.beginButton');
  const $displayTimerOnScreen = $('.timerDisplay');
  const $startAgainButton = $('.startAgainButton');
  const $displayColor = $('.colorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  let $rounds = $('.gameRounds li');
  const $finalScoreTime = $('.finalScoreTime');
  const $playLevelTwoButton = $('.playLevelTwoButton');
  const $playLevelThreeButton = $('.playLevelThreeButton');
  const $homepage = $('.homepage');


  function beginLevelOne(){
    $instructionPage.hide();
    $levelOnePage.show();
    startTimer();
    colorRandomlySelected();
  }

  function startTimer(){
    timeRemaining = timeGiven;
    $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);
    timerId = setInterval(() => {
      console.log('clock ticking');
      startTime = new Date().getTime();
      timeRemaining--;
      $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        $levelOnePage.hide();
        $levelTwoPage.hide();
        $levelThreePage.hide();
        $tryAgainPage.show();
        timeGiven = 8;
      }
      timerRunning = true;
    }, 1000);
  }

  function startAgain (){
    round = 0;
    level = 1;
    $rounds = $('.gameRounds li');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $tryAgainPage.hide();
    $playerPassedLevelOnePage.hide();
    $playerPassedLevelTwoPage.hide();
    $playerPassedLevelThreePage.hide();
    $levelOnePage.show();
    resetTimer();
    colorRandomlySelected();
  }

  function resetTimer(){
    clearInterval(timerId);
    timerRunning = false;
    startTimer();
  }

  function generateRandomColor() {
    return colors[Math.floor(Math.random()*colors.length)];
  }

  function colorRandomlySelected(){
    const chosenWord = generateRandomColor();
    colorOfText = generateRandomColor();
    $displayColor.text(chosenWord).css('color', colorOfText);
  }

  // LEVEL THREE CHANGE BACKGROUND COLOR
  function generateRandomBackgroundColor(){
    const backGroundColor = backgroundColors[Math.floor(Math.random()*colors.length)];
    console.log(backGroundColor);
    $levelThreePage.css('background-color', backGroundColor);
  }


  function completedRound(){
    $rounds.eq(round).css('backgroundColor', 'rgba(0,0,0,1)');
    console.log($rounds.eq(round).css('backgroundColor'));
    round++;
    if (round >= 8){
      console.log('in here','level:',level);
      clearInterval(timerId);
      secondsTaken = (((new Date().getTime() - startTime)/1000).toFixed(1));
      $finalScoreTime.html(`${'You finished the level in:'}` + ' ' + secondsTaken + ' ' + 'secs');
      // console.log('timer stopped because end of round');
      if(level <= 1){
        $levelOnePage.hide();
        $playerPassedLevelOnePage.show();
      }else if (level <= 2){
        $levelTwoPage.hide();
        $playerPassedLevelTwoPage.show();
      } else {
        $levelThreePage.hide();
        $playerPassedLevelThreePage.show();
      }
      level++;
    } else {
      timeGiven--;
      secondsTaken = 0;
      resetTimer();
      // console.log('start timer again because not end of round yet');
      colorRandomlySelected();
      generateRandomBackgroundColor();
    }
  }

  function checkForMatch(e){
    // console.log(timeGiven, timeRemaining);
    if(colorOfText === $(e.target).text()){
      completedRound();
    }else if(colorOfText !== $(e.target).text()){
      clearInterval(timerId);
      $levelOnePage.hide();
      $levelTwoPage.hide();
      $levelThreePage.hide();
      $tryAgainPage.show();
      timeGiven = 8;
    }
  }

  function beginLevelTwo (){
    timeGiven = 8;
    round = 0;
    $rounds = $('.gameRounds li.levelTwo');
    console.log($rounds);
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelOnePage.hide();
    $levelTwoPage.show();
    resetTimer();
    colorRandomlySelected();
  }

  function beginLevelThree() {
    timeGiven = 8;
    round = 0;
    $rounds = $('.gameRounds li.levelThree');
    console.log($rounds);
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelTwoPage.hide();
    $levelThreePage.show();
    resetTimer();
    colorRandomlySelected();
    generateRandomBackgroundColor();
  }

  function homepage() {
    timeGiven = 8;
    round = 0;
    $rounds = $('.gameRounds li');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $tryAgainPage.hide();
    $playerPassedLevelOnePage.hide();
    $playerPassedLevelTwoPage.hide();
    $playerPassedLevelThreePage.hide();
    $instructionPage.show();
    clearInterval(timerId);
  }



  // BUTTON EVENTS
  $beginButton.on('click', beginLevelOne);

  $colorButtons.on('click', checkForMatch);

  $startAgainButton.on('click', startAgain);

  $playLevelTwoButton.on('click', beginLevelTwo);

  $playLevelThreeButton.on('click', beginLevelThree);

  $homepage.on('click', homepage);

}

$(setup);

//TOMORROW - ADD LEVEL 3 CHANGING BACKGROUND AND LEVEL 4 RANDOMISE COLORS AND THEN REFACTOR CODE

// TO RANDOMLY CHANGE THE CONTENT OF COLOR BUTTONS for LEVEL 3:
//
// function randomlySelectedColorOptions() {
//   const randomColorButtons = $colorButtons.get();
//   randomColorButtons = randomColorButtons.sort(function() {
//     return Math.round( Math.random()*colorButtons.length);
//     randomColorButtons.forEach(i); {

//     }
//   })
//
//   const
//   var ul = document.querySelector('ul');
//   for (var i = ul.children.length; i >= 0; i--) {
//       ul.appendChild(ul.children[Math.random() * i | 0]);
//   }

//
//   const $colours = $($colourButtons).map(function(){
//         return $(this).text(displayColour);
