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