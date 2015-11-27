$(document).ready(function() {

  var postDate = '';
  var cardImage = '';
  var cardDate = '';
  var description = '';

  //function to determine day names
  var calcDay = function(num) {
    if (num > 6) {
      num -= 7;
    }
    switch (num) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  };
  //function to determine month names
  var calcMonth = function(num) {
    switch (num) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
    }
  };
  //***********************************************
  //Primary function to display available stories *
  //***********************************************
  $.getJSON('http://www.freecodecamp.com/news/hot').then(function(stories) {
    function buildNews(value, index, ar) {
      //Post story image if available
      //Else, post author image if available
      //Use FCC placeholder for broken images
      if (stories[index].image !== '') {
        cardImage = stories[index].image;
      } else {
        cardImage = stories[index].author.picture;
      };

      $('img').error(function() {
        $(this).attr('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/camper-image-placeholder.png');
      });
      //Calculate Date
      postDate = new Date(stories[index].timePosted);
      cardDate += calcDay(postDate.getDay()) + ", ";
      cardDate += postDate.getDate() + " ";
      cardDate += calcMonth(postDate.getMonth()) + " ";
      cardDate += postDate.getFullYear();

      //Shorten metaDescription to fit
      if (stories[index].metaDescription === '') {
        description = 'No description available.'
      } else {
        description = stories[index].metaDescription;
        if (description.length > 218) {
          description = description.substring(0, 217) + '...';
        }
      };
      //Add Story DOM element
      $('.row').append("<a href=\'" + stories[index].link + "\' target=\'_blank\'>" +
        "<div class=\'col-lg-3 story\'>" +
        "<img class=\'logo\' src=\'" + cardImage + "\'/>" +
        "<div class=\'overlay\'><p>" + description + "</p>" +
        "<i class=\'fa fa-heart likes\'> " + stories[index].rank + "</i></div>" +
        "<p class=\'title\'>" + stories[index].headline + "</p>" +
        "<a href=\'http://www.freecodecamp.com/" + stories[index].author.username + "\' target=\'_blank\'" +
        "<p class=\'author\'> By: " + stories[index].author.username + "</a></p>" +
        "<p class=\'date\'>" + cardDate + "</p></div></a>");
      cardDate = '';
    }

    stories.forEach(buildNews);
  });
});
