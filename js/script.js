console.log('Ready!');
let timeGiven = 10;
let timeRemaining = timeGiven;
let timerRunning = false;
let timerId = null;
let colorOfText = null;
let colorOfTextLevelFive = null;
const colors = ['yellow', 'red', 'blue', 'green', 'purple', 'orange'];
const colorsLevelFive = ['yellow', 'red', 'blue', 'green', 'purple', 'orange', 'white', 'black', 'pink', 'brown', 'grey', 'navy'];
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
  const $levelFivePage = $('.levelFivePage');
  const $tryAgainPage = $('.tryAgainPage');
  const $playerPassedLevelOnePage = $('.playerPassedLevelOne');
  const $playerPassedLevelTwoPage = $('.playerPassedLevelTwo');
  const $playerPassedLevelThreePage = $('.playerPassedLevelThree');
  const $playerPassedLevelFourPage = $('.playerPassedLevelFour');
  const $playerPassedLevelFivePage = $('.playerPassedLevelFive');
  const $beginButton = $('.beginButton');
  const $displayTimerOnScreen = $('.timerDisplay');
  const $startAgainButton = $('.startAgainButton');
  const $displayColor = $('.colorWordWithDifferentColor');
  const $displayColorLevelFive = $('.levelFiveColorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  const $levelFourColorButtons = $('.levelFourButtons');
  const $colorButtonsLevelFive = $('.levelFiveButtons');
  let $rounds = $('.gameRounds li');
  const $finalScoreTime = $('.finalScoreTime');
  const $overallScoreTime = $('.overallScoreTime');
  const $playLevelTwoButton = $('.playLevelTwoButton');
  const $playLevelThreeButton = $('.playLevelThreeButton');
  const $playLevelFourButton = $('.playLevelFourButton');
  const $playLevelFiveButton = $('.playLevelFiveButton');
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
      timeRemaining--;
      $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        hidingLevelPages();
        $tryAgainPage.show();
        timeGiven = 10;
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
    hidingPassedLevelPages();
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

  // GENERERATE COLOURS FOR LEVEL 5
  function generateRandomColorLevelFive() {
    return colorsLevelFive[Math.floor(Math.random()*colorsLevelFive.length)];
  }

  function colorRandomlySelectedLevelFive() {
    const chosenWordLevelFive = generateRandomColorLevelFive();
    colorOfTextLevelFive = generateRandomColorLevelFive();
    $displayColorLevelFive.text(chosenWordLevelFive).css('color', colorOfTextLevelFive);
  }

  // LEVEL 3 AND 4 CHANGE BACKGROUND COLOR
  function generateRandomBackgroundColor(){
    const backGroundColor = backgroundColors[Math.floor(Math.random()*colors.length)];
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
    round++;
    if (round >= 8){
      clearInterval(timerId);
      secondsTaken = (((new Date().getTime() - startTime)/1000).toFixed(1));
      $finalScoreTime.html(`${'You finished the level in:'}` + ' ' + secondsTaken + ' ' + 'secs');
      totalSecondsTaken = totalSecondsTaken + parseFloat(secondsTaken);
      $overallScoreTime.html(`${'You finished the game in:'}` + ' ' + totalSecondsTaken + ' ' + 'secs');
      if(level <= 1){
        $levelOnePage.hide();
        $playerPassedLevelOnePage.show();
      } else if (level <= 2){
        $levelTwoPage.hide();
        $playerPassedLevelTwoPage.show();
      } else if (level <= 3){
        $levelThreePage.hide();
        $playerPassedLevelThreePage.show();
      } else if (level <= 4){
        $levelFourPage.hide();
        $playerPassedLevelFourPage.show();
      } else {
        $levelFivePage.hide();
        $playerPassedLevelFivePage.show();
      }
      level++;
    } else {
      timeGiven--;
      secondsTaken = 0;
      resetTimer();
      colorRandomlySelected();
      colorRandomlySelectedLevelFive();
      generateRandomBackgroundColor();
      shuffle(colors);
    }
  }


  function checkForMatch(e){
    if(colorOfText === $(e.target).text()){
      completedRound();
    }else if(colorOfText !== $(e.target).text()){
      clearInterval(timerId);
      hidingLevelPages();
      $tryAgainPage.show();
      timeGiven = 10;
    }
  }

  // CHECK FOR MATCH LEVEL 5
  function checkForMatchLevelFive(e){
    if(colorOfTextLevelFive === $(e.target).text()){
      completedRound();
    }else if(colorOfTextLevelFive !== $(e.target).text()){
      clearInterval(timerId);
      hidingLevelPages();
      $tryAgainPage.show();
      timeGiven = 10;
    }
  }

  function beginLevelTwo (){
    startTime = new Date().getTime();
    timeGiven = 9;
    round = 0;
    $rounds = $('.gameRounds li.levelTwo');
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
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelTwoPage.hide();
    $levelThreePage.show();
    resetTimer();
    colorRandomlySelected();
    generateRandomBackgroundColor();
  }

  function beginLevelFour() {
    startTime = new Date().getTime();
    timeGiven = 10;
    round = 0;
    $rounds = $('.gameRounds li.levelFour');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelThreePage.hide();
    $levelFourPage.show();
    resetTimer();
    colorRandomlySelected();
    generateRandomBackgroundColor();
    shuffle(colors);
  }

  function beginLevelFive() {
    startTime = new Date().getTime();
    timeGiven = 10;
    round = 0;
    $rounds = $('.gameRounds li.levelFive');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelFourPage.hide();
    $levelFivePage.show();
    resetTimer();
    colorRandomlySelectedLevelFive();
  }

  // MAKE LEVEL FIVE WITH LOADS OF BUTTONS X12

  function homepage() {
    timeGiven = 10;
    level = 1;
    round = 0;
    $rounds = $('.gameRounds li');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $tryAgainPage.hide();
    hidingPassedLevelPages();
    $instructionPage.show();
    clearInterval(timerId);
  }

  // HIDING PAGES
  function hidingPassedLevelPages() {
    $playerPassedLevelOnePage.hide();
    $playerPassedLevelTwoPage.hide();
    $playerPassedLevelThreePage.hide();
    $playerPassedLevelFourPage.hide();
    $playerPassedLevelFivePage.hide();
  }

  function hidingLevelPages(){
    $levelOnePage.hide();
    $levelTwoPage.hide();
    $levelThreePage.hide();
    $levelFourPage.hide();
    $levelFivePage.hide();
  }

  // BUTTON EVENTS
  $beginButton.on('click', beginLevelOne);
  $colorButtons.on('click', checkForMatch);
  $colorButtonsLevelFive.on('click', checkForMatchLevelFive);
  $startAgainButton.on('click', startAgain);
  $playLevelTwoButton.on('click', beginLevelTwo);
  $playLevelThreeButton.on('click', beginLevelThree);
  $playLevelFourButton.on('click', beginLevelFour);
  $playLevelFiveButton.on('click', beginLevelFive);
  $homepage.on('click', homepage);
}

$(setup);
