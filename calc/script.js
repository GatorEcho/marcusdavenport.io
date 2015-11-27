$(document).ready(function() {
  //Stores the current expression
  var exp = '';
  //Stores the last number entered
  var lastNum = 0;
  //Prevents multiple operators
  var operator = false;
  //Keypress operator holder
  var keypress = '';

  //Add numbers to exp and screen
  $('body').on('click', '.number', function() {
    exp += $(this).attr('id');
    if (exp.length > 14) {
      exp = exp.substring(0, 15);
    }
    $('.screen p').html(exp);
    operator = false;
  });

  //Add operators to exp and screen
  $('body').on('click', '.operator', function() {
    if (!operator) {
      exp += $(this).attr('id');
      if (exp.length > 14) {
        exp = exp.substring(0, 15);
      }
      $('.screen p').html(exp);
      operator = true;
    } else {
      exp = exp.substring(0, exp.length - 1);
      exp += $(this).attr('id');
      if (exp.length > 14) {
        exp = exp.substring(0, 15);
      }
      $('.screen p').html(exp);
    }
  });

  //All Clear
  $('#AC').click(function() {
    exp = '';
    $('.screen p').html(exp);
  });

  //Clear Error
  $('#CE').click(function() {
    exp = exp.substring(0, exp.length - 1);
    $('.screen p').html(exp);
  });

  //Equal
  $('#equal').click(function() {
    exp = eval(exp).toString();
    if (exp.length > 14) {
      exp = exp.substring(0, 15);
    }
    $('.screen p').html(exp);
    operator = false;
  });

  //Positive, Negative
  $('#neg').click(function() {
    exp = eval(exp) * -1;
    $('.screen p').html(exp);
  });

  //Capture key presses to enable keypad use
  //Functions are essentially the same as their button counterparts
  $(document).keypress(function(key) {
    console.log(key.keyCode);
    //if a number was pressed
    if (key.keyCode > 47 && key.keyCode < 58 || key.keyCode === 46) {
      //Decimal is treated as a number, check here
      if (key.keyCode === 46) {
        exp += '.';
      } else {
        exp += (key.keyCode - 48);
        if (exp.length > 14) {
          exp = exp.substring(0, 15);
        }
      }
      $('.screen p').html(exp);
      operator = false;
    //If an operator was pressed
    } else if (key.keyCode !== 13) {
      switch (key.keyCode) {
        case 42:
          keypress = '*';
          break;
        case 43:
          keypress = '+';
          break;
        case 45:
          keypress = '-';
          break;
        case 47:
          keypress = '/';
          break;
      }
      if (!operator) {
        exp += keypress;
        if (exp.length > 14) {
          exp = exp.substring(0, 15);
        }
        $('.screen p').html(exp);
        operator = true;
      } else {
        exp = exp.substring(0, exp.length - 1);
        exp += keypress;
        if (exp.length > 14) {
          exp = exp.substring(0, 15);
        }
        $('.screen p').html(exp);
      }
    //If equal was pressed
    } else if(key.keyCode === 13){
      exp = eval(exp).toString();
    if (exp.length > 14) {
      exp = exp.substring(0, 15);
    }
    $('.screen p').html(exp);
    operator = false;
    }
  });

});
