<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$objDatos = json_decode(file_get_contents("php://input"));

//print_r($objDatos);

$suscriptores = $objDatos->data->suscriptores;
$platillos = $objDatos->data->platillos;
$pastas = $objDatos->data->pastas;
$aguas = $objDatos->data->aguas;
$sopas = $objDatos->data->sopas;

//$suscriptores_email = array();


$titulo    = utf8_decode('La Parrilla Express Menú del Día');

$msg = "<body>";
$msg .= "<img src='http://public.bay.livefilestore.com/y1paVcd_-AGBVhttJFLnWBoybuoWy88TjFQjlaF8MPjO0cOq3G4OVjSTqgm7yh6rzBPwF8mEyWpkunUOcZWNVUd7g/La%20Parrilla%20Movil%20muestra.jpg'>";
$msg .= "<p><b>Estimado cliente</b>,<br> Para nosotros es un placer hacerle llegar nuestro menu del día de hoy: <strong>". date('Y-m-d') ."</strong>.</p></p>Esperamos sea de su agrado y contar hoy con su agradable visita.<br><b> ¡Le deseamos un buen día!</b>.</p>";

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


//require_once('phpmailer/class.phpmailer.php');
function sendMail($emailto,$subject,$body,$altbody){


$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <contacto@laparrillaexpress.com>' . "\r\n";

if(!mail($emailto,$subject,$body,$headers)) {
	    return 'EL/Los mensaje(s) no ha(n) sido enviado(s). Error: ' . $mail->ErrorInfo;
	} else {
	    return 'El/Los mensaje(s) ha(n) sido enviado(s)';
	}
	/*
	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8';
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'mail.laparrillaexpress.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'no-reply@laparrillaexpress.com';                 // SMTP username
	$mail->Password = '';                           // SMTP password
	$mail->Port = 26;                                    // TCP port to connect to
	$mail->setFrom('no-reply@laparrillaexpress.com', 'La Parrilla Express');
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
	*/
}

foreach ($suscriptores as $suscriptor) {
	$response = sendMail($suscriptor->email,$titulo,$msg,strip_tags($msg));
}



echo $response;
//print_r($suscriptores_email);
//print_r($msg);

?>