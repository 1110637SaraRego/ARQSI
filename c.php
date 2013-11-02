<?php 
	if(isset($_REQUEST["n"])){
		$n = $_REQUEST["n"];
		ini_set("allow_url_fopen", true);
		//libxml_use_internal_errors(true);
		$all = "";
		
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
		$livros = $dom->getElementsByTagName('title');
		$all .= ":1";//: -> editoraX
		$length = $livros->length;
		for ($i = 0; $i < $length; $i++ ) {
		
			$all .= $livros->item($i)->nodeValue;
			$all .= ",";
			
		}
		$all = rtrim($all,',');//retira ultima virgula
		
		
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
		$livros = $dom->getElementsByTagName('title');
		$all .= ":2";//: -> editoraX
		$length = $livros->length;
		for ($i = 0; $i < $length; $i++ ) {
		
			$all .= $livros->item($i)->nodeValue;
			$all .= ",";
			
		}
		$all = rtrim($all,',');
		
		echo $all;
		
	}else{
		echo "Error";
	}
?>