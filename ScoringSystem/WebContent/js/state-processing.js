function serializeObject(form)
{
    var o = {};
    var a = form.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function saveFormState(form) {
	$.Storage.set(form.attr("id"), JSON.stringify(serializeObject(form)));
}

function restoreFormState() {
	$("form").each(function(){
		var form = $(this)	;
		var formJSON = $.parseJSON($.Storage.get($(this).attr("id")));
		if (formJSON) {
			$.each(formJSON, function(i, el) {
				var fel = form.find('select[name="' + i + '"]');
				if (fel.length > 0) {
					$(fel).val(el);
				}
			});
		}
	});
}

function setClearData(form) {
	form.find(".clear-data").bind('click', function(e) {
		$("form").each(function(){
			$.Storage.remove($(this).attr("id"));
		});
	});
}
