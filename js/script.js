console.log('Ready!');
$(() => {

  // to get from page 1 to page 2 click the begin button.
  // need to hide div pageOne and show div pageTwo
  //.on('click') event listener

  let pageTwo = $('.pageTwo').hide();
  let pageThree = $('.pageThree').hide();
  let pageFour = $('.pageFour').hide();

  const colours = $('.colorsForPlayerToPickFrom li').map(function(){ return $(this).text();});
  console.log(colours)
  const beginButton = $('.beginButton');

  function beginGame(){
    $('.pageOne').hide();
    pageTwo = $('.pageTwo').show(startTimer);
  }

  $(beginButton).on('click', beginGame);

  // start timer when pageTwo div is revealed
  // this starts the timer as soon as the page is loaded. need to attach this to above function.
  // will need it to decrease in time every time the player gets past a round.

  const $displayTimerOnScreen = $('.timerDisplay');
  let timeRemaining = 8;
  let timerRunning = false;
  let timerId = null
  function startTimer(){
    timerId = setInterval(() => {
      timeRemaining--;
      $displayTimerOnScreen.text(`${timeRemaining + ' ' + 'secs'}`);

      if(timeRemaining === 0) {
        clearInterval(timerId);
      }
    }, 1000);
    timerRunning = true;
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



//gerry's pseudo code
// when the user clicks on a colour, run a callback function that will look at
//1.whether it's right or wrong
//2 pick a random colour in the array, this will be the text displayed
//3 pick another random color in the array, this will be the color of the text
//4 display that color as the new "title",
//5 store the first selected color in a variable to check if the user gets the right answer later
});
