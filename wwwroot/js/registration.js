const EXPIRE_TIME = 60;


var regis_views = {
	view_inputs: []
}

var arrayTxtSms = [];
var cursor_txt = 0;
$(function () {
	var itvCountdown = null;

	$('#btn_submit').click(function () {
		if (isFormValid()) {
			//TODO: request OTP
			onSendOTP();
		}
	});

	$('#btn_close_verify').click(function () {
		if (itvCountdown) {
			clearInterval(itvCountdown);
		}
		$('#ll_dialog_verify').removeClass("fade_in").addClass("fade_out");
		setTimeout(function () {
			$('#ll_dialog_verify').hide();
			arrayTxtSms[0].value = "";
			arrayTxtSms[1].value = "";
			arrayTxtSms[2].value = "";
			arrayTxtSms[3].value = "";
		}, 300);
	});

	$('#btn_resend').click(function () {
		onSendOTP();
	});

	$('#btn_submit_code').click(function () {
		var code = "";
		for (var i = 0; i < arrayTxtSms.length; i++) {
			code += arrayTxtSms[i].value;
		}
		onSubmitSmsCode(code);
	})

	function executeCountdown() {
		if (itvCountdown) {
			clearInterval(itvCountdown);
		}
		var lb_countdown = document.getElementById("lb_countdown");
		var count = EXPIRE_TIME;
		lb_countdown.innerHTML = count;
		itvCountdown = setInterval(function () {
			count--;
			if (count < 0) {
				clearInterval(itvCountdown);
				itvCountdown = null;
				return;
			}
			lb_countdown.innerHTML = count;
		}, 1000);
	}

	$('#cb_term').change(function () {
		$(this).removeClass("error");
	});
	$('#cb_marketing').change(function () {
		$(this).removeClass("error");
	});


	initInputView();
})


