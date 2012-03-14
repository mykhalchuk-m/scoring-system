function initForms(){
    $('.step-content form').each(function(){
    	initNextClick($(this));
    	initPrevClick($(this));
    	initClearClick($(this));
    	initResultClick($(this));
    });
 }

function initNextClick(form) {
    var currentStep = +form.find(".current-step").val();
    
    form.find('ul.button-bar li.next a[href^="#"]').on('click', function(e){
    	e.preventDefault();
    	// add state saving
    	errors = validate(form);
    	if (errors != 0) {
    		return false;
    	}
		var tabs = $("#breadcrumb li");
		var tab_next = $(this).attr('href');
		var tab_current = $(".step-content:visible");
		$(tab_current).hide();
		tabs.removeClass('current');
		$("#breadcrumb").find(".step"+(currentStep)).addClass('previous');
		$("#breadcrumb").find(".step"+(currentStep+1)).addClass('current');
		$(tab_next).show(0);
		return false;
	});
}

function initPrevClick(form) {
	var currentStep = +form.find(".current-step").val();
	
	form.find('ul.button-bar li.previous a[href^="#"]').on('click', function(e) {
		// add state saving
		e.preventDefault();
		var tabs = $("#breadcrumb li");
		var tab_prev = $(this).attr('href');
		var tab_current = $(".step-content:visible");
		$(tab_current).hide();
		tabs.removeClass('current');
		$("#breadcrumb").find(".step"+(currentStep));
		$("#breadcrumb").find(".step"+(currentStep-1)).addClass('current');
		$(tab_prev).show(0);
		return false;
	});
}

function initResultClick(form){
	var currentStep = +form.find(".current-step").val();
    
    form.find('ul.button-bar li.result a[href^="#"]').on('click', function(e){
    	// add state saving
    	errors = validate(form);
    	if (errors != 0) {
    		return false;
    	}
		e.preventDefault();
		var tabs = $("#breadcrumb li");
		var tab_next = $(this).attr('href');
		var tab_current = $(".step-content:visible");
		$(tab_current).hide();
		tabs.removeClass('current');
		$("#breadcrumb").find(".step"+(currentStep)).addClass('previous');
		$("#breadcrumb").find(".step"+(currentStep+1)).addClass('current');
		$(tab_next).show(0);
		getResultData(); // calculate and show result data
		return false;
	});
}

function initClearClick(form) {
	form.find(".clear-data").on('click', function(e) {
		$("form").each(function(){
			$.Storage.remove($(this).attr("id"));
		});
	});
}

function validate(form) {
	var elements = form.find('select');
    var errors = elements.length;
	var currentStep = +form.find(".current-step").val();
	
	elements.each(function() {
		if(!$(this).val()){
			$(this).prev('label').addClass('error');
			$(this).next('.chzn-container').find('.chzn-single').addClass('error');
		}
		else {
			errors--;
		}
	});

	if (errors != 0)
		flashError(errors);

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

