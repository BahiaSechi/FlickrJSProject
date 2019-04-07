$(document).ready(function() {

    const api_key = "721be46bb63a5e6608c293a45c7888bd";
    const api_key_secret = "217f8c95e04dfb8d";
    const urlNantes = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=90088c1a8f165876785c6e57de1a785b&tags=nantes&format=json&nojsoncallback=1&auth_token=72157704379938022-a944c67750718458&api_sig=60c4c5a99b69b19ff7b2d99a8f6ff885";

    //Gestion des tabs
    $('ul.tabs li').click(function(){
        let tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('courant');
        $('.tab-content').removeClass('courant');

        $(this).addClass('courant');
        $("#"+tab_id).addClass('courant');
    });

    //$("#date").datepicker();

    //Gestion autocomplete
    let bdVilles;

    $.ajax({
        url : "https://api.flickr.com/services/rest/?method=flickr.places.getTopPlacesList&format=json&api_key="+ api_key +"&place_type_id=7",
        type : "POST",
        dataType : "text",
        success : function (data) {

            let s = data.substring(14,data.length-1);
            let parse = JSON.parse(s);
            bdVilles=$.map(parse.places.place, function (woe_name) {
                return woe_name.woe_name;
            });
            //console.log(parse.places.place[index].woe_name)
            console.log(bdVilles);
            $("#commune").autocomplete({source : bdVilles})
        }
    });



    //Gestion des appels de photos


    let table = $("table").DataTable({
        "columns" : [
            {"data" : "Photo"},
            {"data" : "Photographe"}
        ]
    });

    $("#submit").click(function () {
        $.ajax({
            url:  "https://api.flickr.com/services/rest/?method=flickr.places.find&format=json&api_key="+ api_key + "&query="+ $("#commune").val(),
            type: "POST",
            dataType: "text",
            success : function (data) {
                let s = data.substring(14,data.length-1);
                let parse = JSON.parse(s);
                if (parse.places.place.length===0){
                    $("#rien").dialog();

{}                } else {
                    let lieu = parse.places.place[0].place_id;
                    $.ajax({
                        url : "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key="+ api_key +"&place_id"+ lieu +"&tags="+ $("#commune").val()+"&min_taken_date="+$("#date").val(),
                        type : "POST",
                        dataType : "text",
                        success : function (data) {
                            let s = data.substring(14,data.length-1);
                            let parse = JSON.parse(s);
                            let photos = parse.photos.photo;
                            $("#tab-photo").empty();
                            table.clear();
                            if (photos.length===0){
                                $("#rien").dialog();
                            } else {
                                //$("#tab-photo").css({"display":"flex","flex-direction":"column"});
                                $.each(photos, function (index) {
                                    if (index<$("#nb_photos").val()){
                                        $("#tab-photo").append("<div id='"+ index +"'></div>");
                                        $("#"+index).append("<img src='https://farm"+ photos[index].farm +".staticflickr.com/"+ photos[index].server +"/"+ photos[index].id +"_"+ photos[index].secret +".jpg' alt='Image non chargée'/>");
                                        //$("tbody").append("<tr id='tr"+ index +"'><td><img src='https://farm"+ photos[index].farm +".staticflickr.com/"+ photos[index].server +"/"+ photos[index].id +"_"+ photos[index].secret +".jpg' alt='Image non chargée'/></td></tr>");
                                        $("#text"+index).css("display","none");
                                        $.ajax({
                                            url : "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&api_key="+ api_key + "&photo_id="+ photos[index].id +"&secret="+ photos[index].secret,
                                            type : "POST",
                                            dataType : "text",
                                            success : function (data) {
                                                let s = data.substring(14, data.length - 1);
                                                let parse = JSON.parse(s);
                                                let info = parse.photo;
                                                $("#" + index).append("<div style='display: none' id='text" + index + "'></div>");
                                                let dialog = $("#text" + index);
                                                dialog.text("Photographe : " + info.owner.realname + "\nTitre : " + info.title._content);
                                                //$("#tr"+index).append("<td>"+info.owner.realname+"</td>");
                                                table.row.add({
                                                    "Photo": "<img src='https://farm"+ photos[index].farm +".staticflickr.com/"+ photos[index].server +"/"+ photos[index].id +"_"+ photos[index].secret +".jpg' alt='Image non chargée'/>",
                                                    "Photographe": info.owner.realname
                                            }).draw();
                                            }
                                        });
                                        $("#"+index).click(function () {
                                            let dialog = $("#text" + index);
                                            dialog.dialog({ autoOpen: false });
                                            dialog.dialog('open');
                                        });

                                    }
                                });
                            }
                        },

                        error: function(resultat,statut,erreur){
                            console.log(erreur);
                            alert("erreur");
                        },
                    })
                }
            }
            }
        );
    });

});