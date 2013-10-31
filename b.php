<?php

//https://github.com/1110637SaraRego/ARQSI.git

//B

//<title> … </title>
//<author> … </author>
//<category> … </category>
//<isbn> … </isbn>
//<publicacao> … </publicacao>
//<news> … </news>


$cat = $_GET['categoria'];

$ped1 = "http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora1.php?categoria=$cat";
$ped2 = "http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora2.php?categoria=$cat";

$editora1 = split("<title>", file_get_contents($ped1));
$editora2 = split("<title>", file_get_contents($ped2));

$array = array();

for($i=1;$i<sizeof($editora1);$i++){
    $arr = split("</title>",$editora1[$i]);
    $array[] = $arr[0];
}

for($i=1;$i<sizeof($editora2);$i++){
    $arr = split("</title>",$editora2[$i]);
    
    $encontrou = FALSE;
    for($j=0; $j<sizeof($array);$j++){
        if($arr[0] == $array[$j]){
            $encontrou = TRUE;
        }
    }
    
    if($encontrou == FALSE){
        $array[] = $arr[0];
    }
}

header("Content-type: text/xml");
echo "<book>";
for($i=0;$i<sizeof($array);$i++){
    echo "<title>$array[$i]</title>";
}

echo "</book>";



?>
