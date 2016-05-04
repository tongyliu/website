<?php

// Again not the real file.

session_start();

if (isset($_POST['name'], $_POST['email'], $_POST['msg'])) {
	$_SESSION['contact_request_status'] = rand(0, 1);
	header('Location: contacted');
	exit();
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
		<div class="profile-buttons">
			<a href="https://github.com/tongyliu">
				<div class="profile-button profile-button--github"></div>
			</a>
			<a href="https://www.linkedin.com/in/tong-liu-7a55489b">
				<div class="profile-button profile-button--linkedin"></div>
			</a>
		</div>
	</div>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.11.2/lodash.min.js"></script>
	<script type="text/javascript" src="js/autosize.min.js"></script>
	<script type="text/javascript" src="js/contact.js"></script>
</body>
</html>
