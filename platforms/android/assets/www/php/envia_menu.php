<?php

$objDatos = json_decode(file_get_contents("php://input"));

//print_r($objDatos);

$suscriptores = $objDatos->data->suscriptores;
$platillos = $objDatos->data->platillos;
$pastas = $objDatos->data->pastas;
$aguas = $objDatos->data->aguas;
$sopas = $objDatos->data->sopas;

//$suscriptores_email = array();


$titulo    = 'La Parrilla Express Menú del Día';

$msg = "<body>";
$msg .= "<img src='http://public.bay.livefilestore.com/y1paVcd_-AGBVhttJFLnWBoybuoWy88TjFQjlaF8MPjO0cOq3G4OVjSTqgm7yh6rzBPwF8mEyWpkunUOcZWNVUd7g/La%20Parrilla%20Movil%20muestra.jpg'>";
$msg .= "<p>Estimado cliente,<br> Para nosotros es un placer hacerle llegar nuestro menu del día de hoy: <strong>". date('Y-m-d') ."</strong>.</p></p>Esperamos sea de su agrado y contar hoy con su agradable visita.<br> ¡Le deseamos un buen día!.</p>";

$msg .= "<ul>";

	$msg .= "<li><h2>Platillos</h2>";
foreach ($platillos as $platillo) {
	$msg .= "<ul>";
	$msg .= "<li><strong>" . $platillo->title . "</strong>";
	$msg .= "<ul>";
	$msg .= "<li><strong>Descripción: </strong>" . @$platillo->description . "</li>";
	$msg .= "<li><strong>Tipo de carne: </strong>" . $platillo->tipo . "</li>";
	$msg .= "</ul>";
	$msg .= "</li>";
	$msg .= "</ul>";
}
	$msg .= "</li>";

	$msg .= "<li><h2>Pastas</h2>";
foreach ($pastas as $pasta) {
	$msg .= "<ul>";
	$msg .= "<li><strong>" . $pasta->title . "</strong>";
	$msg .= "<ul>";
	$msg .= "<li><strong>Descripción: </strong>" . $pasta->description . "</li>";
	$msg .= "</ul>";
	$msg .= "</li>";
	$msg .= "</ul>";
}
	$msg .= "</li>";

	$msg .= "<li><h2>Sopas</h2>";
foreach ($sopas as $sopa) {
	$msg .= "<ul>";
	$msg .= "<li><strong>" . $sopa->title . "</strong>";
	$msg .= "<ul>";
	$msg .= "<li><strong>Descripción: </strong>" . $sopa->description . "</li>";
	$msg .= "</ul>";
	$msg .= "</li>";
	$msg .= "</ul>";
}
	$msg .= "</li>";

	$msg .= "<li><h2>Aguas frescas</h2>";
foreach ($aguas as $agua) {
	$msg .= "<ul>";
	$msg .= "<li><strong>" . $agua->title . "</strong>";
	$msg .= "<ul>";
	$msg .= "<li><strong>Descripción: </strong>" . $agua->description . "</li>";
	$msg .= "</ul>";
	$msg .= "</li>";
	$msg .= "</ul>";
}
	$msg .= "</li>";

$msg .= "</ul>";
$msg .= "</body>";


require_once('phpmailer/class.phpmailer.php');
function sendMail($emailto,$subject,$body,$altbody){
	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8';
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'mail.syesoftware.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'no-reply@syesoftware.com';                 // SMTP username
	$mail->Password = 'Syesoftware2015';                           // SMTP password
	$mail->Port = 26;                                    // TCP port to connect to
	$mail->setFrom('no-reply@syesoftware.com', 'La Parrilla Express');
	$mail->addAddress($emailto);               // Name is optional
	$mail->isHTML(true);                                  // Set email format to HTML
	$mail->Subject = $subject;
	$mail->Body    = $body;
	$mail->AltBody = $altbody;

	if(!$mail->send()) {
	    return 'EL/Los mensaje(s) no ha(n) sido enviado(s). Error: ' . $mail->ErrorInfo;
	} else {
	    return 'El/Los mensaje(s) ha(n) sido enviado(s)';
	}
}

foreach ($suscriptores as $suscriptor) {
	$response = sendMail($suscriptor->email,$titulo,$msg,strip_tags($msg));
}



echo $response;
//print_r($suscriptores_email);
//print_r($msg);

?>