
$(function () {

    llSliderShow("ll-banner");
    // llSliderShow("ll-promo-list");
    // llSliderShow("ll-event-list");

    $('#btn_promotion').click(function () {
        $('#btn_event').removeClass("selected");
        $('#btn_promotion').addClass("selected");
        $('#ll-promo-list').show();
        $('#ll-event-list').hide();
    });

    $('#btn_event').click(function () {
        $('#btn_promotion').removeClass("selected");
        $('#btn_event').addClass("selected");
        $('#ll-promo-list').hide();
        $('#ll-event-list').show();
    });
});