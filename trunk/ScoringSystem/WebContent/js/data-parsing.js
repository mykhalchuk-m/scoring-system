function parse(beanId) {
	$.ajax({
		type : "GET",
		url : "data/data.xml",
		dataType : "xml",
		success : function(xml) {		
			var defaultValue = 42;
			var defaultText = '-- Оберіть варіант --';
			var content = "";
			var i = 0;

			content += "<form id='form-step" + beanId + "'><fieldset><legend>" + $(xml).find("bean[id='bean" + beanId + "']").attr("name") + "</legend>";

			$(xml).find("bean[id='bean" + beanId + "'] property").each(function() {
				content += "<label for='field" + ++i + "' class='col_4'>" + $(this).attr("name") + "</label>";
				content += "<select class='fancy col_7' id='field" + i + "' name='prop" + i + "'>";
				content += "<option value='" + defaultValue + "'>" + defaultText + "</option>";
				$(this).find("map entry").each(function() {
					content += "<option value='" + $(this).attr('value') + "'>";
					content += $(this).attr('key');
					content += "</option>";
				});
				content += "</select>";
			});
			content += "</fieldset>";
			content += "<button type='submit'>Далі<span class='icon' data-icon='}'/></button></form>";
			
			$("#tabr" + beanId).html(content);
		}
	});
}


