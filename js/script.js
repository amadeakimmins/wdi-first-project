console.log('Ready!');
let timeGiven = 8;
let timeRemaining = timeGiven;
let timerRunning = false;
let timerId = null;
let colorOfText = null;
const colors = ['yellow', 'red', 'blue', 'green', 'pink', 'orange'];
let round = 0;

function setup() {

  const $pageOne = $('.pageOne');
  const $pageTwo = $('.pageTwo');
  const $pageThree = $('.pageThree');
  const $pageFour = $('.pageFour');
  const $beginButton = $('.beginButton');
  const $displayTimerOnScreen = $('.timerDisplay');
  const $startAgainButton = $('.startAgainButton');
  const $displaycolor = $('.colorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  const $rounds = $('.gameRounds li');
  const $playAgainButton = $('.playAgainButton');
  const $backToPageOneFromPageThreeButton = $('.backToPageOneFromPageThree');
  const $backToPageOneFromPageFourButton = $('.backToPageOneFromPageFour');

  // LEVEL 1
  function beginGame(){
    $pageOne.hide();
    $pageTwo.show();
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
        $pageTwo.hide();
        $pageThree.show();
        timeGiven = 8;
      }
      timerRunning = true;
    }, 1000);
  }

  function startAgain (){
    round = 0
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $pageThree.hide();
    $pageTwo.show();
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
    $displaycolor.text(chosenWord).css('color', colorOfText);
  }

  // TO RANDOMLY CHANGE THE CONTENT OF COLOR BUTTONS for LEVEL 2:
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
  // }


  function completedRound(){
    $rounds.eq(round).css('backgroundColor', 'black');
    round++;
    if (round >= 8){
      clearInterval(timerId);
      console.log('timer stopped because end of round');
      $pageTwo.hide();
      $pageFour.show();
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
      $pageTwo.hide();
      $pageThree.show();
      timeGiven = 8;
    }
  }

  function playAgain (){
    timeGiven = 8;
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $pageFour.hide();
    $pageTwo.show();
    resetTimer();
    colorRandomlySelected();
  }

  function backToPageOneFromPageFour() {
    timeGiven = 8;
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $pageFour.hide();
    $pageOne.show();
  }

  function backToPageOneFromPageThree() {
    timeGiven = 8;
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $pageThree.hide();
    $pageOne.show();
  }
  

  // BUTTON EVENTS
  $beginButton.on('click', beginGame);

  $colorButtons.on('click', checkForMatch);

  $startAgainButton.on('click', startAgain);

  $backToPageOneFromPageThreeButton.on('click', backToPageOneFromPageThree);

  $playAgainButton.on('click', playAgain);

  $backToPageOneFromPageFourButton.on('click', backToPageOneFromPageFour);
}
$(setup);
