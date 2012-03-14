function parse() {
	$.ajax({
		type : "GET",
		url : "data/data1.xml",
		dataType : "xml",
		success : callback
    });
}

function callback(xml) {
    createContent(xml);
    initKickStarter();
    initForms();
    initTabs();
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
		content += createButtons(beanId, steps);
        
    });
    content += "<div id='step-content-" + (steps+1) + "' class='step-content last counter'>";
    content += "<form class='vertical'><fieldset><legend>Результат</legend><h4>Кількість балів:</h4>";
    content += "<p class='yoursum'></p><h4>Клас замовника:</h4><p class='customerClass'></p><h4>Характеристика замовника:</h4><p class='decsription'></p>";
    content += "<button class='medium clear-data'><span class='icon' data-icon='T'></span>Очистити дані</button>";
	content += "<ul class='button-bar'>";
	content += "<li class='previous'><a href='#step-content-" + (steps) + "'><span class='icon medium' data-icon='{'></span>Назад</a></li>";
    content += "</ul></fieldset></form></div>";
  
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

function initTabs() {
    $('.step-content').addClass('clearfix').not(':first').hide();
    $('#breadcrumb li:first').addClass('current');
}

function flashError(errors) {
	$('.notice.error').find('.error-count').html(errors);
	$('.notice.error').fadeIn('slow').delay(1000).fadeOut('slow');
}
