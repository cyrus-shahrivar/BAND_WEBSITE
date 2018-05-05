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
    var $picsContent = $('.content');
    var $picsTemplate = $('#pics-template').html();
    var displayedPicShelfs = 0;
    var $loadingSpinnerContainer = $('.loading-container');
    var $loadingSpinner = $('.loading');
    var allPics;


    Handlebars.registerPartial('pics-template', $picsTemplate);
    var compiledTemplate = Handlebars.compile($picsTemplate);

    // Initial Content Loading
    $loadingSpinner.show();
    $.ajax({
        url: environmentPathname + 'data/pics.json',
        dataType: 'json'
    }).then(
        function(data) {
            var numPicsToShow = 3;
            allPics = data.allPics;
            data.environmentPathname = environmentPathname;
            data.numPicsToShow = numPicsToShow;
            data.slice = allPics.slice(0, numPicsToShow);
            displayedPicShelfs += data.numPicsToShow;

            var compiledHtml = compiledTemplate(data);
            $loadingSpinner.hide();
            $picsContent.prepend(compiledHtml);

            createScrollMonitor();
        },
        function (jqXHR, textStatus, errorThrown ) {
            console.log('Error', errorThrown);
        }
    );

    // Subsequent Content Loading
    function loadMoreContent() {
        var minLoadingTime = 1000;

        setTimeout(function () {
            var newStartSlice = displayedPicShelfs;
            var newEndSlice = displayedPicShelfs + 3;
            displayedPicShelfs = newEndSlice;
            var dataObj = {};

            dataObj.slice = allPics.slice(newStartSlice, newEndSlice);

            $loadingSpinner.hide();

            var compiledHtml = compiledTemplate(dataObj);
            $loadingSpinnerContainer.before(compiledHtml);
        }, minLoadingTime);
    }


    function createScrollMonitor(params) {
        var myElement = $('.loading-container');
        var elementWatcher = window.scrollMonitor.create( myElement );

        elementWatcher.enterViewport(function() {
            if (displayedPicShelfs < allPics.length) {
                $loadingSpinner.show();
                loadMoreContent();
            }
        });
    }
});