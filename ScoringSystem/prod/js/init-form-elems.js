function validate(a){var b=a.find("select");var c=b.length;var d=+a.find(".current-step").val();b.each(function(){if(!$(this).val()){$(this).prev("label").addClass("error");$(this).next(".chzn-container").find(".chzn-single").addClass("error")}else{c--}});if(c!=0)flashError(c);a.find("select").on("change",function(){if($(this).val()){$(this).prev("label").removeClass("error");$(this).next(".chzn-container").find(".chzn-single").removeClass("error");c--}if(c==0){navButtonsOn(a)}});return c}function initClearClick(a){a.find(".clear-data").on("click",function(a){$("form").each(function(){$.Storage.remove($(this).attr("id"))})})}function initResultClick(a){var b=+a.find(".current-step").val();a.find('ul.button-bar li.result a[href^="#"]').on("click",function(c){errors=validate(a);if(errors!=0){return false}c.preventDefault();var d=$("#breadcrumb li");var e=$(this).attr("href");var f=$(".step-content:visible");$(f).hide();d.removeClass("current");$("#breadcrumb").find(".step"+b).addClass("previous");$("#breadcrumb").find(".step"+(b+1)).addClass("current");$(e).show(0);getResultData();return false})}function initPrevClick(a){var b=+a.find(".current-step").val();a.find('ul.button-bar li.previous a[href^="#"]').on("click",function(a){a.preventDefault();var c=$("#breadcrumb li");var d=$(this).attr("href");var e=$(".step-content:visible");$(e).hide();c.removeClass("current");$("#breadcrumb").find(".step"+b).removeClass("previous");$("#breadcrumb").find(".step"+(b-1)).addClass("current");$(d).show(0);return false})}function initNextClick(a){var b=+a.find(".current-step").val();a.find('ul.button-bar li.next a[href^="#"]').on("click",function(c){c.preventDefault();errors=validate(a);if(errors!=0){return false}var d=$("#breadcrumb li");var e=$(this).attr("href");var f=$(".step-content:visible");$(f).hide();d.removeClass("current");$("#breadcrumb").find(".step"+b).addClass("previous");$("#breadcrumb").find(".step"+(b+1)).addClass("current");$(e).show(0);return false})}function initForms(){$(".step-content form").each(function(){initNextClick($(this));initPrevClick($(this));initClearClick($(this));initResultClick($(this))})}