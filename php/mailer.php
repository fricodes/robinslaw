<?php

$EmailTo = "info@robinslaw.co.tz";
$Subject = $_POST["subject"];

$errorMSG = "";
$name = $email = $message = null;

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Full Name Required ";
} else {
    $name = filter_var($_POST["name"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email Required ";
} else {
    $email = filter_var($_POST["email"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMSG .= "Invalid Email";
    }
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message Required ";
} else {
    $message = filter_var($_POST["message"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}

$message = nl2br($message);

// Prepare Email Body Text
$Body = "<html><body><p>{$message}</p></body></html>";

// Send Email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
$headers .= "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if ($name && $email && $message) {
    $success = mail($EmailTo, $Subject, $Body, $headers);
} else {
    $success = false;
}

if ($success && $errorMSG == "") {
    echo "success";
} else {
    if ($errorMSG == "") {
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
