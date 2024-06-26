var a = 0;
$(function() {
	$('#bannerslider').Swipe({
        startSlide: 0,
        speed: 400,
        auto: 3000,
        draggable: true,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        autoRestart: true,
        callback: function(index, elem, dir) {
            $('#bannerslider').find('li').removeClass('active');
            $('#b_' + index).addClass('active');
        },
        transitionEnd: function(index, elem) {},
    });

    // Food categories
    $('#slider').Swipe({
        startSlide: 0,
        speed: 400,
        auto: 0,
        draggable: true,
        continuous: false,
        disableScroll: false,
        stopPropagation: false,
        autoRestart: false,
        callback: function(index, elem, dir) {
            $('#slider').find('li').removeClass('active');
            $('#i_' + index).addClass('active');
        },
        transitionEnd: function(index, elem) {},
    });
    $('.swipe-nav').css(
        'margin-right',
        '-' + $('.swipe-nav').width() / 2 + 'px'
    );

})
