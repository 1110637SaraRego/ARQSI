<?php

//E

$host = 'localhost';
$username = 'root';
$password = '13mysql14';
$dbname= 'arqsi';

$tablename = 'Logs';

$url = $_SERVER['REQUEST_URI'];

// Create connection
$conn = mysql_connect($host,$username,$password);

// Check connection 
if (!$conn) {
        die('Could not connect: ' . mysql_error());
    }

    if (!mysql_select_db($dbname, $conn)) {
        die('Could not select BD: ' . mysql_error());
    }
    
    date_default_timezone_set('Europe/Lisbon');
//$data = date('m/d/Y h:i:s a', time());
    $data = date('Y-m-d H:i:s');

  $sqlQuery = "INSERT INTO $tablename (URL, DATA) VALUES ('$url', '$data')";
  //$recordset = mysql_query($sqlQuery,$conn);
  
  if (!mysql_query($sqlQuery, $conn)) {
        die('Could not execute query insert:' . mysql_error());
    }

    if (!mysql_close($conn)) {
        die('Could not close BD:' . mysql_error());
    }
 
?>

