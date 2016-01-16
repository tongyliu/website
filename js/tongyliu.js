/*
 * tongyliu.js
 *
 * Personal Website
 * Tong Liu, Jan 2016
 */

$(function() {
	new WOW({ mobile: false }).init();
	if (isMobileDevice()) {
		$('body').addClass('fixed-bg');
	}
});

function isMobileDevice() {
	return (navigator.userAgent.match(/Android|iPad|iPhone|iPod/i) !== null);
}
