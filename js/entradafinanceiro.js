const url = "http://localhost:8080/entradafinanceiro";


function show(financeiroentradas) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Condômino</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data do Pagamento</th>
            <th scope="col">Parcelamento</th>
        </tr>
    </thead>
    `;

    for (let financeiroentrada of financeiroentradas) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr onclick="preencherFormulario(this)">
            <td scope="row">${financeiroentrada.recebCond_id}</td>
            <td>${financeiroentrada.condomino.nome}</td>
            <td>${financeiroentrada.descricao}</td>
            <td>${financeiroentrada.valor}</td>
            <td>${formatter.format(financeiroentrada.data_operacao)}</td> 
            <td>${financeiroentrada.parcelamento}</td>
        </tr>
        `;
    }

    document.getElementById("bodytabela").innerHTML = tab;
}

async function getAPI(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();
    console.log(data);
    
    if (response) {
        show(data);
    }
}

getAPI(url);


function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("select-condomino").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data_operacao").value = "";
    document.getElementById("parcelamento").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

function formatarData(datas) {

    const data = new Date(datas.split('/').reverse().join('-'));
    const dataAmericana = data.toLocaleDateString('en-US');

    let data1 = new Date(dataAmericana);
    //let dataFormatada = "";
    return dataFormatada = (data1.getFullYear() + "-" + ((data1.getMonth() + 1)) + "-" + (data1.getDate()));
}

//NOVO FORMATADOR DE DATAS PADRÃO AMERICANO:
function formatDataUs(stringData) {
    const partes_data = stringData.split("-");
    let dia = partes_data[2].padStart(2, "0");
    let mes = partes_data[1].padStart(2, "0");
    let ano = partes_data[0];
    const data = new Date(`${ano}-${mes}-${dia}`);
    data.setDate(data.getDate() + 1);
    const diaFormatado = String(data.getDate()).padStart(2, "0");
    const mesFormatado = String(data.getMonth() + 1).padStart(2, "0");
    const anoFormatado = data.getFullYear();
    const data_formatada = `${anoFormatado}-${mesFormatado}-${diaFormatado}`;
    return data_formatada;
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const condomino = linha.cells[1].textContent;
    const descricao = linha.cells[2].textContent;
    const valor = linha.cells[3].textContent;
    const data_operacao = linha.cells[4].textContent;
    const parcelamento = linha.cells[5].textContent;

    console.log("Data pagamento valor original: " + data_operacao);
/*
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);
    console.log(formattedDate);
*/

    document.getElementById('id').value = id;
    document.getElementById('select-condomino').value = condomino;
    document.getElementById('descricao').value = descricao;
    document.getElementById('valor').value = valor;
    document.getElementById('data_operacao').value = formatDataUs(formatarData(data_operacao));//formatarData(data_operacao);
    document.getElementById('parcelamento').value = parcelamento;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const condomino = document.getElementById("select-condomino").value;
    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value;
    const data_operacao = formatDataUs(document.getElementById("data_operacao").value);
    const parcelamento = document.getElementById("parcelamento").value;

    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("NOME ATUALIZADO: " + condomino);
    console.log("DESCRICAO ATUALIZADO: " + descricao);
    console.log("VALOR ATUALIZADO: " + valor);
    console.log("DATA OPERACAO ATUALIZADO: " + data_operacao);
    console.log("PARCELAMENTO ATUALIZADO: " + parcelamento);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {

            condomino,
            descricao,
            valor,
            data_operacao,
            parcelamento,
            id

        };

        try {
            const response = await fetch(url + "/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            });
            if (response.ok) {
                alert("Entrada financeira atualizada com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + condomino);
                console.log("DESCRICAO ATUALIZADO: " + descricao);
                console.log("VALOR ATUALIZADO: " + valor);
                console.log("DATA OPERACAO ATUALIZADO: " + data_operacao);
                console.log("PARCELAMENTO ATUALIZADO: " + parcelamento);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + condomino);
                console.log("DESCRICAO ATUALIZADO: " + descricao);
                console.log("VALOR ATUALIZADO: " + valor);
                console.log("DATA OPERACAO ATUALIZADO: " + data_operacao);
                console.log("PARCELAMENTOIVO ATUALIZADO: " + parcelamento);
                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            condomino,
            descricao,
            valor,
            data_operacao,
            parcelamento
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Entrada financeira cadastrada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao cadastrar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
});

//DELETAR
document.getElementById("btn-excluir").addEventListener("click", async () => {

    //EXIBE UM ALERTA PEDINDO CONFIRMAÇÃO PARA EXCLUIR OS DADOS.

    const confirmacao = confirm("Tem certeza que deseja excluir?");

    if (confirmacao) {

        try {
            const id = document.getElementById("id").value;
            console.log(id);
            console.log("ID PREENCHIDO");

            const response = await fetch(url + "/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (response.ok) {
                alert("Entrada financeira deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar entrada financeira. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})
