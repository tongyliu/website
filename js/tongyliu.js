/*
 * tongyliu.js
 *
 * Personal Website
 * Tong Liu, Jan 2016
 */

/*- Card stacks --------------------------------------------------------------*/

var CardStack = function(options) {
	this.target = options.target || '.card-stack';
	this.animationDuration = options.animationDuration || 1000;
	this.cards = [];
	this.front = 0;
};

CardStack.prototype.shiftCards = function() {
	for (var i = 1; i < this.cards.length; ++i) {
		var index = (this.front + i) % this.cards.length;
		this.cards[index].removeClass('_' + (i + 1)).addClass('_' + i);
	}
};

CardStack.prototype.nextCard = function() {
	var $activeCard = this.cards[this.front];
	var $newBack = $activeCard.clone(true);
	$newBack.removeClass('_1').addClass('_' + this.cards.length);

	$activeCard.addClass('animating');
	$newBack.appendTo(this.target);
	this.shiftCards();

	this.cards[this.front] = $newBack;
	this.front = (this.front + 1) % this.cards.length;

	window.setTimeout(function() {
		$activeCard.remove();
	}, this.animationDuration);
};

CardStack.prototype.init = function() {
	var that = this;
	this.cards = $(this.target).find('.card');

	for (var i = 0; i < this.cards.length; ++i) {
		var $card = $(this.cards[i]);
		$card.on('click', function() {
			that.nextCard();
		});
		this.cards[i] = $card;
	}
};

/*- Helpers ------------------------------------------------------------------*/

var isMobileDevice = function() {
	return (navigator.userAgent.match(/Android|iPad|iPhone|iPod/i) !== null);
};

/*- $(document).ready() ------------------------------------------------------*/

$(function() {
	new WOW({ mobile: false }).init();

	if (isMobileDevice()) {
		$('body').addClass('scrolling-bg');
	}

	new CardStack({ target: '#companion-stack' }).init();
	new CardStack({ target: '#weebly-stack' }).init();
});
