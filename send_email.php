<?php
header('Content-Type: application/json');

// Validate form data
if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['consultation_date'])) {
    echo json_encode(['success' => false, 'error' => 'All fields are required']);
    exit;
}

// Set email headers
$headers = [
    'From: Back on Track <info@backontrack-diabetes.com>',
    'Reply-To: info@backontrack-diabetes.com',
    'Content-Type: text/html; charset=UTF-8'
];

// 1. Email YOU (admin notification)
$admin_subject = "New Consultation: " . $_POST['name'];
$admin_message = "
    <h3>New Consultation Request</h3>
    <p><strong>Name:</strong> {$_POST['name']}</p>
    <p><strong>Email:</strong> {$_POST['email']}</p>
    <p><strong>Date:</strong> {$_POST['consultation_date']}</p>
    <p><strong>Message:</strong><br>{$_POST['message']}</p>
";
mail('info@backontrack-diabetes.com', $admin_subject, $admin_message, implode("\r\n", $headers));

// 2. Auto-respond to user
$user_subject = "Thank you, {$_POST['name']}!";
$user_message = "
    <p>Hi {$_POST['name']},</p>
    <p>We've received your request for <strong>{$_POST['consultation_date']}</strong>.</p>
    <p>Expect a confirmation email within 24 hours.</p>
    <p>— Back on Track Team</p>
";
mail($_POST['email'], $user_subject, $user_message, implode("\r\n", $headers));

echo json_encode(['success' => true]);
?>