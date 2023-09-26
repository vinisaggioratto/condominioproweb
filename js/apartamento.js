
function adicionarApartamento() {
    let numero = document.getElementById("numero").value;
    let andar = document.getElementById("andar").value;
    let bloco = document.getElementById("bloco").value;
    let statusApto = document.getElementById("select-cadastro");
    let statusSelecionado = statusApto.value;

    if (numero != "" && andar != "" && bloco != "") {


        $('#body-tabela').append("<tr>" +
            "<td>" + "Id" + "</td>" +
            "<td>" + numero + "</td>" +
            "<td>" + andar + "</td>" +
            "<td>" + bloco + "</td>" +
            "<td>" + statusSelecionado + "</td>" +
            "<td>" + '<i class="bi bi-pencil-square"></i>' + '<i class="bi bi-trash3-fill"></i>' + "</td>" +
            "</tr>");

        /*document.getElementById("listaDeCompras").innerHTML = conteudoAntigo + conteudoNovo;*/
    } else {
        alert("Preencha todos os campos.")
    }
}

function limparCampos() {
    document.getElementById("numero").value = "";
    document.getElementById("andar").value = "";;
    document.getElementById("bloco").value = "";;
}

