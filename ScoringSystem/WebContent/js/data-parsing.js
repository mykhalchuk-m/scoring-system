function parse(k) {
	$.ajax({
		type : "GET",
		url : "data/data.xml",
		dataType : "xml",
		success : function(xml) {
			var content 	= "";
			content += "<fieldset><legend>" + $(xml).find("bean[id='bean" + k + "']").attr("name") + "</legend>";
			i = 0;
			$(xml).find("bean[id='bean" + k + "'] property").each(function() {
				content += "<label for='fild" + i++ + "' class='col_4'>" + $(this).attr("name") + "</label>";
				content += "<select class='fancy col_7' id='fild" + i + "' name='prop" + i + "'>";
				$(this).find("map entry").each(function() {
					content += "<option value='" + $(this).attr('value') + "'>";
					content += $(this).attr('key');
					content += "</option>";
				});
				content += "</select>";
			});
			content += "</fieldset>";
			content += "<button id='submit' type='submit'>Далі<span class='icon' data-icon='}'/></button>";
			$("#form-step").html(content);
		}
	});
}