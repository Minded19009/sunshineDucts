<?php
/**
 * Sunshine Ducts — Contact form handler
 * Uses PHP mail() function.
 */

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit();
}

// ===== CONFIGURATION =====
$recipient = "sk099086@gmail.com";       // Where you receive submissions

// IMPORTANT: The "From" address must be on YOUR domain, not the customer's.
// Using the customer's email as "From" causes SPF/DKIM failures and gets
// the message flagged as spam or rejected outright.
// This address is only used as the sender envelope — replies go to the customer
// via the Reply-To header below.
$fromAddress = "info@sunshineducts.com";
$fromName    = "Sunshine Ducts Website";

// ===== HELPERS =====
function clean($value) {
    return trim(strip_tags((string) $value));
}

// ===== COLLECT INPUT =====
$firstName = clean($_POST['firstName'] ?? '');
$lastName  = clean($_POST['lastName']  ?? '');
$phone     = clean($_POST['phone']     ?? '');
$email     = clean($_POST['email']     ?? '');
$message   = clean($_POST['message']   ?? '');

// ===== VALIDATION =====
$errors = [];

if ($firstName === '') { $errors[] = 'First name is required.'; }
if ($lastName  === '') { $errors[] = 'Last name is required.'; }
if ($phone     === '') { $errors[] = 'Phone is required.'; }
if ($email     === '') { $errors[] = 'Email is required.'; }
if ($message   === '') { $errors[] = 'Message is required.'; }

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

// Header injection protection
foreach ([$firstName, $lastName, $email, $phone] as $field) {
    if (preg_match('/[\r\n]/', $field)) {
        $errors[] = 'Invalid characters detected in form input.';
        break;
    }
}

if (!empty($errors)) {
    header('Content-Type: application/json');
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => implode(' ', $errors)]);
    exit;
}

// ===== BUILD EMAIL =====
$subject = 'New Contact Form Submission — Sunshine Ducts';

$body = "You have received a new message from the Sunshine Ducts website contact form.\n\n"
      . "--------------------------------------------------\n"
      . "First Name: {$firstName}\n"
      . "Last Name:  {$lastName}\n"
      . "Phone:      {$phone}\n"
      . "Email:      {$email}\n"
      . "--------------------------------------------------\n"
      . "Message:\n{$message}\n"
      . "--------------------------------------------------\n";

// Headers
$headers  = "From: {$fromName} <{$fromAddress}>\r\n";
$headers .= "Reply-To: {$firstName} {$lastName} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ===== SEND =====
header('Content-Type: application/json');

if (mail($recipient, $subject, $body, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Thank you! Your message has been sent.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Sorry, something went wrong while sending your message. Please try again or call us directly.']);
}