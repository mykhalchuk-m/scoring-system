function getSum() {
	var sum = 0;
	$.each($("form select[name^='prop']"), function() {
        var value = +$(this).find("option:selected").val();
        if(value) {
            sum += value;
        };
    });
	return sum.toFixed(1);
}

function getResultData() {
	$.ajax({
		type : "GET",
		url : "data/result.xml",
		dataType : "xml",
		success : function(xml) {
			var sum = getSum();
			$(xml).find("bean").each(function(index){
				var min = +$(this).find("property[name='minValue']").attr("value");
				var max = +$(this).find("property[name='maxValue']").attr("value");
				if (!max && min && sum > min){
					// A
					generateContent($(this), sum);
				} else if (min && max && sum < max && sum > min) {
					// B, C, D
					generateContent($(this), sum);
				} else if (!min && max && sum < max) {
					// d
					generateContent($(this), sum);
				}
			});
		}
    });
}

function generateContent(xmlBean, sum) {
	$("div.counter p.yoursum").html(sum);
	$("div.counter p.customerClass").html(xmlBean.attr("name"));
	$("div.counter p.decsription").html(xmlBean.find("property[name='desription']").attr("value"));
}