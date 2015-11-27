$('document').ready(function () {

    var wait;
    var animate = true;

    //scroll to page sections rather than jump
    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    //This section controls the introduction animations
    //Toggle to turn off animations for design purposes
    if (animate) {
        //hide overflow to prevent animations from creating scroll bars
        $('body').addClass('stabilize');

        var wait = window.setTimeout(function () {
            $('#home p').removeClass('bounceInLeft');
        }, 1300);

        var wait = window.setTimeout(function () {
            $('#home p').addClass('bounceOutRight');
        }, 2300);

        var wait = window.setTimeout(function () {
            $('#home p').text('');
            $('#home p').removeClass('bounceOutRight');
        }, 3300);

        var wait = window.setTimeout(function () {
            $('#home p').addClass('bounceInLeft')
            $('#home p').text("My name is Marc.")
        }, 3800);

        var wait = window.setTimeout(function () {
            $('#home p').removeClass('bounceInLeft');
        }, 5100);

        var wait = window.setTimeout(function () {
            $('#home p').addClass('bounceOutRight');
        }, 6100);

        var wait = window.setTimeout(function () {
            $('#home p').text('');
            $('#home p').removeClass('bounceOutRight');
        }, 6700);

        var wait = window.setTimeout(function () {
            $('#home p').addClass('bounceInLeft')
            $('#home p').text("I'm a web developer (ish).")
        }, 8000);

        var wait = window.setTimeout(function () {
            $('#home p').removeClass('bounceInLeft');
        }, 9300);

        var wait = window.setTimeout(function () {
            $('#home p').addClass('bounceOutRight');
            $('.skip').remove();
        }, 10300);

        var wait = window.setTimeout(function () {
            $('.navbar').css('background', '#F44336');
            $('#home').css('height', '0')
        }, 10300);

        var wait = window.setTimeout(function () {
            $('body').removeClass('stabilize');
        }, 10500);
    } else {
        $('#home p').text('');
        $('#home').css('height', '0vh');
        $('.navbar').css('background', '#F44336 !important');
        $('body').removeClass('stabilize');
        $('.skip').remove();
    }
    //skip function so that users do not have to watch the
    //entire introduction on each visit
    $('.skip').click(function () {
        animate = false;
        $('#home p').text('');
        $('#home').css('height', '0vh');
        $('.navbar').css('background', '#F44336 !important');
        $('body').removeClass('stabilize');
        $('.skip').remove();
        $('#home p').remove();
    });
});
