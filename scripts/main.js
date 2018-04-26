$(document).ready(function () {
    var environment = window.location.host === 'cyrus-shahrivar.github.io' ? 'beta' : 'prod';
    var isBeta = environment === 'beta';
    var environmentPathname = isBeta ? '/BAND_WEBSITE/' : '/';
    
    // Nav Setup
    if (isBeta) {
        $('nav ul li a').each(function(){
            var currentHref = $(this).attr('href');
            $(this).attr('href', '/BAND_WEBSITE' + currentHref);
        });
    }

    // Setup Mobile Menu
    var $body = $('body');
    var $hamburgerOpenButton = $('.hamburger-open-button');
    var $xCloseButton = $('.x-close-button');

    $hamburgerOpenButton.click(function () {
        console.log('clicked');
        $body.toggleClass('mobile-menu-open');
    });

    $xCloseButton.click(function () {
        console.log('clicked');
        $body.toggleClass('mobile-menu-open');
    });

    // Setup Homepage Sections
    var sections = ['shows', 'videos', 'about', 'pics', 'contact'];
    var sectionObjects = sections.map(function (section) {
        return {
            sectionName: section,
            $sectionElement: $('.' + section + '-section'),
            sectionTemplate: $('#' + section + '-template').html(),
        }
    });

    sectionObjects.forEach(function (sectionObj) {
        var sectionName = sectionObj.sectionName;
        Handlebars.registerPartial(sectionName + '-template', sectionObj.sectionTemplate);
        sectionObj.compiledTemplate = Handlebars.compile(sectionObj.sectionTemplate);

        $.ajax({
            dataType: 'json',
            url: environmentPathname + 'data/' + sectionName + '.json'
          }).done(function(data) {
            data.environmentPathname = environmentPathname;
            var compiledHtml =sectionObj.compiledTemplate(data);
            sectionObj.$sectionElement.append(compiledHtml);
        });
    });
})
