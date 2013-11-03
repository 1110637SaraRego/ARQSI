<?php 
	if(isset($_GET["livro"])){
		$livro = $_GET["livro"];
		ini_set("allow_url_fopen", true);
		//libxml_use_internal_errors(true);
		
		/** 1a editora **/
		$info = file_get_contents("http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora1.php?titulo=".urlencode($livro));
		$info2 = file_get_contents("http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora2.php?titulo=".urlencode($livro));
		$info = iconv('CP1250','UTF-8//TRANSLIT',$info);
		$info2 = iconv('CP1250','UTF-8//TRANSLIT',$info2);
		//echo $info;
		$dom = new DOMDocument('1.0', 'ISO-8859-1'); 
		$dom->loadXML($info); 
		$pesquisa = $dom->getElementsByTagName('pesquisa');
		$comando = $dom->getElementsByTagName('comando');
		if($pesquisa->length == 0 && $comando->length == 0){//se 0 entao tem livro
			header('Content-type: text/xml');
			echo $dom->saveXML();
			exit;
		}
		
		$dom = new DOMDocument('1.0', 'ISO-8859-1'); 
		$dom->loadXML($info2); 
		$pesquisa = $dom->getElementsByTagName('pesquisa');
		$comando = $dom->getElementsByTagName('comando');
		if($pesquisa->length == 0 && $comando->length == 0){
			header('Content-type: text/xml');
			echo $dom->saveXML();
			exit;
		}
		
	}else{
		echo "Error";
	}
	?>

