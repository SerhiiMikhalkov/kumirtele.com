"use strict";
(function ($) {
	$.fn.initForm = function (options) {
		var settings = $.extend({
			type: 'post',
			serverUrl: '#',
			successClean: this.find('.form-success-clean'),
			successGone: this.find('.form-success-gone'),
			successInvisible: this.find('.form-success-invisible'),
			successVisible: this.find('.form-success-visible'),
			textFeedback: this.find('.form-text-feedback'),
		}, options);
		var $ajax = {
			sendRequest: function (p) {
				var form_fill = $(p);
				var form_inputs = form_fill.find(':input');
				var form_data = {};
				form_inputs.each(function () {
					form_data[this.name] = $(this).val();
				});
				$.ajax({
					url: settings.serverUrl,
					type: settings.type,
					data: form_data,
					dataType: 'json',
					success: function (data) {
						if (data && !data.error) {
							settings.successClean.val("");
							settings.successInvisible.addClass('invisible');
							settings.successGone.addClass('gone');
							settings.successVisible.removeClass('invisible');
							settings.successVisible.removeClass('gone');
							console.log('Request sent successfully');
						} else {
							settings.textFeedback.removeClass('gone');
							settings.textFeedback.removeClass('invisible');
							settings.textFeedback.html('Error when sending request.');
							console.log('Could not process AJAX request to server');
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						settings.textFeedback.removeClass('gone');
						settings.textFeedback.removeClass('invisible');
						settings.textFeedback.html('Error when sending request.');
						console.log('ajax error');
					}
				});
			}
		};
		if (jQuery.validator) {
			jQuery.validator.setDefaults({
				success: "valid"
			});
			this.validate({
				rules: {
					field: {
						required: true,
						email: true
					}
				}
			});
		}
		this.submit(function (event) {
			console.log('Send request');
			event.preventDefault();
			if (jQuery.validator) {
				if ($(this).valid()) {
					$ajax.sendRequest(this);
				}
			} else {
				$ajax.sendRequest(this);
			}
		});
	};
}(jQuery));