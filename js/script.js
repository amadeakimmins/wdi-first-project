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
let totalSecondsTaken = 0;

function setup() {

  const $instructionPage = $('.instructionPage');
  const $levelOnePage = $('.levelOnePage');
  const $levelTwoPage = $('.levelTwoPage');
  const $levelThreePage = $('.levelThreePage');
  const $levelFourPage = $('.levelFourPage');
  const $tryAgainPage = $('.tryAgainPage');
  const $playerPassedLevelOnePage = $('.playerPassedLevelOne');
  const $playerPassedLevelTwoPage = $('.playerPassedLevelTwo');
  const $playerPassedLevelThreePage = $('.playerPassedLevelThree');
  const $playerPassedLevelFourPage = $('.playerPassedLevelFour');
  const $beginButton = $('.beginButton');
  const $displayTimerOnScreen = $('.timerDisplay');
  const $startAgainButton = $('.startAgainButton');
  const $displayColor = $('.colorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  const $levelFourColorButtons = $('.levelFourButtons');
  let $rounds = $('.gameRounds li');
  const $finalScoreTime = $('.finalScoreTime');
  const $overallScoreTime = $('.overallScoreTime');
  const $playLevelTwoButton = $('.playLevelTwoButton');
  const $playLevelThreeButton = $('.playLevelThreeButton');
  const $playLevelFourButton = $('.playLevelFourButton');
  const $homepage = $('.homepage');

  function beginLevelOne(){
    startTime = new Date().getTime();
    $instructionPage.hide();
    $levelOnePage.show();
    startTimer();
    colorRandomlySelected();
  }

  function startTimer(){
    timeRemaining = timeGiven;
    $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);
    timerId = setInterval(() => {
      // console.log('clock ticking');
      timeRemaining--;
      $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        $levelOnePage.hide();
        $levelTwoPage.hide();
        $levelThreePage.hide();
        $levelFourPage.hide();
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
    $playerPassedLevelFourPage.hide();
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

  // LEVEL 3 AND 4 CHANGE BACKGROUND COLOR
  function generateRandomBackgroundColor(){
    const backGroundColor = backgroundColors[Math.floor(Math.random()*colors.length)];
    // console.log(backGroundColor);
    $levelThreePage.css('background-color', backGroundColor);
    $levelFourPage.css('background-color', backGroundColor);
  }

  function shuffle(colors) {
    let currentIndex = colors.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = colors[currentIndex];
      colors[currentIndex] = colors[randomIndex];
      colors[randomIndex] = temporaryValue;
    }
    $levelFourColorButtons.each((i, button)=>{
      $(button).text(colors[i]);
    });
  }

  function completedRound(){
    $rounds.eq(round).css('backgroundColor', 'rgba(0,0,0,1)');
    console.log($rounds.eq(round).css('backgroundColor'));
    round++;
    if (round >= 8){
      // console.log('in here','level:',level);
      clearInterval(timerId);
      secondsTaken = (((new Date().getTime() - startTime)/1000).toFixed(1));
      $finalScoreTime.html(`${'You finished the level in:'}` + ' ' + secondsTaken + ' ' + 'secs');
      totalSecondsTaken = totalSecondsTaken + parseFloat(secondsTaken);
      // console.log(totalSecondsTaken);
      $overallScoreTime.html(`${'You finished the game in:'}` + ' ' + totalSecondsTaken + ' ' + 'secs');
      // console.log('timer stopped because end of round');
      if(level <= 1){
        $levelOnePage.hide();
        $playerPassedLevelOnePage.show();
      }else if (level <= 2){
        $levelTwoPage.hide();
        $playerPassedLevelTwoPage.show();
      } else if (level <= 3){
        $levelThreePage.hide();
        $playerPassedLevelThreePage.show();
      } else {
        $levelFourPage.hide();
        $playerPassedLevelFourPage.show();
      }
      level++;
    } else {
      timeGiven--;
      secondsTaken = 0;
      resetTimer();
      // console.log('start timer again because not end of round yet');
      colorRandomlySelected();
      generateRandomBackgroundColor();
      shuffle(colors);
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
      $levelFourPage.hide();
      $tryAgainPage.show();
      timeGiven = 8;
    }
  }

  function beginLevelTwo (){
    startTime = new Date().getTime();
    timeGiven = 8;
    round = 0;
    $rounds = $('.gameRounds li.levelTwo');
    // console.log($rounds);
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelOnePage.hide();
    $levelTwoPage.show();
    resetTimer();
    colorRandomlySelected();
  }

  function beginLevelThree() {
    startTime = new Date().getTime();
    timeGiven = 9;
    round = 0;
    $rounds = $('.gameRounds li.levelThree');
    // console.log($rounds);
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelTwoPage.hide();
    $levelThreePage.show();
    resetTimer();
    colorRandomlySelected();
    generateRandomBackgroundColor();
  }

  function beginLevelFour() {
    startTime = new Date().getTime();
    timeGiven = 9;
    round = 0;
    $rounds = $('.gameRounds li.levelFour');
    // console.log($rounds);
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelThreePage.hide();
    $levelFourPage.show();
    resetTimer();
    colorRandomlySelected();
    generateRandomBackgroundColor();
    shuffle(colors);
  }

  function homepage() {
    timeGiven = 8;
    level = 1;
    round = 0;
    $rounds = $('.gameRounds li');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $tryAgainPage.hide();
    $playerPassedLevelOnePage.hide();
    $playerPassedLevelTwoPage.hide();
    $playerPassedLevelThreePage.hide();
    $playerPassedLevelFourPage.hide();
    $instructionPage.show();
    clearInterval(timerId);
  }

  // BUTTON EVENTS
  $beginButton.on('click', beginLevelOne);
  $colorButtons.on('click', checkForMatch);
  $startAgainButton.on('click', startAgain);
  $playLevelTwoButton.on('click', beginLevelTwo);
  $playLevelThreeButton.on('click', beginLevelThree);
  $playLevelFourButton.on('click', beginLevelFour);
  $homepage.on('click', homepage);
}

$(setup);
