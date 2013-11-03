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
        var docxml = xmlHttpObj.responseXML;
        limpaLista("livros");
        var livros = docxml.getElementsByTagName("title");
		for(var a=0;a<livros.length;a++){
			var livro = livros[a].firstChild.nodeValue;
			var link = document.createElement("a");
			link.appendChild(document.createTextNode(livro));
			link.setAttribute("href","javascript:void(0)");
			link.setAttribute("onClick","infoAdiciona( this.firstChild.nodeValue)");
			document.getElementById("livros").appendChild(link); 
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
		var xml = xmlHttpObj.responseXML;
		
		limpaLista("livros");
		var editoras = xml.getElementsByTagName("editora");
		var length = editoras.length;//numero de editoras
		for(var i = 0; i < length; i++){
			var livros = editoras[i].getElementsByTagName("title");
			var len = livros.length;//numero de titulos numa editora
			if(len != 0){
				document.getElementById("livros").appendChild(document.createTextNode("Editora " + (i+1)));
				document.getElementById("livros").appendChild(document.createElement("br"));
				for(var a=0;a<livros.length;a++){
					var livro = livros[a].firstChild.nodeValue;
					var link = document.createElement("a");
					link.appendChild(document.createTextNode(livro));
					link.setAttribute("href","javascript:void(0)");
					link.setAttribute("onClick","infoAdiciona(this.firstChild.nodeValue)");
					document.getElementById("livros").appendChild(link); 
					document.getElementById("livros").appendChild(document.createElement("br"));
				}
			}
		}		
	}
}

function infoAdiciona(livro){
	xmlHttpObj = CreateXmlHttpRequestObject();
	if (xmlHttpObj)
	{
		xmlHttpObj.onreadystatechange=function(){
			if (xmlHttpObj.readyState==4 && xmlHttpObj.status==200)
			{
				var xml = xmlHttpObj.responseXML;
				var book = xml.getElementsByTagName("book")[0].childNodes;
				var divinfo = document.getElementById("info");
				limpaLista("info");
				divinfo.style.display = 'block';
				var table = divinfo.appendChild(document.createElement("table"));
				table.setAttribute("border","1");
				
				var row1 = document.createElement("tr");
				var row2 = document.createElement("tr");
				for(var i = 0; i < 5; i++){
					var text1 = document.createTextNode(book.item(i).nodeName);
					var header = document.createElement("th");
					header.appendChild(text1);
					row1.appendChild(header);
					
					var text2 = document.createTextNode(book.item(i).textContent);
					var info = document.createElement("td");
					info.appendChild(text2);
					row2.appendChild(info);
				}
				table.appendChild(row1);
				table.appendChild(row2);
			}
		}
		xmlHttpObj.open("GET","getInfo.php?livro="+livro,true);
		xmlHttpObj.send();
	}
}


/**Apaga elemento*/
function limpaLista(elemento){
	var x = document.getElementById(elemento);
	// apagar anteriores
	while (x.firstChild) {
		x.removeChild(x.firstChild);
	}
}
