<?php 
	if(isset($_GET["n"])){
		$n = $_GET["n"];
		ini_set("allow_url_fopen", true);
		//libxml_use_internal_errors(true);
		
		$domall = new DOMDocument();
		$editoras = $domall->createElement("editoras");
		$editoras = $domall->appendChild($editoras);
		
		
		/** 1a editora **/
		$url = file_get_contents("http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora1.php?numero=".$n);
		//tratamento da resposta (invalida) 
		$editora1 = "<editora>";
		$editora1 .= $url;
		$editora1 .= "</editora>";
		$editora1 = iconv('CP1250','UTF-8//TRANSLIT',$editora1);
		//echo $editora1;
		$dom = new DOMDocument('1.0', 'ISO-8859-1'); 
		$dom->loadXML($editora1);
		$editora = $domall->createElement("editora"); 
		
		$pesquisa = $dom->getElementsByTagName('pesquisa');
		$comando = $dom->getElementsByTagName('comando');
		if($pesquisa->length == 0 && $comando->length == 0){//se 0 entao tem livro
			$nodeEditora = $dom->getElementsByTagName('title');
			for($i = 0; $i < $nodeEditora->length; $i++){
				$node = $domall->importNode($nodeEditora->item($i), true);
				$editora->appendChild($node);
			}
		}
		$editoras->appendChild($editora);

		/** 2a editora **/
		$url = file_get_contents("http://phpdev2.dei.isep.ipp.pt/~arqsi/trabalho1/editora2.php?numero=".$n);
		//tratamento da resposta (invalida)
		$editora2 = "<editora>";
		$editora2 .= $url;
		$editora2 .= "</editora>";
		$editora2 = iconv('CP1250','UTF-8//TRANSLIT',$editora2);
		//echo $editora2;
		$dom = new DOMDocument('1.0', 'ISO-8859-1'); 
		$dom->loadXML($editora2);
		$editora = $domall->createElement("editora"); 
		
		$pesquisa = $dom->getElementsByTagName('pesquisa');
		$comando = $dom->getElementsByTagName('comando');
		if($pesquisa->length == 0 && $comando->length == 0){//se 0 entao tem livro
			$nodeEditora = $dom->getElementsByTagName('title');
			for($i = 0; $i < $nodeEditora->length; $i++){
				$node = $domall->importNode($nodeEditora->item($i), true);
				$editora->appendChild($node);
			}
		}
		$editoras->appendChild($editora);
		
		header('Content-type: text/xml');
		echo $domall->saveXML();
		
	}else{
		echo "Error";
	}
?>