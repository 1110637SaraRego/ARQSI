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

function carregaCategorias()
{
    xmlHttpObj = CreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET", "a.php", true);

        // Registo do EventHandler
        xmlHttpObj.onreadystatechange = adicionaCategorias;
        xmlHttpObj.send(null);
    }
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
    //vai buscar a categoria selecionada
    var categoria = document.getElementById("categorias").childNodes[document.getElementById("categorias").selectedIndex + 2].firstChild.nodeValue;
    xmlHttpObj = CreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET", "b.php?categoria=" + categoria, true);

        // Registo do EventHandler
        xmlHttpObj.onreadystatechange = adicionaLivros;
        xmlHttpObj.send(null);
    }
}

function adicionaLivros() {

    if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseXML que devolve a resposta do servidor
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