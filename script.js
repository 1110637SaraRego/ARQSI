var xmlHttpObj;

function CreateXmlHttpRequestObject( )
{
    // detecção do browser simplificada
    // e sem tratamento de excepções
    xmlHttpObj = null;
    if (window.XMLHttpRequest) // IE 7 e Firefox
    {
        xmlHttpObj = new XMLHttpRequest()
    }
    else if (window.ActiveXObject) // IE 5 e 6
    {
        xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP")
    }
    return xmlHttpObj;
}

 function MakeXMLHTTPCall(param)
{     
	xmlHttpObj = CreateXmlHttpRequestObject();

	if (xmlHttpObj)
	{
		// Definição do URL para efectuar pedido HTTP - método GET
		// Registo do EventHandler
		if(param === 0){
			xmlHttpObj.open("GET", "a.php", true);
			
			xmlHttpObj.onreadystatechange = adicionaCategorias;
		}
		if(param === 1){
			//vai buscar a categoria selecionada
			var categoria = document.getElementById("categorias").childNodes[document.getElementById("categorias").selectedIndex + 2].firstChild.nodeValue;
			var num = document.getElementById("numLivros").value;
			
			xmlHttpObj.open("GET", "b.php?categoria=" + categoria + "&num=" + num, true);
			xmlHttpObj.onreadystatechange = adicionaLivros;
		}
		if(param === 2){
			var n = document.getElementById("n_livros_editora").value;
			xmlHttpObj.open("GET", "c.php?n=" + n, true);
			n.value="";
			
			xmlHttpObj.onreadystatechange = listaNLivrosEditora;
		}
		xmlHttpObj.send(null);
	 }

}

function carregaCategorias()
{
        MakeXMLHTTPCall(0);
}

function adicionaCategorias() {

    if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseXML que devolve a resposta do servidor
        var docxml = xmlHttpObj.responseXML;
        
        
        var categorias = docxml.getElementsByTagName("categoria");
        
        for(var a=0;a<categorias.length;a++){
            var categoria = categorias[a].firstChild.nodeValue;
            var option = document.createElement("option");
            option.appendChild(document.createTextNode(categoria));
            document.getElementById("categorias").appendChild(option); 
        }
        
        
    }

}

function carregaLivros()
{  
	MakeXMLHTTPCall(1);
    
}

function adicionaLivros() {

    if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseXML que devolve a resposta do servidor
        div = document.getElementById('livros')
        while (div.childNodes.length !== 0){
        div.removeChild(div.firstChild);
        }
        
        var docxml = xmlHttpObj.responseXML;
        
        var livros = docxml.getElementsByTagName("title");
        
        for(var a=0;a<livros.length;a++){
            var livro = livros[a].firstChild.nodeValue;
            var option = document.createElement("a");
            option.appendChild(document.createTextNode(livro));
            option.setAttribute("href","");
            option.setAttribute("onclick","return false");
            document.getElementById("livros").appendChild(option); 
            document.getElementById("livros").appendChild(document.createElement("br"));
        }
        
        
    }

}

/** alinea c) **/


function nLivrosEditora(){
	MakeXMLHTTPCall(2);
	
}

function listaNLivrosEditora(){
	
	if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseXML que devolve a resposta do servidor
		var vec = xmlHttpObj.responseText.split(":");
		listaLivros(vec);
		
	}
}
function listaLivros(vec)
{
	var x = document.getElementById("livros");
	// apagar anteriores
	while (x.firstChild) {
		x.removeChild(x.firstChild);
	}
	
	for(var i=1;i<vec.length;i++){
		var editora = document.createTextNode("Editora " + vec[i].charAt(0) + ":");
		x.appendChild(editora);
		x.appendChild(document.createElement("br"));
		var livros = vec[i].split(',');
		livros[0] = livros[0].slice(1,livros[0].length);//remove 1o char
		for(var j = 0; j < livros.length; j++){
			var link = document.createElement("a");
			link.appendChild(document.createTextNode(livros[j]));
			link.setAttribute("href","");
			link.setAttribute("onclick","return false");
			x.appendChild(link); 
			x.appendChild(document.createElement("br"));
		}
	}
    }