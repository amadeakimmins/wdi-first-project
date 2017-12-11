console.log('Ready!');
$(() => {

  // to get from page 1 to page 2 click the begin button.
  // need to hide div pageOne and show div pageTwo
  //.on('click') event listener


  let pageTwo = $('.pageTwo').hide();
  let pageThree = $('.pageThree').hide();
  let pageFour = $('.pageFour').hide();

  const beginButton = $('.beginButton');

  function beginGame(){
    $('.pageOne').hide();
    pageTwo = $('.pageTwo').show(startTimer);
    colorRandomlySelected();
  }

  $(beginButton).on('click', beginGame);

  // TIMER
  const $displayTimerOnScreen = $('.timerDisplay');
  let timeGiven = 8;
  let timeRemaining = timeGiven;
  let timerRunning = false;
  let timerId = null

  function startTimer(){
    timerId = setInterval(() => {
      timeRemaining--;
      $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        $('.pageTwo').hide();
        pageThree = $('.pageThree').show();
        timeGiven = 8;
      }
    }, 1000);
    timerRunning = true;
  }

  // PAGE 3 START AGAIN BUTTON
  const $startAgainButton = $('.startAgainButton');

  function startAgain (){
    $('.pageThree').hide();
    pageTwo = $('.pageTwo').show();
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

  function checkForMatch(e){
    console.log(timeGiven, timeRemaining);
    // check the e.target .text() to see if it matches the colorOfText
    if(colorOfText === $(e.target).text()){
      console.log($(e.target).text());
      completedRound();
    }else if(colorOfText !== $(e.target).text()){
      $('.pageTwo').hide();
      pageThree = $('.pageThree').show();
      timeGiven = 8;
    }

    function completedRound(){
      $rounds.eq(round).css('backgroundColor', 'black');
      round++;
    }

    timeGiven--;
    if(timeRemaining === 0) {
      clearInterval(timerId);
    }

    resetTimer();
    colorRandomlySelected();
  }

  const $roundSix = $('.roundSix');

  function playerHasWon() {
    if($roundSix.css('backgroundColor', 'black')){
      $('.pageTwo').hide();
      pageThree = $('.pageFour').show();
    }
  }



  $colorButtons.on('click', checkForMatch)






  // repeat until the player has completed all 6 rounds.
  // when player completes round 6 then hide pageTwo and show pageFour.
  // if player wants to play again have an on('click') event on the PLAY AGAIN button that hides pageFour and shows pageTwo

});
