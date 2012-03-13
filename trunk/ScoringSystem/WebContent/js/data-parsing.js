var lastBeanId = 3;
var defaultText = '-- Оберіть варіант --';

function parse() {
	$.ajax({
		type : "GET",
		url : "data/data.xml",
		dataType : "xml",
		success : callback    
	});
}

function callback(xml) {
    createContent(xml);
    initKick();
    setCounter();
    
	var form = $('.tab-content:visible form');
    validate(form);
}

function createContent(xml) {		
    $(xml).find("bean").each(function(index){
        var content = "";
        var beanId = index + 1;
        content += "<form id='form-step" + beanId + "' class='vertical'><fieldset><legend>" + $(this).attr("name") + "</legend>";
        content += "<input class='current-step' type='hidden' value='" + beanId + "'/>";
        $(this).find("property").each(function(index){
            var propId = index + 1;
            content += "<label for='step" + beanId + "-field" + propId + "' class='col_9'>" + $(this).attr("name") + "</label>";
            content += "<select class='fancy' id='step" + beanId + "-field" + propId + "' name='prop" + propId + "'>";
            content += "<option value=''>" + defaultText + "</option>";
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
            content += "<li class='result'><a href='#'><span class='icon medium' data-icon='}'></span>Результат</a></li>";
        }
        content += "</ul></fieldset></form>";
        
        $("#tabr" + (beanId)).html(content);
    });
}

function setCounter() {
    var counter = $("#counter");
    $(".tab-content").on('change', "form select",  function() {
        var sum = 0;

        $.each($("form select"), function() {
            var value = +$(this).find("option:selected").val();
            if(value) {
                sum += value;
            };
        });

        counter.find("span").html(sum.toPrecision(3));
    });
}

function navButtonsOn(form) {
    var currentStep = +form.find(".current-step").val();

    form.find(".next").bind('click', function(){
        $("ul.tabs a[href=#tabr" + (currentStep+1) + "]").click();
    });

    form.find(".previous").bind('click', function() {
        $("ul.tabs a[href=#tabr" + (currentStep-1) + "]").click();
    });
    
    form.find(".result").bind('click', function() {
        $("ul.tabs a[href=#tabr" + (lastBeanId+1) + "]").click();
    });
}

function navButtonsOff(form) {
    form.find(".next").off('click');
    form.find(".previous").off('click');
    form.find(".result").off('click');
}

function validate(form) {
	var elements = form.find('select');
    var errors = elements.length;

	form.find('.next, .result').on('click', function() {
		elements.each(function() {
			if(!$(this).val()){
				$(this).prev('label').addClass('error');
				$(this).next('.chzn-container').find('.chzn-single').addClass('error');
				navButtonsOff(form);
			}
		});

		if(errors == 0) {
			navButtonsOn(form);
			nextStep(form);
        }		
	});

    form.find('select').on('change', function() {
        if($(this).val()) {
            $(this).prev('label').removeClass('error');
            $(this).next('.chzn-container').find('.chzn-single').removeClass('error');			
			errors--;
        }

        if(errors == 0) {
			navButtonsOn(form);
			nextStep(form);
        }
    });

    return errors;
}

function nextStep(form) {
	var currentStep = +form.find('.current-step').val();
	var nextForm = $('#form-step' + (currentStep+1));
	validate(nextForm);
}