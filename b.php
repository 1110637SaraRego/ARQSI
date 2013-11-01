<?php

//https://github.com/1110637SaraRego/ARQSI.git

//B

$cat = $_GET['categoria'];

$num = $_GET['num'];

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
            $num2+=1;
        }
    }
    
    if($encontrou == FALSE){
        $array[] = $arr[0];
    }
}

header("Content-type: text/xml");
echo "<book>";


//   
//if($num < sizeof($array)){
//    $num = sizeof($array);
//}

if($num == "todos" | $num == "Todos"){
    $num = sizeof($array);
}

for($i=0;$i<$num;$i++){
    echo "<title>$array[$i]</title>";
}

echo "</book>";



?>
