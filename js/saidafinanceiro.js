const url = "http://localhost:8080/saidasfinanceiro";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(saidasfinanceiras) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Fornecedor</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data do Pagamento</th>
            <th scope="col">Nota Fiscal</th>
            <th scope="col">Parcelamento</th>
        </tr>
    </thead>
    `;

    for (let saidasfinanceiro of saidasfinanceiras) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);

        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${saidasfinanceiro.id}</td>
            <td>${saidasfinanceiro.fornecedor.nome}</td>
            <td>${saidasfinanceiro.descricao}</td>
            <td>${Math.round(saidasfinanceiro.valor).toFixed(2)}</td>
            <td>${formatter.format(saidasfinanceiro.data_operacao)}</td> 
            <td>${saidasfinanceiro.nota_fiscal}</td>
            <td>${saidasfinanceiro.parcelamento}</td>
        </tr>
        `;
    }

    document.getElementById("bodytabela").innerHTML = tab;
}

//CARREGAR O TOTAL DE SAIDAS FINANCEIRAS
function total(saidasfinanceiras) {

    let tab = "";
    let total = 0;
    for (let financeirosaida of saidasfinanceiras) {
        total = total + financeirosaida.valor;
    }

    tab +=
    `
         <td colspan="3" style="text-align: right;">Total: </td>
         <td colspan="2"style="text-align: left;">R$ ${Math.round(total).toFixed(2)}</td>
         <td></td>
        `;
    document.getElementById("foot-tabela").innerHTML = tab;
}

//CARREGA OS DADOS DO BACKEND E DISPONIBILIZA PARA SER EXIBIDO NA TABELA
async function getAPI(url) {
    const response = await fetch(url, { method: "GET" });
    var data = await response.json();
    
    if (response) {
        show(data);
        total(data);
    }
}

getAPI(url);

//LIMPAR OS CAMPOS
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("select_fornecedor").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data_operacao").value = "";
    document.getElementById("nota_fiscal").value = "";
    document.getElementById("parcelamento").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//FORMATAR DATA BÁSICO
function formatarData(datas) {

    const data = new Date(datas.split('/').reverse().join('-'));
    const dataAmericana = data.toLocaleDateString('en-US');

    let data1 = new Date(dataAmericana);
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
    const fornecedor = linha.cells[1].textContent;
    const descricao = linha.cells[2].textContent;
    const valor = linha.cells[3].textContent;
    const data_operacao = linha.cells[4].textContent;
    const nota_fiscal = linha.cells[5].textContent;
    const parcelamento = linha.cells[6].textContent;

    document.getElementById('id').value = id;
    document.getElementById('select_fornecedor').value = fornecedor;
    document.getElementById('descricao').value = descricao;
    document.getElementById('valor').value = valor;
    document.getElementById('data_operacao').value = formatDataUs(formatarData(data_operacao));//formatarData(data_operacao);
    document.getElementById('nota_fiscal').value = nota_fiscal;
    document.getElementById('parcelamento').value = parcelamento;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const fornecedor = document.getElementById("select_fornecedor").value;
    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value;
    const data_operacao = formatDataUs(document.getElementById("data_operacao").value);
    const nota_fiscal = document.getElementById("nota_fiscal").value;
    const parcelamento = document.getElementById("parcelamento").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            fornecedor,
            descricao,
            valor,
            data_operacao,
            nota_fiscal,
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
                alert("Saída financeira atualizada com sucesso!");
                getAPI(url);

            } else {
                alert("Erro ao atualizar os dados.");

            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            fornecedor,
            descricao,
            valor,
            data_operacao,
            nota_fiscal,
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
                alert("Saída financeira cadastrada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao cadastrar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
});

//DELETAR OS DADOS SELECIONADOS
document.getElementById("btn-excluir").addEventListener("click", async () => {

    //EXIBE UM ALERTA PEDINDO CONFIRMAÇÃO PARA EXCLUIR OS DADOS.

    const confirmacao = confirm("Tem certeza que deseja excluir?");

    if (confirmacao) {

        try {
            const id = document.getElementById("id").value;

            const response = await fetch(url + "/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (response.ok) {
                alert("Saída financeira deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar saída financeira. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

