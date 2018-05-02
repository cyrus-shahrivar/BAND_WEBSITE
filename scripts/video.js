$(document).ready(function () {
    var environment = window.location.host === 'cyrus-shahrivar.github.io' ? 'beta' : 'prod';
    var isBeta = environment === 'beta';
    var environmentPathname = isBeta ? '/BAND_WEBSITE/' : '/';

    var $videoContent = $('.content');
    var $videosTemplate = $('#videos-template').html();
    var displayedVideos = 0;
    var $loadingSpinner = $('.loading');
    var allVideos;

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

        Handlebars.registerPartial('videos-template', $videosTemplate);
        var compiledTemplate = Handlebars.compile($videosTemplate);
        var compiledHtml = compiledTemplate(data);
        $loadingSpinner.hide();
        $videoContent.prepend(compiledHtml)
    });

    // Subsequent Content Loading
    // TODO: When in view of loading container, show spinner, then load content, then hide spinner

    // NOTE: for demo purposes only
    $('.content').click(function () {
        $loadingSpinner.show();
    })
});