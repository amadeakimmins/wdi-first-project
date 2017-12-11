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
    pageTwo = $('.pageTwo').show();
  }

  $(beginButton).on('click', beginGame);

  // start timer when pageTwo div is revealed
  // this starts the timer as soon as the page is loaded. need to attach this to above function.
  // will need it to decrease in time every time the player gets past a round.

  const displayTimerOnScreen = $('.timerDisplay');

  let timeRemaining = 10;
  const timerRunning = setInterval(timer, 1000);

  function timer(){
    timeRemaining = timeRemaining-1;
    if(timer < 0) {
      clearInterval(timerRunning);
      return;
    }

    $(displayTimerOnScreen).text(`${timeRemaining + ' ' + 'secs'}`);
  }

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
