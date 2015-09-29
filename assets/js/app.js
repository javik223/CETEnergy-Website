$(document).ready(function(){
	console.log(WURFL);

	// Namespace for project
	var CET = CET || {};



	var 
		slider = $(".slider"),
		slideTitles = slider.find('.slide_title'),
		navIcon = $(".nav-icon")
		;

	// Add Fittext to slider element on homepage and every other required page.
	if (slider.length > 0 && slideTitles.length > 0) {
		slideTitles.fitText();
	}


	// Navigation
	// Implementation of the SlideOver Navigation
	CET.menu = (function() {
		var playHead = new TimelineMax({yoyo: true, paused: true}),
			isOpen = false,
			navElem = $(".nav > ul");

			playHead
				.set('.nav > ul', {display: 'block'})
				.fromTo(navElem, 1, {yPercent: "-200%"}, {yPercent: "0%"});


		var showMenu = function() {
			playHead.play();
			isOpen = true;
		};

		var hideMenu = function() {
			playHead.reverse();
			isOpen = false;	
		};

		return {
			show: showMenu,
			hide: hideMenu,
			isOpen: isOpen
		};
	}());

	// Enable scrolling on the sub-menus
	var pageNav = $(".page-nav_wrapper");
	console.log(pageNav);

	if ($(".page-nav_wrapper").length > 0) {
		setTimeout(function(){
			myScroll = new IScroll(".page-nav_wrapper", {
				mouseWheel: true,
				 scrollX: true,
		    	//scrollbars: true,
		    	//interactiveScrollbars: true,
		    	click: true
			});

		}, 100);
	}


	navIcon.on('click', function(){
		// Open menu navigation if menu is not currently opened
		console.log(CET.menu.isOpen);
		if (!CET.menu.isOpen) {
			CET.menu.show();
			CET.menu.isOpen = true;
			this.addClass('close-icon');
		} else {
			CET.menu.hide();
			CET.menu.isOpen = false;
		}
	});

	// Hacks rememebr to remove them
	var teamProfile = $(".team_profile");
	if(WURFL.form_factor == "Desktop"){
		$(".team-side_wrapper").height(teamProfile.outerHeight());

		if ($(".team-side_wrapper").length > 0) {
			var teamScroll = new IScroll(".team-side_wrapper", {
				 mouseWheel: true,
		    	//scrollbars: true,
		    	interactiveScrollbars: true
			});
		} 
	} else {
		if ($(".team-side_wrapper").length > 0) {
			var teamScroll = new IScroll(".team-side_wrapper", {
				 mouseWheel: true,
				 scrollX: true,
				 interactiveScrollbars: true,
				 click: true
			});
		} 
	}

	// Enable sticky positioning for sub page elements
	pageNav.stickyNavbar();

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

		// Don't initialize slide if the accordion is set to inactive
		if (this.option.elem.parent().hasClass('accordion-inactive')) {
			this.init = false;
		}

		// Click event for each individual accordion clickTarget element
		// An active class will be attached to clicked element 
		// The clicked view's content states becomes visible while other elements changes their content states to hidden
		 
		option.clickTarget.click(function(e){
			var elem = $(e.currentTarget); // Clicked element
			var activeAccordions = $('.accordion.active'); // All active accordions
			var content = elem.parent().addClass('active').find('.accordion_content');


			// Hack for getting the height of the content 
			// console.log(elem.show().height());

			// Top position
			var elemTopPosition = elem.offset().top;

			console.log(elemTopPosition);

			// Hide all open accordions
			var activeAccordionsContent = activeAccordions.find('.accordion_content');
			activeAccordionsContent.hide();


			$("body").animate({scrollTop: elemTopPosition}, 1000);
			

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