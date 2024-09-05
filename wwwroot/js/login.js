var login_views = {
    views_input: []
}

$(function () {
    login_views.views_input
        .push(new InputView("txt_phone")
            .setValidateCase([
                {
                    type: VALID_CASE.empty,
                    message: "Please enter a valid mobile no"
                },
                {
                    type: VALID_CASE.number,
                    message: 'Please enter a valid mobile no.'
                },
                {
                    type: VALID_CASE.func,
                    message: "Please enter a valid mobile no",
                    validate: function () {
                        var value = document.getElementById("txt_phone").value;
                        if (value.length == 0) {
                            return true;
                        }
                        if (value.length > 0 && (value.charAt(0) == "8" || value.charAt(0) == "9")) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    type: VALID_CASE.limit,
                    message: 'Please enter a valid mobile no',
                    min: 8,
                    max: 8
                }
            ]));
    login_views.views_input
        .push(new InputView("txt_password")
            .setValidateCase([
                {
                    type: VALID_CASE.empty,
                    message: "Password requires one uppercase, one lowercase and one symbol from !@#$%^&()*"
                },
                {
                    type: VALID_CASE.func,
                    message: "Password requires one uppercase, one lowercase and one symbol from !@#$%^&()*",
                    validate: function () {
                        var regEx = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{1,16})";
                        var value = document.getElementById("txt_password").value.trim();
                        return new RegExp(regEx).test(value);
                    }
                }
            ]));
    $('#btn_login').click(function () {
        onLoginClicked($('#txt_phone').val(), $('#txt_password').val());
        return true;
    });

});

function isValid() {
    var isValid = true;
    for (var i = 0; i < login_views.views_input.length; i++) {
        isValid = !login_views.views_input[i].isValid() ? false : isValid;
    }
    return isValid;
}

function onLoginClicked(user, pass) {
    if (!isValid()) {
        return;
    }

}

/**
 * set null to hide error
 * @param {string} message
 */
function showOtherError(message) {
    if (message && message.length > 0) {
        document.getElementById("lb_ext_error").style.display = 'block';
        document.getElementById("lb_ext_error").innerHTML = message;
    } else {
        document.getElementById("lb_ext_error").innerHTML = "";
        document.getElementById("lb_ext_error").style.display = 'none';

    }
}


function onBEValidateError(result) {
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        switch (key) {
            case "phone":

                var message = result[key];

                if (message == 'Member not active') {
                    showOtherError("Dear user,<br/>" +
                        "Your account has been locked due to security reasons. Please write in to enquiries@member.lendleaseplus.com for more information")
                } else if (message == 'Member not register') {
                    location.href = '/register-user?mobile=' + $("#txt_phone").val();
                } else if (message == "Need Reset password") {
                    location.href = "/login/reset-password?mobile=" + $("#txt_phone").val();
                } else {
                    login_views.views_input[0].setError(result[key]);
                }


                break;
            case "password":
                login_views.views_input[1].setError(result[key]);
                break;
        }
    }
}
