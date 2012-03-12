function parse() {
	$.ajax({
		type : "GET",
		url : "data/data.xml",
		dataType : "xml",
		success : function(xml) {
			var content 	= "";
			content += "<h3>" + $(xml).find("bean[id='bean2']").attr("name") + "</h3>";
			i = 0;
			$(xml).find("bean[id='bean1'] property").each(function() {
				content += "<label>" + $(this).attr("name") + "</label>";
				content += "<select name='prop" + i++ + "'>";
				$(this).find("map entry").each(function() {
					content += "<option value='" + $(this).attr('value') + "'>";
					content += $(this).attr('key');
					content += "</option>";
				});
				content += "</select><br/>";
			});
			$("#content").html(content);
		}
	});
}