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
    restoreFormState();
    initKick();
    initTabs();
    initForm();
    setCounter();
}

/*
	Generate content from XML file
*/
function createContent(xml) {
	var defaultText = '-- Оберіть варіант --';
    var steps = $(xml).find("bean").length;
    var breadcrumb = createBreadcrumb(steps);
    var content = "";

    $(xml).find("bean").each(function(index){
        var beanId = index + 1;
        
        content += "<div id='step-content-" + beanId + "' class='step-content'>";
        content += "<form id='form-step" + beanId + "' class='vertical' method='POST'><fieldset><legend>" + $(this).attr("name") + "</legend>";
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

        content += "<br/>";
		var buttons = createButtons(beanId, steps);
        
    });
    content += "<div id='step-content-" + (steps+1) + "' class='step-content last'>Кількість балів <span class='counter'></span></div>";

    
    $("#steps").append(breadcrumb);
    $("#steps").append(content);
}
/*
	Creates Breadcrumb bar (display step progress)
*/
function createBreadcrumb(steps) {
    var stepText = 'Крок ';
    var finalStepText = 'Результат';
    var content = '<ul id="breadcrumb">';

    for(var i=1; i<=steps; i++) {
        content += '<li class="step' + i + '">' + stepText + i + '</li>';
    }
    content +='<li class="step' + i + ' last">' + finalStepText + '</li></ul>';
    
    return content;
}

/*
	Creates ClearData button and Next/Previous/Result buttons bar
*/
function createButtons(step, steps) {
	var content = "<button class='medium clear-data'><span class='icon' data-icon='T'></span>Очистити дані</button>";
	content += "<ul class='button-bar'>";

	if(step != 1) {
		content += "<li class='previous'><a href='#step-content-" + (step-1) + "'><span class='icon medium' data-icon='{'></span>Назад</a></li>";
	}
	if(step != steps) {
		content += "<li class='next'><a href='#step-content-" + (step+1) + "'><span class='icon medium' data-icon='}'></span>Далі</a></li>";
	}
	if(step == steps) {
		content += "<li class='result'><a href='#step-content-" + (step+1) + "'><span class='icon medium' data-icon='}'></span>Результат</a></li>";
	}
	content += "</ul></fieldset></form></div>";
	
	return content;
}

function setCounter() {
    var counter = $(".counter");

    $(".tab-content").on('change', "form select",  function() {
        var sum = 0;

        $.each($("form select"), function() {
            var value = +$(this).find("option:selected").val();
            if(value) {
                sum += value;
            };
        });

        counter.html(sum.toPrecision(3));
    });
}

function navButtonsOn(form) {
    var currentStep = +form.find(".current-step").val();
    
    $('ul.button-bar a[href^="#"]').on('click', function(e){
		e.preventDefault();
		var tabs = $("#breadcrumb li");
		var tab_next = $(this).attr('href');
		var tab_current = $(".step-content:visible");
		$(tab_current).hide();
		tabs.removeClass('current');
		$("#breadcrumb").find(".step"+(currentStep+1)).addClass('current');
		$(tab_next).show('slow', function(){
            $(this).trigger('initForm');
        });
		return false;
	});
}

function navButtonsOff(form) {
    form.find(".next").off('click');
    form.find(".result").off('click');
}

function validate(form) {
	setClearData(form);
	var elements = form.find('select');
    var errors = elements.length;
	var currentStep = +form.find(".current-step").val();
	
	form.find('.next, .result').on('click', function() {
		saveFormState(form);
		elements.each(function() {
			if(!$(this).val()){
				$(this).prev('label').addClass('error');
				$(this).next('.chzn-container').find('.chzn-single').addClass('error');
				navButtonsOff(form);
			}
		});

		if(errors == 0) {
			navButtonsOn(form);
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
        }
    });

    return errors;
}

function nextStep(form) {
	var currentStep = +form.find('.current-step').val();
	var nextForm = $('#form-step' + (currentStep+1));
	validate(nextForm);
}

function initForm(){
    var form = $('.step-content:visible form');
	
    form.find(".previous").bind('click', function() {
    	saveFormState(form);
        $("ul.tabs a[href=#tabr" + (currentStep-1) + "]").click();
    });

    validate(form);
}

function initTabs() {
    $('.step-content').addClass('clearfix').not(':first').hide();
    $('#breadcrumb li:first').addClass('current');
	$('ul.steps').each(function(){
		var current = $(this).find('li.current');
		if(current.length < 1) { $(this).find('li:first').addClass('current'); }
		current = $(this).find('li.current a').attr('href');
		$(current).show();
	});

}