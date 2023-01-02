function toggleModal() {
	var modal = document.getElementById('modalform');
	modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
	var modal = document.getElementById('modalform');
	if (event.target === modal) {
		toggleModal();
	}
}
	
function FormCheck(name) 
{
	var status = true;
		var fields = $(name).find("select, textarea, input").serializeArray();
		$.each(fields, function(i, field) {
			
			
			//console.log(field.name);	
			
			//console.log(field.name+' = '+$('[name="'+field.name+'"]').prop('required'));
			
			//if($('[name="'+field.name+'"]').prop('required') == 'undefined') {
			//	console.log(field.name);	
			//}
			
			if($('[name="'+field.name+'"]').prop('required') == true) {
				if(!field.value) {
					//console.log(field.name);
					status = false;
				}
			}
			
		}); 
	return status;
}

function move_record2(event, table, id1, id2) {
	RunScript('/core/move-record.php', 'id1=' + id1 + '&id2=' + id2 + '&table=' + table + '&event=' + event);
}

function move_record(event, table, id, position) {
	RunScript('/core/move-record.php', 'id=' + id + '&table=' + table + '&event=' + event + '&position=' + position);
}

function sendFile(image_file, target) {
	//alert('!!!!');
	
	if($(target).length == 0) {
		alert('Container ' + container + ' not found!');
		return false;
	}
	
	data = new FormData();
	data.append("image_file", image_file);
	$.ajax({
		data: data,
		type: "POST",
		url: '/core/upload_img.php',
		cache: false,
		contentType: false,
		processData: false,
   		success: function(image_url) {
			$(target).summernote("insertImage", image_url);
   		}
	});
}

function CheckConnect() {
	var status = false;
	arr = GetJSON('/core/check.php', '');
	if (arr.length != 0) {
		if (arr.result == 'ok') {
			status = true;
		}
	}
	return status;
}

function GetJSON(location, param) {
	var res = '';
	$.ajax({
		url: location,
		cache: false,
		type: "POST",
		async: false,
		data: param,
		dataType: 'text',
		beforeSend: function () {},
		success: function (data) {

			if (isJSON(data)) {
				res = JSON.parse(data);
			} else {
				alert('Error JSON format!');
			}
		},
		error: function (jqxhr, status, errorMsg) {
			alert("Статус: " + status + " Ошибка: " + errorMsg);
		}
	});
	return res;
}

function RunScript(Location, Param) {
	var res = '';
	$.ajax({
		url: Location,
		cache: false,
		type: "POST",
		async: false,
		data: Param,
		beforeSend: function () {},
		success: function (data) {
			//alert(data);
			res = data.replace(/^\s+|\s+$/g, '');
		},
		error: function (jqxhr, status, errorMsg) {
			alert("Статус: " + status + " Ошибка: " + errorMsg);
		}
	});
	return res;
}

function isJSON(json) {
	var str = json.toString();
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function SubmitForm(m_url, m_data, m_type) {
	var res = '';
	$.ajax({
		url: m_url,
		data: m_data,
		type: m_type,
		cache: false,
		async: false,
		dataType: 'text',
		success: function (data) {
			if (isJSON(data)) {
				json = JSON.parse(data);
				if (json.result == 'ok') {
					res = 'ok';
				} else {
					swal(json.msg)
				}
			} else {
				alert('Error JSON format!');
			}
		},
		error: function (jqxhr, status, errorMsg) {
			alert("Статус: " + status + " Ошибка: " + errorMsg);
		}
	});
	return res;
}


function LoadForm(link, param, saveurl = false) {
	$.ajax({
		url: link,
		type: 'POST',
		cache: false,
		async: false,
		data: param,
		dataType: 'text',
		beforeSend: function () {
			// Срабатывает перед отправкой данных
			$('#mform').remove();
		},
		success: function (data) {
			if (isJSON(data)) {
				json = JSON.parse(data);
				if (json.result == 'ok') {
					// Данные получены, добавляем в контейнер
					if ((saveurl) && (link != old_url)) {
						window.history.pushState({
							href: link,
							block: ''
						}, '', link);
						old_url = link;
					}
					$('body').append("<div id='mform'>" + json.content + "</div>");
				} else {
					alert('Message = ' + json.msg);
				}
			} else {
				alert('Error JSON format!');
			}
		},
		error: function (jqxhr, status, errorMsg) {
			alert("Статус: " + status + " Ошибка: " + errorMsg);
		}
	});
}

function LoadForm2(link, param, saveurl = false) {
	$.ajax({
		url: link,
		type: 'POST',
		cache: false,
		async: false,
		data: param,
		dataType: 'text',
		beforeSend: function () {
			// Срабатывает перед отправкой данных
			$('#mform').remove();
		},
		success: function (data) {
			// Данные получены, добавляем в контейнер
			if ((saveurl) && (link != old_url)) {
				window.history.pushState({
					href: link,
					block: ''
				}, '', link);
				old_url = link;
			}
			$('body').append("<div id='mform'>" + data + "</div>");
			var closeButton = document.querySelector(".close-button");
			closeButton.removeEventListener('click', toggleModal, false);
			closeButton.addEventListener("click", toggleModal);
			window.removeEventListener('click', windowOnClick, false);
			window.addEventListener("click", windowOnClick);
			$('#modalform').addClass("show-modal");

		},
		error: function (jqxhr, status, errorMsg) {
			alert("Статус: " + status + " Ошибка: " + errorMsg);
		}
	});
}

function GetAjaxContent(geturl, param, container, get_or_post, saveurl = false) {

	if ($(container).length == 0) {
		alert('Container ' + container + ' not found!');
		return false;
	}

	var Speed = 250; // Cкорость затухания, появления контента

	/*
	if(saveurl) {
		window.history.pushState({href: geturl, block: container}, '', geturl);
	}
	*/

	$(container).fadeOut(Speed, function () {
		$.ajax({
			url: geturl,
			type: get_or_post,
			cache: false,
			async: false,
			dataType: 'text',
			data: param,
			beforeSend: function () {
				// Срабатывает перед отправкой данных
				$(container).empty();
			},
			success: function (data) {
				if (data) {
					if (isJSON(data)) {
						res = JSON.parse(data);
						if (res.result == 'ok') {
							// Данные получены, добавляем в контейнер
							$(container).empty().append(res.content);
							$(container).fadeIn(Speed); // Показать контейнер
							if ((saveurl) && (geturl != old_url)) {
								window.history.pushState({
									href: geturl,
									block: container
								}, '', geturl);
								old_url = geturl;
							}
						} else {
							alert('Message = ' + res.msg);
						}
					} else {
						alert('Error JSON format!');
					}
				} else {
					//console.log('Error!'); // Что-то пошло не так!
					alert('Error GetAjaxContent!');
				}
			},
			error: function (jqxhr, status, errorMsg) {
				alert("Статус: " + status + " Ошибка: " + errorMsg);
			}
		});
	});

}