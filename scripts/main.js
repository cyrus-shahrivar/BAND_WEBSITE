$(document).ready(function () {
    var $contentContainer = $('.content');
    var showsTemplate = $('#shows-template').html();
    var newsTemplate = $('#news-template').html();

    Handlebars.registerPartial('shows-template', showsTemplate);
    Handlebars.registerPartial('news-template', newsTemplate);

    var showsCompiledTemplate = Handlebars.compile(showsTemplate);
    var newsCompiledTemplate = Handlebars.compile(newsTemplate);

    $.ajax({
        dataType: 'json',
        url: '/data/shows.json'
      }).done(function(data) {
        var compiledHtml = showsCompiledTemplate(data);
        $contentContainer.append(compiledHtml);
    });

    $.ajax({
        dataType: 'json',
        url: '/data/news.json'
      }).done(function(data) {
        var isNewsAvailable = data.news.length;

        if (isNewsAvailable) {
            var compiledHtml = newsCompiledTemplate(data);
            $contentContainer.prepend(compiledHtml);
        }
    });
})
