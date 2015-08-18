$(document).ready(function(){
	var 
		slider = $(".slider"),
		slideTitles = slider.find('.slide_title')
		;

	// Add Fittext to slider element on homepage and every other required page.
	if (slider.length > 0 && slideTitles.length > 0) {
		slideTitles.fitText();
	}
});