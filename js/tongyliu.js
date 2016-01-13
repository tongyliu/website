/*
 * tongyliu.js
 *
 * Personal Website
 * Tong Liu, Jan 2016
 */

$(function() {
	new WOW().init();

	// Prevent any overflow-x from showing
	$('.wrapper').scroll(function() {
		if ($(document).scrollLeft()) {
			$('.wrapper').scrollLeft(0);
		} 
	});

	// iOS devices seem to require a clip to stop the .trapezoid-wrapper
	// from showing overflow	
	if (isAppleDevice()) {
		$('.trapezoid-wrapper').css(
			'-webkit-clip-path', 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)'
		);
	}
});

function isAppleDevice() {
	return navigator.userAgent.match(/iPad|iPhone|iPod/i) !== null;
}
