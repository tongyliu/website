<?php

session_start();

if (!isset($_SESSION['contact_request_status'])) {
	header('Location: contact');
}

$possible_titles = array("Error Sending Message", "Message Sent");

$possible_results = array( 
	"Oops, there was an error submitting your message &ndash; try again later.",
	"Thanks for reaching out! I'll get back to you as soon as I can."
);

$title = $possible_titles[$_SESSION['contact_request_status']];
$result = $possible_results[$_SESSION['contact_request_status']];

?>

<!DOCTYPE html>
<html>
<head>
	<title>Tong Liu - <?= $title ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/x-icon" href="favicon.ico"/>
	<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	<link rel="stylesheet" type="text/css" href='https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,400italic,700,700italic'/>
</head>
<body>
	<div class="main-wrapper main-wrapper--contact">
		<div class="section-heading">
			<h2>Contact</h2>
		</div>
		<div class="confirmation">
			<?= $result ?>
		</div>
		<div class="profile-buttons">
			<a href="https://github.com/tongyliu">
				<div class="profile-button profile-button--github"></div>
			</a>
			<a href="https://www.linkedin.com/in/tong-liu-7a55489b">
				<div class="profile-button profile-button--linkedin"></div>
			</a>
		</div>
		<a class="button button--small back-button" href="index">Home</a>
	</div>
</body>
</html>
