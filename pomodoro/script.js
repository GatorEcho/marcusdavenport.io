$(document).ready(function() {

  //load audio files
  var ticking = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/174721__drminky__watch-tick.wav');
  var breakDing = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/Elevator_Ding-SoundBible.com-685385892.mp3');
  var workDing = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/Air_Plane_Ding-SoundBible.com-496729130.mp3');

  var timerID;
  var line = 0;
  var breakTime = 300;
  var workTime = 1500;
  var running = false;
  var onBreak = false;
  var startTime;
  var minutes = workTime/60;
  var seconds = 0;
  var tickCheck;

  //empty the timer circle on load
  document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', "0 100");

  //set the default times display in minutes
  $('#work-box').text("Work: " + (workTime / 60) + " min");
  $('#break-box').text("Break: " + (breakTime / 60) + " min");
  $('#countdown').text(workTime/60 + ":00");

  //This function controls the clock display and ticking
  function countDown(num){
    seconds -= num;
    //play a tick if the second will change
    if (Math.floor(seconds) !== tickCheck  && !onBreak){
      ticking.play();
      tickCheck = Math.floor(seconds);
    }
    //roll over to the next minute
    if(seconds <= 0){
      seconds = 59.9;
      minutes -= 1;
    }
    //prevent minutes from displaying -1
    if (minutes < 0){
      minutes = 0;
    }
    //change the countdown text
    $('#countdown').text(minutes + ":" + ("0" + Math.floor(seconds)).slice(-2));
  }

  //This is the primary timing function that is called in setInterval()
  function timer() {
    var currentTime = new Date().getTime();
    //Time to work. Fill the circle.
    if (line < 100 && onBreak === false) {
      line += (((currentTime - startTime) / 1000) / workTime) * 100;
      countDown((currentTime - startTime)/1000);
      startTime = currentTime;
      document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', line + " 100");
    //When break is done, start work again
    } else if (line === 0 && onBreak === true) {
      workDing.play();
      onBreak = false;
      $('#countdown').text(workTime/60 + ":00");
      $('#activity').text("Work");
      $('#work-slider').slider('disable');
      $('#work-box').css('background-color', '#2F364C');
      $('#work-box').css('color', 'gray');
      $('#break-slider').slider('enable');
      $('#break-box').css('background-color', '#212121');
      $('#break-box').css('color', '#E0F7FA');
      minutes = workTime/60;
      seconds = 0;
    //if the circle is full, work time is over, set up break time
    } else if (line >= 100 || onBreak === true) {
    //If this is the first iteration for break, play the break ding and set sliders, countdown, etc
      if (onBreak === false) {
        breakDing.play();
        $('#countdown').text(breakTime/60 + ":00");
        $('#activity').text("Break");
        $('#break-slider').slider('disable');
        $('#break-box').css('background-color', '#2F364C');
        $('#break-box').css('color', 'gray');
        $('#work-slider').slider('enable');
        $('#work-box').css('background-color', '#212121');
        $('#work-box').css('color', '#E0F7FA');
        minutes = breakTime/60;
        seconds = 0;
        onBreak = true;
      }
     //Start the break countdown
      line -= (((currentTime - startTime) / 1000) / breakTime) * 100;
      countDown((currentTime - startTime)/1000);
      startTime = currentTime;
     //Keep the circle from underfilling, creates a visual glitch
      if (line < 0) {
        line = 0;
      }
      document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', line + " 100");
    }
  }

  //functions for the start, pause, and reset buttons
  $('#start-button').click(function() {
    if (!running) {
      $('#circle-fill').css('transition', 'stroke-dasharray 0.1s');
      startTime = new Date().getTime();
      timerID = setInterval(timer, 50);
      running = true;
    }
    if(!onBreak){
      $('#activity').text("Work");
      $('#work-slider').slider('disable');
      $('#work-box').css('background-color', '#2F364C');
      $('#work-box').css('color', 'gray');
    }
    $('#activity').addClass("animated rubberBand");
  });

  $('#pause-button').click(function() {
    running = false;
    clearInterval(timerID);
    $('#activity').removeClass("animated rubberBand");
  });

  $('#reset-button').click(function() {
    minutes = workTime/60;
    running = false;
    onBreak = false;
    clearInterval(timerID);
    line = 0;
    minutes = workTime/60;
    seconds = 0;
    $('#countdown').text(workTime/60 + ":00");
    $('#activity').text("");
    $('#activity').removeClass("animated rubberBand");
    $('#work-slider').slider('enable');
    $('#work-box').css('background-color', '#212121');
    $('#work-box').css('color', '#E0F7FA');
    $('#break-slider').slider('enable');
    $('#break-box').css('background-color', '#212121');
    $('#break-box').css('color', '#E0F7FA');
    $('#circle-fill').css('transition', 'stroke-dasharray 1.5s ease-out');
    document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', "0 100");
  });

  //increase and decrease work time
  $("#work-slider").slider({
    min: 1,
    max: 50,
    value: 25,
    range: "min",
    slide: function(event, ui) {
      workTime = ui.value * 60;
      if(!running){
        $("#countdown").text(ui.value + ":00");
        minutes = workTime/60;
      }
      $("#work-box").text("Work: " + ui.value + " min");
    }
  });

  //increase and decrease break time
  $("#break-slider").slider({
    min: 1,
    max: 50,
    value: 5,
    range: "min",
    slide: function(event, ui) {
      breakTime = ui.value * 60;
      $("#break-box").text("Break: "+ ui.value + " min");
    }
  });
});
