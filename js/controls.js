$(document).ready(function() {

    $('#btn_tipo_1').click(function() {
        $('#map').show();
        $('#listado').hide();
        $('.mobile-menu').css('background-color', 'transparent');
        google.maps.event.trigger(map, "resize");
    });
    $('#btn_tipo_2').click(function() {
        $('#map').hide();
        $('#listado').show();
        $('.mobile-menu').css('background-color', 'white');
    });

});