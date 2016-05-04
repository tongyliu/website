<?php

// Again not the real file.

if (isset($_POST['name'], $_POST['email'], $_POST['msg'])) {
	$should_render_form = false;
} else {
	$should_render_form = true;
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Tong Liu - Contact</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	<link rel="stylesheet" type="text/css" href='https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,400italic,700,700italic'/>
</head>
<body>
	<div class="main-wrapper main-wrapper--contact">
		<div class="section-heading">
			<h2>Contact</h2>
		</div>
		<?php if ($should_render_form): ?>
			<form id="contact-form" action="contact.php" method="POST" novalidate>
				<div class="form-field">
					<label class="required" for="name-input">Name</label>
					<input id="name-input" type="text" name="name"/>
				</div>
				<div class="form-field">
					<label class="required" for="email-input">Email</label>
					<input id="email-input" type="email" name="email"/>
				</div>
				<div class="form-field form-field--textarea">
					<label class="required" for="msg-input">Message</label>
					<textarea id="msg-input" rows="1" name="msg"></textarea>
				</div>
				<button class="button button--disabled" type="submit" disabled>Send</button>
			</form>
		<?php else: ?>
			<div class="confirmation">
				Thanks for reaching out! I'll get back to you as soon as I can.
			</div>
		<?php endif; ?>
		<div class="profile-buttons">
			<a href="https://github.com/tongyliu">
				<div class="profile-button profile-button--github"></div>
			</a>
			<a href="https://www.linkedin.com/in/tong-liu-7a55489b">
				<div class="profile-button profile-button--linkedin"></div>
			</a>
		</div>
		<?php if (!$should_render_form): ?>
			<a class="button button--small back-button" href="index">Back</a></li>
		<?php endif; ?>
	</div>
	<?php if ($should_render_form): ?>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.11.2/lodash.min.js"></script>
		<script type="text/javascript" src="js/autosize.min.js"></script>
		<script type="text/javascript" src="js/contact.js"></script>
	<?php endif; ?>
</body>
</html>
