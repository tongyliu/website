/*
 * tongyliu.js
 *
 * Personal Website
 * Tong Liu, Jan 2016
 */

/*- Card stacks --------------------------------------------------------------*/

var CardStack = function(options) {
	options = options || {};
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

/*- Contact form -------------------------------------------------------------*/

var ContactForm = (function() {
	var myForm = {};

	var updateStatus = function(validationStatus) {
		if (myForm.isValid != validationStatus) {
			var $submitButton = $(myForm.target).find('button').first();
			$submitButton.toggleClass('hidden');
			myForm.isValid = validationStatus;
		}
	}

	var validate = function(changed) {
		var isValidName = myForm.nameField.val().length > 0;
		var isValidEmail = (/.+@.+\..+/i).test(myForm.emailField.val());
		var isValidMsg = myForm.msgField.val().length > 0;
		updateStatus(isValidName && isValidEmail && isValidMsg);
	}

	var showWaitingAnimation = function() {
		var $target = $(myForm.target);
		$target.find('.input-wrapper').addClass('hidden');
		$target.find('.waiting-dots').removeClass('hidden');
	}

	var showConfirmation = function(success) {
		var $target = $(myForm.target);
		$confirmation = $target.find('.confirmation').first();
		if (success) {
			$confirmation.html(
				'Thanks for reaching out! I\'ll respond as soon as possible.'
			);
		} else {
			$confirmation.html(
				'Oops! There was an error while sending. Reload the page to retry.'
			);
		}
		$target.find('.waiting-dots').addClass('hidden');
		$confirmation.removeClass('hidden');
	}

	var submissionUrl = 'contact.php';

	myForm.init = function(options) {
		options = options || {};
		myForm.target = options.target || '#contact-form';
		myForm.isValid = false;

		var $target = $(myForm.target);
		myForm.nameField = $target.find('#name-input');
		myForm.emailField = $target.find('#email-input');
		myForm.msgField = $target.find('#msg-input');

		myForm.nameField.on('input', function() {
			validate();
		});
		myForm.emailField.on('input', function() {
			validate();
		});
		myForm.msgField.on('input', function() {
			validate();
		});
	}

	myForm.submit = function() {
		if (myForm.isValid) {
			showWaitingAnimation();
			var params = {
				name: myForm.nameField.val(),
				email: myForm.emailField.val(),
				msg: myForm.msgField.val()
			}
			$.post(submissionUrl, params, function(data) {
				showConfirmation(data.success);
			}, 'json');
		}
		return false;
	}

	return myForm;
})();

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

	ContactForm.init();
});
