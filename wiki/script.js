$(document).ready(function () {
    var searchTerm, searchAuto, url
    var arrResults = [];

    var sortResults = function (a, b) {
            if (a[0] === b[0]) {
                return 0;
            } else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        }
        //Primary search function
    $('.search-button').click(function () {
        $('.auto-container').empty();
        $('.container').empty();
        arrResults = [];
        searchTerm = $('.search-box').val();
        url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=' + searchTerm + '&gsrlimit=15&prop=extracts&exsentences=3&exintro=&explaintext&exlimit=max&callback=?';

        $.getJSON(url).then(function (data) {
            if (typeof data.query === 'undefined') {
                $('.container').append("<div class='entry animated fadeInUp'><p class='title'>No Results Found</p><p class='text'>We could not find a matching Wikipedia entry. Please check your search terms and try again.</p>");
            } else {

                //Wikipedia returns relevant pages in random order
                //with an index value that indicates precedence.
                //The necessary values are stored in arrResults and sorted
                //by index so that the most relevant results are first.

                for (var value in data.query.pages) {
                    arrResults.push([data.query.pages[value].index, value, data.query.pages[value].title, data.query.pages[value].extract]);
                }
                arrResults = arrResults.sort(sortResults);
                arrResults.forEach(function (value) {
                    $('.container').append("<a href='http://en.wikipedia.org?curid=" + value[1] + "' target='_blank'><div class='entry animated fadeInUp'><p class='title'>" + value[2] + "</p><p class='text'>" + value[3] + "</p></a>");
                });
            }
        });
    });

    //Hover event for dynamically created results
    $(document).on('mouseenter', '.entry', function () {
        $(this).css('background', '#362520');
    });
    $(document).on('mouseleave', '.entry', function () {
        $(this).css('background', 'none');
    });

    //Random function
    //Requests 10 random pages from the API and lists them as search results
    $('.random-button').click(function () {
        $('.container').empty();
        $.getJSON('http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit=10&callback=?').then(function (data) {
            for (var value in data.query.random) {
                $('.container').append("<a href='http://en.wikipedia.org?curid=" + data.query.random[value].id + "' target='_blank'><div class='entry animated fadeInUp'><p class='title'>" + data.query.random[value].title + "</p><p class='text'></p></a>");
            }
        });
    });

    //Enable search on 'enter'
    $('.search-box').keyup(function (event) {
        $('.container').empty();
        searchAuto = $('.search-box').val();

        if (event.keyCode == 13) {
            $('.search-button').click();
            $('.search-box').autocomplete('destroy');
        }

        //Call for autocomplete when characters
        //are typed into the search-box
        $('.search-box').autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "http://en.wikipedia.org/w/api.php",
                    dataType: "jsonp",
                    data: {
                        'action': "opensearch",
                        'format': "json",
                        'limit': 10,
                        'search': searchAuto
                    },
                    success: function (data) {
                        response(data[1]);
                    }
                });
            },
            minLength: 2,
            delay: 300,
            select: function () {
                $('.search-button').click();
            }
        });
    });

});
