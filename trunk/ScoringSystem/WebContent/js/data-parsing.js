var lastBeanId = 3;

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
    
    //navButtons(form);
    
    $('.next, .result').on('click', function() {
        var form = $('.tab-content:visible form');
        validate(form);
    });
}

function createContent(xml) {		
    var defaultText = '-- Оберіть варіант --';
    
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

        counter.find("span").html(sum);
    });
}

function navButtons(form) {
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

function offNavButtons(form) {
    form.find(".next").off('click');
    form.find(".previous").off('click');
    form.find(".result").off('click');
}

function validate(form) {
    var errors = 0;
    
    form.find('select').each(function() {
        if(!$(this).val()){
            $(this).prev('label').addClass('error');
            $(this).next('.chzn-container').find('.chzn-single').addClass('error');
        }
    });
    
    form.find('select').on('change', function() {
        if($(this).val()) {
            $(this).prev('label').removeClass('error');
            $(this).next('.chzn-container').find('.chzn-single').removeClass('error');
        }

        if($('.error').length == 0) {
            navButtons(form);
        }
        
    });
 
    if($('.error').lenght > 0) {
        offNavButtons(form);
        errors = 1;
    }
    return errors;
}
