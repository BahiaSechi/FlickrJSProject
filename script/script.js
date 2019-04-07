$(document).ready(function() {

    const flickrAPIKey = "721be46bb63a5e6608c293a45c7888bd";
    const title = $("#commune").val();
    const nb_photos = $("#nb_photos").val();


    //Gestion des tabs
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('courant');
        $('.tab-content').removeClass('courant');

        $(this).addClass('courant');
        $("#"+tab_id).addClass('courant');
    });

    $("#submit").click(function () {

        let photoQueryURL = 'https://api.flickr.com/services/rest/?' + $.param({
            'method': 'flickr.photos.search',
            'api_key': flickrAPIKey,
            'text': title,
            'tags': title,
            'format': 'json',
            'nojsoncallback': '1'
        });

        $.ajax(photoQueryURL)
            .done(function (data) {

                /**if (nb_photos >= 1) {*/

                    for (i = 0; i < nb_photos; i++) {

                        const json = JSON.parse(JSON.stringify(data));

                        const photo = json.photos.photo;

                        let photo_farm = photo[i].farm;
                        let photo_id = photo[i].id;
                        let photo_secret = photo[i].secret;
                        let photo_server = photo[i].server;

                        let photo_url = `https://farm` + photo_farm + `.staticflickr.com/` + photo_server + `/` + photo_id + `_` + photo_secret + `.jpg`;

                        console.log(photo_url);

                        $("#tab-photo").append(`<img src="${photo_url}" alt="photo"> <br> <br>`);
                    }
                /**} else {
                    $( function() {
                        $("#dialog").dialog(dialog(
                            {
                                modal: true
                            })
                        );
                    });
                }*/
                console.log(data);
            })
            .fail(function (err) {
                console.log('Failed query.');
                console.log(err);
            });

    });
});