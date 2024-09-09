var forgot_pass_views = {
    views_input: []
}

$(function () {
    forgot_pass_views.views_input
        .push(new InputView("txt_mobile")
            .setValidateCase([
                {
                    type: VALID_CASE.empty,
                    message: "Please enter your phone number"
                },
                {
                    type: VALID_CASE.number,
                    message: 'Please provide a valid phone number'
                }
            ]));
    $('#btn_reset').click(function () {
        return onResetClicked($('#txt_mobile').val());
    });

});

function isValid() {
    var isValid = true;
    for (var i = 0; i < forgot_pass_views.views_input.length; i++) {
        isValid = !forgot_pass_views.views_input[i].isValid() ? false : isValid;
    }
    return isValid;
}

function onResetClicked(email) {
    if (!isValid()) {
        return false;
    }

    // Backend validation
    // var backend_error_mail = "";
    // forgot_pass_views.views_input[0].setError(backend_error_mail);
    // return false;
}

function onBEValidateError(result) {
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        switch (key) {
            case "mobile":
                forgot_pass_views.views_input[0].setError(result[key]);
                break;
        }
    }
}

function onFacebookClicked() {
}

function onForgotPassClicked() {
}