function initInputView() {
	arrayTxtSms = [
		document.getElementById("txt_code_1"),
		document.getElementById("txt_code_2"),
		document.getElementById("txt_code_3"),
		document.getElementById("txt_code_4"),
		document.getElementById("txt_code_5"),
		document.getElementById("txt_code_6")];

	var max_dob = new Date(), min_dob = new Date();
	min_dob.setFullYear(min_dob.getFullYear() - 100);
	max_dob.setFullYear(max_dob.getFullYear() - 16);

	//	$('#txt_dob').datepicker({
	//		dateFormat: 'dd-mm-yy',
	//		changeMonth: true,
	//		changeYear: true,
	//		yearRange: min_dob.getFullYear() + ":",
	//		maxDate: max_dob,
	//		onSelect: function (date) {
	//			regis_views.view_inputs[2].isValid();
	//		}
	//	});

	regis_views.view_inputs.push(new InputView("txt_given_name").setValidateCase(
		[{
			type: VALID_CASE.empty,
			message: 'Please enter your first name',
		},
		{
			type: VALID_CASE.limit,
			message: 'Please enter your first name',
			min: 1,
			max: 191
		}]
	));
	regis_views.view_inputs.push(new InputView("txt_famity_name").setValidateCase(
		[{
			type: VALID_CASE.empty,
			message: 'Please enter your last name'
		},
		{
			type: VALID_CASE.limit,
			message: 'Please enter your last name',
			min: 1,
			max: 191
		}]
	));

	//	regis_views.view_inputs.push(new InputView("txt_dob").setValidateCase(
	//			[{
	//					type: VALID_CASE.empty,
	//					message: "Please enter a date of birth"
	//				}, {
	//					type: VALID_CASE.func,
	//					message: "Cannot select a date younger than 16",
	//					validate: function () {
	//						var dob = $('#txt_dob').datepicker('getDate');
	//						var now = new Date();
	//						now.setFullYear(now.getFullYear() - 16)
	//						return dob <= now;
	//					}
	//				}]
	//			));

	regis_views.view_inputs.push(new InputView("txt_mobile").setValidateCase(
		[{
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
				var value = document.getElementById("txt_mobile").value;
				if (value.length == 0) {
					return true;
				}
				if (value.length > 0 && (value.charAt(0) == "8" || value.charAt(0) == "9")) {
					return true;
				}
				else {
					return false;
				}
			}
		},
		{
			type: VALID_CASE.limit,
			message: 'Please enter a valid mobile no',
			min: 8,
			max: 8
		}]
	));

	regis_views.view_inputs.push(new InputView("txt_email").setValidateCase(
		[{
			type: VALID_CASE.empty,
			message: "Please provide your email"
		}, {
			type: VALID_CASE.email,
			message: 'Please enter a valid email address'
		}]
	));

	//	regis_views.view_inputs.push(new InputView("txt_postal").setValidateCase(
	//			[{
	//					type: VALID_CASE.empty,
	//					message: "Invalid postal code"
	//				},
	//				{
	//					type: VALID_CASE.limit,
	//					min: 6,
	//					max: 6,
	//					message: "Invalid postal code"
	//				}]
	//			));

	//	regis_views.view_inputs.push(new InputView("txt_vehicle_number").setValidateCase(
	//			[{
	//					type: VALID_CASE.func,
	//					message: "Invalid vehicle number",
	//					validate: function () {
	//						var val = document.getElementById("txt_vehicle_number").value.trim();
	//						if (val.length > 0 && (val.length >= 3 && val.length <= 10)) {
	//							return true;
	//						}
	//						else if (val.length > 0) {
	//							return false;
	//						}
	//						else {
	//							return true;
	//						}
	//					}
	//				},
	//				{
	//					type: VALID_CASE.func,
	//					message: "Invalid vehicle number",
	//					validate: function () {
	//						if (document.getElementById("txt_vehicle_number").value.length == 0
	//								&& document.getElementById("txt_ui_number").value.length > 0) {
	//							return false;
	//						}
	//						else if (document.getElementById("txt_vehicle_number").value.length == 0 &&
	//								document.getElementById("txt_ui_number").value.length == 0) {
	//							regis_views.view_inputs[6].setError(null);
	//							regis_views.view_inputs[7].setError(null);
	//							return true;
	//						}
	//						else {
	//							return true;
	//
	//						}
	//					}
	//				}, ]
	//			));

	//	regis_views.view_inputs.push(new InputView("txt_ui_number").setValidateCase(
	//			[
	//				{
	//					type: VALID_CASE.number,
	//					message: 'Invalid IU number'
	//				},
	//				{
	//					type: VALID_CASE.func,
	//					message: "Invalid IU number",
	//					validate: function () {
	//						var val = document.getElementById("txt_ui_number").value.trim();
	//						if (val.length > 0 && val.length != 10) {
	//							return false;
	//						}
	//						else {
	//							return true;
	//						}
	//					}
	//				},
	//				{
	//					type: VALID_CASE.func,
	//					message: "Invalid IU number",
	//					validate: function () {
	//						if (document.getElementById("txt_vehicle_number").value.length > 0
	//								&& document.getElementById("txt_ui_number").value.length == 0) {
	//							return false;
	//						}
	//						else if (document.getElementById("txt_vehicle_number").value.length == 0 &&
	//								document.getElementById("txt_ui_number").value.length == 0) {
	//							regis_views.view_inputs[6].setError(null);
	//							regis_views.view_inputs[7].setError(null);
	//							return true;
	//						}
	//						else {
	//							return true;
	//
	//						}
	//					}
	//				}]
	//			));

	regis_views.view_inputs.push(new InputView("txt_password")
		.setValidateCase([
			{
				type: VALID_CASE.empty,
				message: "Please enter new password"
			},
			{
				type: VALID_CASE.func,
				message: "Password is too short",
				validate: function () {
					var value = document.getElementById("txt_password").value.trim();
					return value.length >= 8;
				}
			},
			{
				type: VALID_CASE.func,
				message: "Password is too long",
				validate: function () {
					var value = document.getElementById("txt_password").value.trim();
					return value.length <= 16;
				}
			},
			{
				type: VALID_CASE.func,
				message: "Password requires one uppercase, one lowercase and one special character from !@#$%^&()*",
				validate: function () {
					var regEx = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)])(?=.{8,})";
					var value = document.getElementById("txt_password").value.trim();
					return new RegExp(regEx).test(value);
				}
			}
		]));
	regis_views.view_inputs.push(new InputView("txt_confirm_pass")
		.setValidateCase([
			{
				type: VALID_CASE.empty,
				message: "Please enter password again"
			},
			{
				type: VALID_CASE.func,
				message: "Password does not match",
				validate: function () {
					return $("#txt_password").val().trim() == $("#txt_confirm_pass").val().trim()
				}
			}
		]));


	var onOTPKeyUp = function (e) {
		cursor_txt = arrayTxtSms.indexOf(this);
		if (e.keyCode == 8 && cursor_txt > 0) {
			this.value = "";
			cursor_txt--;
			arrayTxtSms[cursor_txt].focus();
		}
	}

	var onOTPKeyDown = function (e) {
		if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8) {
			return false;
		}
		if (e.keyCode != 8 && this.value.length > 1) {
			return false;
		}
		else if (e.keyCode != 8) {
			if (this.value.length == 0) {
				if (cursor_txt < arrayTxtSms.length && this.value.length >= 1) {
					cursor_txt++;
					arrayTxtSms[cursor_txt].focus();
				}
			}
			else {
				if (cursor_txt < arrayTxtSms.length - 1 && this.value.length >= 1) {
					cursor_txt++;
					arrayTxtSms[cursor_txt].focus();
				}
				else if (e.keyCode == 13 && this === arrayTxtSms[3]) {
					$('#btn_submit_code').click();
				}
				else if (cursor_txt == arrayTxtSms.length - 1 && this.value.length > 0) {
					return false;
				}
			}
		}
	}





	$('#cb_marketing').change(function () {
		if ($(this).prop("checked")) {
			$('#cb_email').prop("checked", true).prop("disabled", false);
			$('#cb_mobile').prop("checked", true).prop("disabled", false);
			$('#cb_mail').prop("checked", true).prop("disabled", false);
		}
		else {
			$('#cb_email').prop("checked", false).prop("disabled", true);
			$('#cb_mobile').prop("checked", false).prop("disabled", true);
			$('#cb_mail').prop("checked", false).prop("disabled", true);
		}
	});

	document.getElementById("txt_dob").onfocus = function () {
		setTimeout(() => {
			document.getElementById("txt_dob").blur();

		}, 10);
	}

	arrayTxtSms[0].onkeydown = onOTPKeyDown;
	arrayTxtSms[0].onkeyup = onOTPKeyUp;
	arrayTxtSms[1].onkeydown = onOTPKeyDown;
	arrayTxtSms[1].onkeyup = onOTPKeyUp;
	arrayTxtSms[2].onkeydown = onOTPKeyDown;
	arrayTxtSms[2].onkeyup = onOTPKeyUp;
	arrayTxtSms[3].onkeydown = onOTPKeyDown;
	arrayTxtSms[3].onkeyup = onOTPKeyUp;
	arrayTxtSms[4].onkeydown = onOTPKeyDown;
	arrayTxtSms[4].onkeyup = onOTPKeyUp;
	arrayTxtSms[5].onkeydown = onOTPKeyDown;
	arrayTxtSms[5].onkeyup = onOTPKeyUp;
}

