$(document).ready(function () {
    var $contentContainer = $('.content');
    var showsTemplate = $('#shows-template').html();
    var videosTemplate = $('#videos-template').html();
    var picsTemplate = $('#pics-template').html();
    var aboutTemplate = $('#about-template').html();
    var contactTemplate = $('#contact-template').html();

    Handlebars.registerPartial('shows-template', showsTemplate);
    Handlebars.registerPartial('videos-template', videosTemplate);
    Handlebars.registerPartial('pics-template', picsTemplate);
    Handlebars.registerPartial('about-template', aboutTemplate);
    Handlebars.registerPartial('contact-template', contactTemplate);

    var showsCompiledTemplate = Handlebars.compile(showsTemplate);
    var videosCompiledTemplate = Handlebars.compile(videosTemplate);
    var picsCompiledTemplate = Handlebars.compile(picsTemplate);
    var aboutCompiledTemplate = Handlebars.compile(aboutTemplate);
    var contactCompiledTemplate = Handlebars.compile(contactTemplate);

    $.ajax({
        dataType: 'json',
        url: './data/shows.json'
      }).done(function(data) {
        var compiledHtml = showsCompiledTemplate(data);
        $contentContainer.append(compiledHtml);
    });

    $.ajax({
        dataType: 'json',
        url: './data/videos.json'
      }).done(function(data) {
        var compiledHtml = videosCompiledTemplate(data);
        $contentContainer.append(compiledHtml);
    });

    $.ajax({
        dataType: 'json',
        url: './data/pics.json'
      }).done(function(data) {
        var compiledHtml = picsCompiledTemplate(data);
        $contentContainer.append(compiledHtml);
    });

    $.ajax({
        dataType: 'json',
        url: './data/about.json'
      }).done(function(data) {
        var compiledHtml = aboutCompiledTemplate(data);
        $contentContainer.append(compiledHtml);
    });

    $.ajax({
        dataType: 'json',
        url: '/data/contact.json'
      }).done(function(data) {
        var compiledHtml = contactCompiledTemplate(data);
        $contentContainer.append(compiledHtml);
    });
})