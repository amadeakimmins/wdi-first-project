console.log('Ready!');
let timeGiven = 10;
let timeRemaining = timeGiven;
let timerRunning = false;
let timerId = null;
let colorOfText = null;
let colorOfTextLevelFive = null;
const colors = ['yellow', 'red', 'blue', 'green', 'purple', 'orange'];
const colorsLevelFive = ['yellow', 'red', 'blue', 'green', 'purple', 'orange', 'white', 'black', 'HotPink', 'brown', 'grey', 'cyan'];
const backgroundColors = ['gold', 'crimson', 'lightskyblue', 'limegreen', 'darkorchid', 'darkorange'];
const backgroundColorsLevelSix = ['gold', 'crimson', 'lightskyblue', 'limegreen', 'darkorchid', 'darkorange', 'whitesmoke', 'darkslategrey', 'saddlebrown', 'darkgrey', 'royalblue'];
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
  const $levelSixPage = $('.levelSixPage');
  const $tryAgainPage = $('.tryAgainPage');
  const $playerPassedLevelOnePage = $('.playerPassedLevelOne');
  const $playerPassedLevelTwoPage = $('.playerPassedLevelTwo');
  const $playerPassedLevelThreePage = $('.playerPassedLevelThree');
  const $playerPassedLevelFourPage = $('.playerPassedLevelFour');
  const $playerPassedLevelFivePage = $('.playerPassedLevelFive');
  const $playerPassedLevelSixPage = $('.playerPassedLevelSix');
  const $beginButton = $('.beginButton');
  const $displayTimerOnScreen = $('.timerDisplay');
  const $startAgainButton = $('.startAgainButton');
  const $displayColor = $('.colorWordWithDifferentColor');
  const $displayColorLevelFive = $('.levelFiveColorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  const $colorButtonsLevelFour = $('.levelFourButtons');
  const $colorButtonsLevelFive = $('.levelFiveButtons');
  const $colorButtonsLevelSix = $('.levelSixButtons');
  let $rounds = $('.gameRounds li');
  const $finalScoreTime = $('.finalScoreTime');
  const $overallScoreTime = $('.overallScoreTime');
  const $playLevelTwoButton = $('.playLevelTwoButton');
  const $playLevelThreeButton = $('.playLevelThreeButton');
  const $playLevelFourButton = $('.playLevelFourButton');
  const $playLevelFiveButton = $('.playLevelFiveButton');
  const $playLevelSixButton = $('.playLevelSixButton');
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

  // LEVEL 3 AND 4 CHANGE BACKGROUND COLOR
  function generateRandomBackgroundColor(){
    const backgroundColor = backgroundColors[Math.floor(Math.random()*backgroundColors.length)];
    $levelThreePage.css('background-color', backgroundColor);
    $levelFourPage.css('background-color', backgroundColor);
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

  // LEVEL 6 CHANGE BACKGROUND COLOR
  function generateRandomBackgroundColorLevelSix(){
    const backgroundColorLevelSix = backgroundColorsLevelSix[Math.floor(Math.random()*backgroundColorsLevelSix.length)];
    $levelSixPage.css('background-color', backgroundColorLevelSix);
  }

  // SHUFFLE LEVEL 4
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
    $colorButtonsLevelFour.each((i, button)=>{
      $(button).text(colors[i]);
    });
  }

  // SHUFFLE LEVEL 6
  function shuffleLevelSix(colorsLevelFive) {
    let currentIndex = colorsLevelFive.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = colorsLevelFive[currentIndex];
      colorsLevelFive[currentIndex] = colorsLevelFive[randomIndex];
      colorsLevelFive[randomIndex] = temporaryValue;
    }
    $colorButtonsLevelSix.each((i, button)=>{
      $(button).text(colorsLevelFive[i]);
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
      $overallScoreTime.html(`${'You finished the game in:'}` + ' ' + totalSecondsTaken.toFixed(1) + ' ' + 'secs');
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
      } else if (level <= 5){
        $levelFivePage.hide();
        $playerPassedLevelFivePage.show();
      } else {
        $levelSixPage.hide();
        $playerPassedLevelSixPage.show();
      }
      level++;
    } else {
      timeGiven--;
      secondsTaken = 0;
      resetTimer();
      colorRandomlySelected();
      colorRandomlySelectedLevelFive();
      generateRandomBackgroundColor();
      generateRandomBackgroundColorLevelSix();
      shuffle(colors);
      shuffleLevelSix(colorsLevelFive);
    }
  }

  // CHECK FOR MATCH LEVEL 1-4
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

  // CHECK FOR MATCH LEVEL 6
  function checkForMatchLevelSix(e){
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
    timeGiven = 11;
    round = 0;
    $rounds = $('.gameRounds li.levelFive');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelFourPage.hide();
    $levelFivePage.show();
    resetTimer();
    colorRandomlySelectedLevelFive();
  }

  function beginLevelSix() {
    startTime = new Date().getTime();
    timeGiven = 12;
    round = 0;
    $rounds = $('.gameRounds li.levelSix');
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelFivePage.hide();
    $levelSixPage.show();
    resetTimer();
    colorRandomlySelectedLevelFive();
    generateRandomBackgroundColorLevelSix();
    shuffleLevelSix(colorsLevelFive);
  }

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
    $playerPassedLevelSixPage.hide();
  }

  function hidingLevelPages(){
    $levelOnePage.hide();
    $levelTwoPage.hide();
    $levelThreePage.hide();
    $levelFourPage.hide();
    $levelFivePage.hide();
    $levelSixPage.hide();
  }

  // BUTTON EVENTS
  $beginButton.on('click', beginLevelOne);
  $colorButtons.on('click', checkForMatch);
  $colorButtonsLevelFive.on('click', checkForMatchLevelFive);
  $colorButtonsLevelSix.on('click', checkForMatchLevelSix);
  $startAgainButton.on('click', startAgain);
  $playLevelTwoButton.on('click', beginLevelTwo);
  $playLevelThreeButton.on('click', beginLevelThree);
  $playLevelFourButton.on('click', beginLevelFour);
  $playLevelFiveButton.on('click', beginLevelFive);
  $playLevelSixButton.on('click', beginLevelSix);
  $homepage.on('click', homepage);
}

$(setup);
