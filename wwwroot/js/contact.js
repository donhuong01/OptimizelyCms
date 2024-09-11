
$(function () {

    initValidateViews();
    $('#btn_submit').click(function () {
        submitForm();
    });
})

var contact_view = {
    list_input: []
}


function onCaptchaValid() {
    document.getElementById("recaptcha").style.borderColor = 'transparent';
}

function initValidateViews() {
    contact_view.list_input.push(new InputView("txt_name")
        .setValidateCase(
            [{
                type: VALID_CASE.empty,
                message: "Please enter your name"
            },
            {
                type: VALID_CASE.onlyLetterAllowSpacing,
                message: "Only letters allowed",
            }])
    );
    contact_view.list_input.push(new InputView("txt_subject")
        .setValidateCase([{
            type: VALID_CASE.empty,
            message: "Please enter subject"
        }])
    );
    contact_view.list_input.push(new InputView("txt_mobile")
        .setValidateCase([
            {
                type: VALID_CASE.number,
                message: 'Only numbers allowed'
            },
            {
                type: VALID_CASE.func,
                message: "Please provide your mobile number",
                validate: function () {
                    var isValid = !(document.getElementById("txt_mobile").value.trim().length == 0
                        && document.getElementById("txt_email").value.trim().length == 0);
                    if (isValid) {
                        contact_view.list_input[3].setError(null);
                    }
                    return isValid;
                }
            },
            {
                type: VALID_CASE.limit,
                message: 'Please enter 8 digits',
                min: 8,
                max: 8
            }])
    );

    contact_view.list_input.push(new InputView("txt_email")
        .setValidateCase([
            {
                type: VALID_CASE.func,
                message: "Please provide your email",
                validate: function () {
                    var isValid = !(document.getElementById("txt_mobile").value.trim().length == 0
                        && document.getElementById("txt_email").value.trim().length == 0);
                    if (isValid) {
                        contact_view.list_input[2].setError(null);
                    }
                    return isValid;
                }
            }, {
                type: VALID_CASE.email,
                message: 'Please provide a valid email address'
            }, {
                type: VALID_CASE.existed,
                message: "This email has already been registered"
            }]));

    contact_view.list_input.push(new InputView("txt_message")
        .setValidateCase([{
            type: VALID_CASE.empty,
            message: "Please enter your message"
        }, {
            type: VALID_CASE.limit,
            min: 1,
            max: 1000,
            message: "Maximum 1000 characters"
        }]));

    contact_view.list_input.push(new InputView("dropdown_enquiry")
        .setValidateCase([]));


}

function onBEValidateError(result) {
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        switch (key) {
            case "name":
                contact_view.list_input[0].setError(result[key]);
                break;
            case "enquiry":
                contact_view.list_input[5].setError(result[key]);
                break;
            case "subject":
                contact_view.list_input[1].setError(result[key]);
                break;
            case "mobile":
                contact_view.list_input[2].setError(result[key]);
                break;
            case "email":
                contact_view.list_input[3].setError(result[key]);
                break;
            case "message":
                contact_view.list_input[4].setError(result[key]);
                break;
            case "gcaptcha":
                $('#recaptcha').css('border-color', 'red');
                break;
        }
    }
}

function takeFormResult() {
    var result = {
        "full_name": $("#txt_name").val(),
        "subject": $("#txt_subject").val(),
        "mobile_number": "65" + $("txt_mobile").val(),
        "email": $("#txt_email").val(),
        "message": $("#txt_message").val(),
        "enquiry": $("#dropdown_enquiry").val()
    }
    return result;
}

function isFormValid() {
    var isValid = true;
    for (var i = 0; i < contact_view.list_input.length; i++) {
        isValid = !contact_view.list_input[i].isValid() ? false : isValid;
    }
    if (grecaptcha.getResponse().length == 0) {
        $('#recaptcha').css('border-color', 'red');
        if (isValid) {
            app.scrollTo(0, + document.getElementById("panel_form").offsetTop + document.getElementById("recaptcha").offsetTop);
        }
        isVaild = false;
    } else {
        $('#recaptcha').css('border-color', 'transparent');
    }
    return isValid;
}

function submitForm() {
    if (!isFormValid()) {
        return;
    }

    var request_data = takeFormResult();

    var server_dummy_error = {
        // "name": "This is name error",
        // "subject": "This is subject error",
        // "mobile": "This is mobile error",
        // "email": "This is email error",
        // "message": "This is message error",
        // "area": "This is area error",
        // "enquiry": "This is enquiry error"
    }
    onBEValidateError(server_dummy_error);
}