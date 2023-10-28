const url1 = "http://localhost:8080/pais";
const url2 = "http://localhost:8080/estados";
carregarRelatorioPais(url1)
carregarRelatorioEstado(url2)

async function carregarRelatorioPais(url) {
    const response = await fetch(url1, { method: "GET" });
    var data = await response.json();
    let listaDeItens = [];
    let conteudoLista = "";

    for (let pais of data) {

        listaDeItens.push(pais.nome);
    }
    let tab = "";
    for (let i = 0; i < listaDeItens.length; i++) {
        tab =
            `
            ${conteudoLista += "<tr>" + "<td>" + "<p>" + listaDeItens[i] + "</p>" + "</tr>" + "</td>"}
                `;
    }
    document.getElementById("listaDeRelatorios").innerHTML = tab;
}
async function carregarRelatorioEstado(url) {
    const response = await fetch(url, { method: "GET" });
    var data = await response.json();
    let listaDeItens = [];
    let conteudoLista = "";

    for (let estado of data) {

        listaDeItens.push(estado.nome);
        listaDeItens.push(estado.pais.nome);
    }
    let tab = "";
    for (let i = 0; i < listaDeItens.length; i++) {
        tab =
            `
            ${conteudoLista += "<tr>" + "<td>" + "<p>" + listaDeItens[i] + "</p>" + "</tr>" + "</td>"}
                `;
    }
    document.getElementById("listaDeRelatorios").innerHTML = tab;
}

