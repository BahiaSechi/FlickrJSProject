$(document).ready(function() {

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('courant');
        $('.tab-content').removeClass('courant');

        $(this).addClass('courant');
        $("#"+tab_id).addClass('courant');
    });

});