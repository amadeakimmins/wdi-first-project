console.log('Ready!');
$(() => {

  const $pageOne = $('.pageOne');
  const $pageTwo = $('.pageTwo');
  const $pageThree = $('.pageThree');
  const $pageFour = $('.pageFour');
  // pageTwo.hide();


  const $beginButton = $('.beginButton');

  function beginGame(){
    $pageOne.hide();
    $pageTwo.show();
    startTimer();
    colorRandomlySelected();
  }

  $beginButton.on('click', beginGame);

  // TIMER
  const $displayTimerOnScreen = $('.timerDisplay');
  let timeGiven = 7;
  let timeRemaining = timeGiven;
  let timerRunning = false;
  let timerId = null

  function startTimer(){
    timerId = setInterval(() => {
      timeRemaining--;
      $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        $pageTwo.hide();
        $pageThree.show();
        timeGiven = 7;
      }
      timerRunning = true;
    }, 1000);
  }
  // PAGE 3 START AGAIN BUTTON
  const $startAgainButton = $('.startAgainButton');

  function startAgain (){
    $pageThree.hide();
    $pageTwo.show();
    resetTimer();
    colorRandomlySelected();
  }

  // RESET TIMER
  function resetTimer(){
    clearInterval(timerId);
    timeRemaining = timeGiven;
    $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);
    timerRunning = false;
    startTimer();

  }

  $($startAgainButton).on('click', startAgain);

  // GAME LOGIC
  const $displaycolor = $('.colorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  let colorOfText = null;
  const colors = ['yellow', 'red', 'blue', 'green', 'pink', 'orange'];


  //GENERATING WORD AND COLOR OF WORD:
  function generateRandomColor() {
    return colors[Math.floor(Math.random()*colors.length)];
  }

  function colorRandomlySelected(){
    const chosenWord = generateRandomColor();
    colorOfText = generateRandomColor();
    $displaycolor.text(chosenWord).css('color', colorOfText);
  }
  console.log(colorOfText);

  //CHECKING FOR MATCH:

  let round = 0;
  const $rounds = $('.gameRounds li');

  function completedRound(){
    $rounds.eq(round).css('backgroundColor', 'black');
    round++;
    if (round >= 6){
      console.log('moving to next round');
      clearInterval(timerId);
      $pageTwo.hide();
      $pageFour.show();
    } else {
      timeGiven--;
      resetTimer();
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
      timeGiven = 7;
    }
  }
  // PLAY AGAIN BUTTON
  const $playAgainButton = $('.playAgainButton');

  function playAgain (){
    timeGiven = 7;
    round = 0;
    $rounds.css('backgroundColor', 'rgba(255, 255, 255, 0.41)');
    $pageFour.hide();
    $pageTwo.show();
    resetTimer();
    colorRandomlySelected();
  }
  $playAgainButton.on('click', playAgain);



  $colorButtons.on('click', checkForMatch);

});
