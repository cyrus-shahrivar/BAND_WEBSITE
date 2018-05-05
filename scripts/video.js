$(document).ready(function () {
    var environment = window.location.host === 'cyrus-shahrivar.github.io' ? 'beta' : 'prod';
    var isBeta = environment === 'beta';
    var environmentPathname = isBeta ? '/BAND_WEBSITE/' : '/';

    // Setup Mobile Menu
    // Nav Setup
    if (isBeta) {
        $('nav ul li a:not(.subscribe-link), .nav-logo-link').each(function(){
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
    var displayedVideoShelfs = 0;
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
    }).then(
        function(data) {
            var numVideosToShow = 3;
            allVideos = data.allVideos;
            data.environmentPathname = environmentPathname;
            data.numVideosToShow = numVideosToShow;
            data.slice = allVideos.slice(0, numVideosToShow);
            displayedVideoShelfs += data.numVideosToShow;

            var compiledHtml = compiledTemplate(data);
            $loadingSpinner.hide();
            $videoContent.prepend(compiledHtml)

            createScrollMonitor();
        },
        function (jqXHR, textStatus, errorThrown) {
            console.log('Error', errorThrown);
        }
    );

    // Subsequent Content Loading
    function loadMoreContent() {
        var minLoadingTime = 1000;

        setTimeout(function () {
            var newStartSlice = displayedVideoShelfs;
            var newEndSlice = displayedVideoShelfs + 3;
            displayedVideoShelfs = newEndSlice;
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
            if (displayedVideoShelfs < allVideos.length) {
                $loadingSpinner.show();
                loadMoreContent();
            }
        });
    }
});