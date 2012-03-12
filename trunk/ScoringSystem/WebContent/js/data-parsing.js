function parse() {
	$.ajax({
		type : "GET",
		url : "data1.xml",
		dataType : "xml",
		success : function(xml) {
			alert(9);
			alert(xml);
			alert(1);
		}
	});
}