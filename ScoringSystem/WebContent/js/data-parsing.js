function parse(beanId) {
	$.ajax({
		type : "GET",
		url : "data/data.xml",
		dataType : "xml",
		success : function(xml) {		
			var defaultValue = 42;
			var defaultText = '-- Оберіть варіант --';
			var content = "";
			var lastBeanId = 3;
			var i = 0;

			content += "<form id='form-step" + beanId + "'><fieldset><legend>" + $(xml).find("bean[id='bean" + beanId + "']").attr("name") + "</legend>";
			content += "<input class='current-step' type='hidden' value='" + beanId + "'/>";
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
			
			content += "<br/><ul class='button-bar'>";
			if(beanId != 1) {
				content += "<li class='previous'><a href='#'><span class='icon medium' data-icon='{'></span>Назад</a></li>";
			}
			if(beanId != lastBeanId) {
				content += "<li class='next'><a href='#'><span class='icon medium' data-icon='}'></span>Далі</a></li>";
			}
			if(beanId == lastBeanId) {
				content += "<li class='next'><a href='#'><span class='icon medium' data-icon='}'></span>Результат</a></li>";
			}
			content += "</ul></fieldset></form>";
			
			$("#tabr" + beanId).html(content);
		}
	});
}


