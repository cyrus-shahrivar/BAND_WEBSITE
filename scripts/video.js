$(document).ready(function () {
    $('.hero__video').on('ended', function () {
        $(this).slideUp();
    })
});