$(document).ready(function() {

    const api_key = "721be46bb63a5e6608c293a45c7888bd";
    const api_key_secret = "217f8c95e04dfb8d";
    const urlNantes = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=90088c1a8f165876785c6e57de1a785b&tags=nantes&format=json&nojsoncallback=1&auth_token=72157704379938022-a944c67750718458&api_sig=60c4c5a99b69b19ff7b2d99a8f6ff885";

    //Gestion des tabs
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('courant');
        $('.tab-content').removeClass('courant');

        $(this).addClass('courant');
        $("#"+tab_id).addClass('courant');
    });

    //Gestion des appels de photos
    let request = new XMLHttpRequest();



});