function isFormValid() {
	var isValid = true;
	for (var i = 0; i < regis_views.view_inputs.length; i++) {
		isValid = !regis_views.view_inputs[i].isValid() ? false : isValid;
	}
	// if (!$('#cb_marketing').prop("checked")) {
	//     isValid = false;
	//     $('#cb_marketing').addClass("error");
	// } else {
	//     $('#cb_marketing').removeClass("error");
	//
	// }
	if (!$('#cb_term').prop("checked")) {
		isValid = false;
		$('#lb_term_error').show();
		$('#cb_term').addClass("error");
	}
	else {
		$('#lb_term_error').hide();
		$('#cb_term').removeClass("error");
	}

	if (grecaptcha.getResponse().length == 0) {
		$('#recaptcha').addClass('error');
		isValid = false;
	}
	else {
		$('#recaptcha').removeClass('error');
	}

	// check referral code & promo code
	// can have only one each time
	if (!validatePromoReferralCode()) {
		isValid = false;
	}

	return isValid;
}

function takeFormResult() {
	return {
		name: $('#txt_given_name').val(),
		surname: $('#txt_famity_name').val(),
		//gender: $('#dropdown_gender').val(),
		//dob: $('#txt_dob').val(),
		mobileNo: $('#txt_mobile').val(),
		mobile_country_prefix: $('input[name=mobile_country_prefix]').val(),
		email: $('#txt_email').val(),
		//vehicle_no: $('#txt_vehicle_number').val(),
		//iu: $('#txt_ui_number').val(),
		allow_term: $('#cb_term').prop("checked") ? 1 : 0,
		allow_marketing: $('#cb_marketing').prop("checked") ? 1 : 0,
		mobile_verification_otp: $("input[name=otp_code]").val(),
		password: $('#txt_password').val(),
		repassword: $('#txt_confirm_pass').val(),
		//postalCode: $('#txt_postal').val(),
		promotionCode: $('#txt_promo').val(),
		referralCode: $('#txt_referral').val(),
		gcaptcha: grecaptcha.getResponse(),
		third_party_login_id: $("input[name=third_party_login_id]").val(),
		mkt_email: $("#cb_email").prop("checked") ? 1 : 0,
		mkt_mobile: $("#cb_mobile").prop("checked") ? 1 : 0,
		mkt_mail: $("#cb_mail").prop('checked') ? 1 : 0
	};
}

