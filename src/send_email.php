<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $to = "your-email@example.com"; // Replace with your email
    $subject = "New Feedback Received";
    $headers = "From: no-reply@example.com\r\n" .
               "Reply-To: no-reply@example.com\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $message = "Feedback Received:\n\n";
    foreach ($data as $key => $value) {
        $message .= ucfirst($key) . ": " . htmlspecialchars($value) . "\n";
    }
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Feedback sent successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send feedback."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>