$(document).ready(function(){

  var sounds = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'), new
Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/131660__bertrof__game-sound-correct.wav'), new
Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/216090__richerlandtv__bad-beep-incorrect.mp3'), new
Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/Ta_Da-SoundBible.com-1884170640.mp3')];

  var simonSequence = [];
  var userSequence = [];

  var count = 0;
  var userCount = 0;

  var wait;
  var pause;

  $('.reset-button').css({'pointer-events' : 'none',
                         'background' : 'gray'});

  //The primary function that automates
  //Simon sequences
  function playSimon(repeat){
    pause = 100;
    if(repeat !== true){
      simonSequence.push(Math.round(Math.random()*3));
      count += 1;
    }
    simonSequence.forEach(function(value, index){
      wait = window.setTimeout(function(){
        sounds[value].play();
        $('#' + value).css({'transform' : 'scale(1.03,1.03)',
                 '-ms-transform' : 'scale(1.03,1.03)',
                 '-webikit-transform' : 'scale(1.03,1.03)'});
        $('#' + value).addClass('active');
        wait = window.setTimeout(function(){
          $('#' + value).css({'transform' : 'scale(1,1)',
                 '-ms-transform' : 'scale(1,1)',
                 '-webikit-transform' : 'scale(1,1)'});
          $('#' + value).removeClass('active');
          if(index == simonSequence.length - 1){
            $('.button').css('pointer-events', 'auto');
            $('.reset-button').css({'pointer-events' : 'auto',
                                    'background' : 'red'});
          }
        }, 300);
      }, pause);
      //Speed up as count gets higher
      switch (true){
        case(count < 5):
          pause += 1100;
          break;
        case(count > 4 && count < 9):
          pause += 900;
          break;
        case(count > 8 && count < 13):
          pause += 700;
          break;
        case(count > 12):
          pause += 500;
          break;
      }
    });
    $('.count').text(count);
  }

  $('.start-button').click(function(){
    $('.start-button').css({'pointer-events' : 'none',
                               'background' : 'gray'});
    playSimon();
  });

  $('.reset-button').click(function(){
    count = 0;
    $('.count').text(count);
    $('.button').css('pointer-events', 'none');
    $('.start-button').css({'pointer-events' : 'auto',
                               'background' : 'red'});
    $('.reset-button').css({'pointer-events' : 'none',
                               'background' : 'gray'});
    simonSequence = [];
  });

  $('.button').click(function(){
    userCount += 1;
    if($(this).attr('id') != simonSequence[userCount-1]){
      $('.button').css('pointer-events', 'none');
       $('.reset-button').css({'pointer-events' : 'none',
                               'background' : 'gray'});
      userCount = 0;
      sounds[5].play();
      wait = window.setTimeout(function(){
        if($('#strict-check').prop('checked')){
          count = 0;
          simonSequence = [];
          playSimon();
        }else{
          playSimon(true);
        }
      }, 2000);
    }else if(userCount == simonSequence.length){
      if(simonSequence.length === 20){
        sounds[6].play();
      }else{
       $('.button').css('pointer-events', 'none');
       $('.reset-button').css({'pointer-events' : 'none',
                               'background' : 'gray'});
      userCount = 0;
      //sounds[4].play();
      wait = window.setTimeout(function(){
        playSimon();
      }, 2000);
     }
    }
  });

  $('.button').mousedown(function(){
    $(this).css({'transform' : 'scale(1.03,1.03)',
                 '-ms-transform' : 'scale(1.03,1.03)',
                 '-webikit-transform' : 'scale(1.03,1.03)'});
    sounds[$(this).attr('id')].play();
  });

  $('.button').mouseup(function(){
    $(this).css({'transform' : 'scale(1,1)',
                 '-ms-transform' : 'scale(1,1)',
                 '-webikit-transform' : 'scale(1,1)'});
  });
});