function onBEValidateError(result) {
	console.log(regis_views.view_inputs);
	var keys = Object.keys(result);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		switch (key) {
			case "given_name":
				regis_views.view_inputs[0].setError(result[key]);
				break;
			case "family_name":
				regis_views.view_inputs[1].setError(result[key]);
				break;
			case "date_of_birth":
				regis_views.view_inputs[2].setError(result[key]);
				break;
			case "mobile":
				regis_views.view_inputs[3].setError(result[key]);
				break;
			case "email":
				regis_views.view_inputs[4].setError(result[key]);
				break;
			case "vehicle_no":
				regis_views.view_inputs[6].setError(result[key]);
				break;
			case "iu":
				regis_views.view_inputs[7].setError(result[key]);
				break;
			case "password":
				regis_views.view_inputs[9].setError(result[key]);
				break;
			case "repassword":
				regis_views.view_inputs[10].setError(result[key]);
				break;
			case "postal_code":
				regis_views.view_inputs[5].setError(result[key]);
				break;
			case "allow_term":
				$('#cb_term').addClass("error");
				break;
			case "allow_marketing":
				$('#cb_marketing').addClass("error");
				break;
			case "gcaptcha":
				$('#recaptcha').css('border-color', 'red');
				break;
			default:
				$('#ll_dialog_verify').removeClass("fade_in").addClass("fade_out").hide();
				$('#lb_ext_error').text(result[key]).show();
				break;
		}
	}
}

function setFormData(profile_info) {
	$('#txt_given_name').val("Given name");
	$('#txt_famity_name').val("Family name");
	$('#dropdown_gender').val('f');
	$('#txt_dob').val('01/02/1980');
	$('#txt_mobile').val('92312311');
	$('#txt_email').val('1231@abc.com');
	$('#txt_address').val('address');
	$('#txt_vehicle_number').val('123456789');
	$('#txt_ui_number').val('1234556788');
}


function submitForm() {
	if (!isFormValid()) {
		return;
	}

	var request = takeFormResult();
	// var dummy = {
	//     "given_name": "",
	//     "family_name": "",
	//     "dob": "",
	//     "mobile": "",
	//     "email": "",
	//     "address": "",
	//     "ui_number": "",
	//     "allow_term": "",
	//     "allow_marketing": "",
	//     "gcaptcha": "",
	// }
	// onBEValidateError(dummy);

	$.request("SignUp::onSubmit", {
		data: request,
		error: function (response) {
			console.log(response);
			var error_keys = Object.keys(response.responseJSON.X_OCTOBER_ERROR_FIELDS);
			if (error_keys.indexOf("mobile_verification_otp") != -1) {
				$("#otp_message").text(response.responseJSON.X_OCTOBER_ERROR_FIELDS.mobile_verification_otp).show();
			}
			else {
				$('#ll_dialog_verify').removeClass("fade_in").addClass("fade_out").hide();
				$('#lb_ext_error').text(response.responseJSON.X_OCTOBER_ERROR_MESSAGE).show();
			}

			// check referral code & promo code
			// can have only one each time
			if (error_keys.indexOf("promo_referral_code") != -1) {
				validatePromoReferralCode();
			}
		}
	});
}

function onSubmitSmsCode(otp_code) {
	$("input[name=otp_code]").val(otp_code);
	if (isFormValid()) {
		submitForm();
	}
}

function onSendOTP() {
	var request = takeFormResult();
	request.mobile = $("#txt_mobile").val();
	$.request("SignUp::onSendOtp", {
		data: request,
		success: function (response) {
			showOTPBox(response);
		},
		error: function (response) {
			onBEValidateError(response.responseJSON.X_OCTOBER_ERROR_FIELDS);
		}
	});
}

function showOTPBox(otp) {
	if ($('#ll_dialog_verify').is(":visible")) {
	}
	else {
		$('#ll_dialog_verify').removeClass("fade_out").addClass("fade_in").show();

	}

	$("#ll_dialog_verify #otp_message").text(otp.result).show();
	setTimeout(function () {
		$("#ll_dialog_verify #otp_message").hide();
	}, 10000);


	arrayTxtSms[0].value = "";
	arrayTxtSms[1].value = "";
	arrayTxtSms[2].value = "";
	arrayTxtSms[3].value = "";
	arrayTxtSms[4].value = "";
	arrayTxtSms[5].value = "";
	arrayTxtSms[0].focus();
}

function onCaptchaValid() {
	$('#recaptcha').removeClass('error');
}

function validatePromoReferralCode() {
	var $el = $('#txt_promo');
	var $el2 = $('#txt_referral');
	if ($el.val().length && $el2.val().length) {
		$('#lb_promo_error').show();
		$($el, $el2).addClass('error');
		return false;
	}

	$('#lb_promo_error').hide();
	$($el, $el2).removeClass('error');
	return true;
}