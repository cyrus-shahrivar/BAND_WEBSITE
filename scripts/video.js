$(document).ready(function () {
    var environment = window.location.host === 'cyrus-shahrivar.github.io' ? 'beta' : 'prod';
    var isBeta = environment === 'beta';
    var environmentPathname = isBeta ? '/BAND_WEBSITE/' : '/';

    // Setup Mobile Menu
    // Nav Setup
    if (isBeta) {
        $('nav ul li a').each(function(){
            var currentHref = $(this).attr('href');
            $(this).attr('href', '/BAND_WEBSITE' + currentHref);
        });
    }

    var $body = $('body');
    var $hamburgerOpenButton = $('.hamburger-open-button');
    var $xCloseButton = $('.x-close-button');
    var $navLinks = $('.nav-link');

    $hamburgerOpenButton.click(function () {
        console.log('clicked');
        $body.toggleClass('mobile-menu-open');
    });

    $xCloseButton.click(function () {
        console.log('clicked');
        $body.toggleClass('mobile-menu-open');
    });

    $navLinks.click(function() {
        if ($body.hasClass('mobile-menu-open')) {
            $body.toggleClass('mobile-menu-open');
        }
    })

    // Content Setup
    var $videoContent = $('.content');
    var $videosTemplate = $('#videos-template').html();
    var displayedVideos = 0;
    var $loadingSpinnerContainer = $('.loading-container');
    var $loadingSpinner = $('.loading');
    var allVideos;

    Handlebars.registerPartial('videos-template', $videosTemplate);
    var compiledTemplate = Handlebars.compile($videosTemplate);

    // Hero Animation
    $('.hero__video').on('ended', function () {
        $(this).slideUp();
    })

    // Initial Content Loading
    $loadingSpinner.show();
    $.ajax({
        url: environmentPathname + 'data/videos.json',
        dataType: 'json'
    }).done(function(data) {
        var numVideosToShow = 3;
        allVideos = data.allVideos;
        data.environmentPathname = environmentPathname;
        data.numVideosToShow = numVideosToShow;
        data.slice = allVideos.slice(0, numVideosToShow);
        displayedVideos += data.numVideosToShow;

        var compiledHtml = compiledTemplate(data);
        $loadingSpinner.hide();
        $videoContent.prepend(compiledHtml)

        createScrollMonitor();
    });

    // Subsequent Content Loading
    function loadMoreContent() {
        var minLoadingTime = 1000;

        setTimeout(function () {
            var newStartSlice = displayedVideos;
            var newEndSlice = displayedVideos + 3;
            displayedVideos = newEndSlice;
            var dataObj = {};

            dataObj.slice = allVideos.slice(newStartSlice, newEndSlice);

            $loadingSpinner.hide();

            var compiledHtml = compiledTemplate(dataObj);
            $loadingSpinnerContainer.before(compiledHtml);
        }, minLoadingTime);
    }


    function createScrollMonitor(params) {
        var myElement = $('.loading-container');
        var elementWatcher = window.scrollMonitor.create( myElement );

        elementWatcher.enterViewport(function() {
            if (displayedVideos < allVideos.length) {
                $loadingSpinner.show();
                loadMoreContent();
            }
        });
    }
});