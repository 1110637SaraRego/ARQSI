
<?php

//ALÍNEA A
$editora1 = split("<categoria>", file_get_contents("http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora1.php?categoria=todas"));
$editora2 = split("<categoria>", file_get_contents("http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora2.php?categoria=todas"));

$array = array();

for ($i=1; $i<sizeof($editora1);$i++){
    
    $categorias1 = split("</categoria>",$editora1[$i]);
    
    $cat1 = $categorias1[0];
    $array[] = $cat1;
}


for ($i=1; $i<sizeof($editora2);$i++){
    
    $categorias2 = split("</categoria>",$editora2[$i]);
    
    $cat2 = $categorias2[0];
    $encontrou = FALSE;
    for($j=0; $j<sizeof($array);$j++){
        if($cat2 == $array[$j]){
            $encontrou = TRUE;
        }
    }
    
    if($encontrou == FALSE){
        $array[] = $cat2;
    }
}

header("Content-type: text/xml");
echo "<categorias>";
for($i=0;$i<sizeof($array);$i++){
    echo "<categoria>$array[$i]</categoria>";
}

echo "</categorias>";
?>