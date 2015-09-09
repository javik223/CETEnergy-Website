$(document).ready(function(){
	// Namespace for project
	var CET = CET || {};

	var 
		slider = $(".slider"),
		slideTitles = slider.find('.slide_title')
		;

	// Add Fittext to slider element on homepage and every other required page.
	if (slider.length > 0 && slideTitles.length > 0) {
		slideTitles.fitText();
	}

	// Accordion
	// Implementation of accordion functionality
	// Principle: Active accordion element will be visible on page while other elements remain hidden
	CET.Accordion = function(){
		//Accordion option
		var option = this.option = {
			elem : $(".accordion"),
			clickTarget : $(".accordion_heading"),
			content: $(".accordion_content")
		};

		// Initialize function; hide all accordion content
		this.init = function() {
			option.content.hide();
		};

		// Click event for each individual accordion clickTarget element
		// An active class will be attached to clicked element 
		// The clicked view's content states becomes visible while other elements changes their content states to hidden
		 
		option.clickTarget.click(function(e){
			var elem = $(e.currentTarget); // Clicked element
			var activeAccordions = $('.accordion.active'); // All active accordions
			var content = elem.parent().addClass('active').find('.accordion_content');

			// Hide all open accordions
			var activeAccordionsContent = activeAccordions.find('.accordion_content');
			activeAccordionsContent.hide();
			

			// Show contents of clicked target accordion
			content.slideDown();
		});

		return {
			init: this.init
		};
	};

	var Accordion = new CET.Accordion();
	Accordion.init();
});