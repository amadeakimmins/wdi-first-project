console.log('Ready!');
let timeGiven = 8;
let timeRemaining = timeGiven;
let timerRunning = false;
let timerId = null;
let colorOfText = null;
const colors = ['yellow', 'red', 'blue', 'green', 'purple', 'orange'];
let round = 0;
let level = 1;

function setup() {

  const $instructionPage = $('.instructionPage');
  const $levelOnePage = $('.levelOnePage');
  // const $levelTwoPage = $('.levelTwoPage');
  const $tryAgainPage = $('.tryAgainPage');
  const $playerPassedLevelOnePage = $('.playerPassedLevelOne');
  const $beginButton = $('.beginButton');
  const $displayTimerOnScreen = $('.timerDisplay');
  const $startAgainButton = $('.startAgainButton');
  const $displayColor = $('.colorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  const $rounds = $('.gameRounds li');
  const $playLevelTwoButton = $('.playLevelTwoButton');
  const $backToInstructionPageFromTryAgainPageButton = $('.backToInstructionPageFromTryAgainPage');
  const $backToInstructionPageFromPlayerWonPageButton = $('.backToInstructionPageFromPlayerWonPage');


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
      timeRemaining--;
      $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        $levelOnePage.hide();
        $tryAgainPage.show();
        timeGiven = 8;
      }
      timerRunning = true;
    }, 1000);
  }

  function startAgain (){
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $tryAgainPage.hide();
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
    if (level <= 1){
      $displayColor
    } else {
      $displayColor.addClass('level-2-animation');

    }
    //  else if (level <= 3) {}
  }


  function completedRound(){
    $rounds.eq(round).css('backgroundColor', 'black');
    round++;
    if (round >= 8){
      clearInterval(timerId);
      level++;
      console.log('timer stopped because end of round');
      $levelOnePage.hide();
      $playerPassedLevelOnePage.show();
    } else {
      timeGiven--;
      resetTimer();
      console.log('start timer again because not end of round yet');
      colorRandomlySelected();
    }
  }

  function checkForMatch(e){
    // console.log(timeGiven, timeRemaining);
    if(colorOfText === $(e.target).text()){
      completedRound();
    }else if(colorOfText !== $(e.target).text()){
      $levelOnePage.hide();
      $tryAgainPage.show();
      timeGiven = 8;
    }
  }

  function beginLevelTwo (){
    timeGiven = 8;
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelOnePage.hide();
    $levelOnePage.show();
    resetTimer();
    colorRandomlySelected();
  }

  function backToInstructionPageFromPlayerWonPage() {
    timeGiven = 8;
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $playerPassedLevelOnePage.hide();
    $instructionPage.show();
  }

  function backToInstructionPageFromTryAgainPage() {
    timeGiven = 8;
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $tryAgainPage.hide();
    $instructionPage.show();
  }



  // BUTTON EVENTS
  $beginButton.on('click', beginLevelOne);

  $colorButtons.on('click', checkForMatch);

  $startAgainButton.on('click', startAgain);

  $backToInstructionPageFromTryAgainPageButton.on('click', backToInstructionPageFromTryAgainPage);

  $playLevelTwoButton.on('click', beginLevelTwo);

  $backToInstructionPageFromPlayerWonPageButton.on('click', backToInstructionPageFromPlayerWonPage);


}

$(setup);


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
