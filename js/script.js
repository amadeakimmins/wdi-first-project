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
  }

  $(beginButton).on('click', beginGame);

  // TIMER
  const $displayTimerOnScreen = $('.timerDisplay');
  let timeRemaining = 7;
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
      }
    }, 1000);
    timerRunning = true;
  }

  // PAGE 3 START AGAIN BUTTON
  const $startAgainButton = $('.startAgainButton');

  function startAgain (){
    $('.pageThree').hide();
    pageTwo = $('.pageTwo').show(resetTimer);
  }
  // RESET TIMER
  function resetTimer(){
    clearInterval(timerId);
    timeRemaining = 7;
    $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);
    timerRunning = false;
    startTimer();
  }

  $($startAgainButton).on('click', startAgain);

  //gerry's pseudo code
  // when the user clicks on a colour, run a callback function that will look at
  //1.whether it's right or wrong
  //2 pick a random colour in the array, this will be the text displayed
  //3 pick another random color in the array, this will be the color of the text
  //4 display that color as the new "title",
  //5 store the first selected color in a variable to check if the user gets the right answer later

  // // GAME LOGIC
  // const $displayColour = $('.colorsForPlayerToPickFrom');
  // const $colourButtons = $('.colorsForPlayerToPickFrom li');
  //
  //
  // // const $colours = $($colourButtons).map(funtion() {
  // //   return $(this).text();
  // // });
  // // console.log($colours);
  //
  // function randomlySelectedColourText(){
  //   const $colours = $($colourButtons).map(function(){
  //     return $(this).text(displayColour);
  //
  //
  //   });
  // }
  // // [Math.floor(Math.random()*6)]
  // //
  // ($colourButtons).on('click', randomlySelectedColourText)

  // GAME LOGIC:
  // the colorWordWithDifferentColor will be an object with all the different combinations of colors and words in an array.
  // will have a function that loops over the words and randomly selects a new word when the player is correct.
  // give all the words an id of the color that it's got
  // when the player clicks on the word they think matches use a if else statment with ternary operators to check if it's right.
  // if correct a new colorWordWithDifferentColor is randomly selected and the roundOne box will be have a black background-color.
  // if incorrect hide this pageTwo and show pageThree.


  // if player wants to START AGAIN have an .on('click') event on the button that hides pageThree and shows pageTwo.
  // repeat until the player has completed all 6 rounds.
  // when player completes round 6 then hide pageTwo and show pageFour.
  // if player wants to play again have an on('click') event on the PLAY AGAIN button that hides pageFour and shows pageTwo

});
