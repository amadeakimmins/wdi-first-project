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
    colorRandomlySelected();
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
  // when the user clicks on a color, run a callback function that will look at
  //1.whether it's right or wrong
  //2 pick a random  in the array, this will be the text displayed
  //3 pick another random color in the array, this will be the color of the text
  //4 display that color as the new "title",
  //5 store the first selected color in a variable to check if the user gets the right answer later

  // GAME LOGIC
  const $displaycolor = $('.colorWordWithDifferentColor');
  const $colorButtons = $('.colorsForPlayerToPickFrom li');
  let colorOfText = null;
  const colors = ['yellow', 'red', 'blue', 'green', 'pink', 'orange'];


  // a function that randomly picks a string from the colors array using Math.random (store in colorName)
  // select another randomly generated string and store in a variable called colorOfText
  // update the .text() of the $displaycolor element
  // $displaycolor.css('backgroundColor', colorOfText)
  // call function when page loads and then everytime need a new color

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

  const $rounds = $('.gameRounds');
  const $eachRound = $('.gameRounds li');

  function checkForMatch(e){
    // check the e.target .text() to see if it matches the colorOfText
    if(colorOfText === $(e.target).text()){
      console.log($(e.target).text());
      completedRound();
    }else if(colorOfText !== $(e.target).text()){
      $('.pageTwo').hide();
      pageThree = $('.pageThree').show();
    }

    function completedRound(){
      // $rounds.each((i, $eachRound) => {
      $eachRound.css('backgroundColor', 'black');
      //  });
    }
    colorRandomlySelected();
  }


  $colorButtons.on('click', checkForMatch)



  // when the player clicks on the word they think matches use a if else statment with ternary operators to check if it's right.
  // if correct a new colorWordWithDifferentColor is randomly selected and the roundOne box will be have a black background-color.
  // if incorrect hide this pageTwo and show pageThree.


  // if player wants to START AGAIN have an .on('click') event on the button that hides pageThree and shows pageTwo.
  // repeat until the player has completed all 6 rounds.
  // when player completes round 6 then hide pageTwo and show pageFour.
  // if player wants to play again have an on('click') event on the PLAY AGAIN button that hides pageFour and shows pageTwo

});
