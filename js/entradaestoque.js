const url = "http://localhost:8080/entradaestoque";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(entradasestoque) {
    let tab =
        `
        <thead>
    <tr onclick="preencherFormulario(this)">
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Data de Entrada</th>
            <th scope="col">Fornecedor</th>
        </tr>
    </thead>
    `;

    for (let entradaestoque of entradasestoque) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);

        tab +=
            `

        <tr onclick="preencherFormulario(this)">
            <td scope="row">${entradaestoque.id}</td>
            <td>${entradaestoque.itemEstoque.descricao}</td>
            <td>${entradaestoque.nome}</td>
            <td>${entradaestoque.quantidade}</td>
            <td>${entradaestoque.valor_unitario}</td>
            <td>${formatter.format(entradaestoque.data_entrada)}</td> 
            <td>${entradaestoque.fornecedor.nome}</td>
        </tr>
        `;
    }

    document.getElementById("bodytabela").innerHTML = tab;
}

//CARREGA OS DADOS DO BACKEND E DISPONIBILIZA PARA SER EXIBIDO NA TABELA
async function getAPI(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();
    
    if (response) {
        show(data);
    }
}

getAPI(url);

//LIMPAR OS CAMPOS
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("select_item_estoque").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor_unitario").value = "";
    document.getElementById("data_entrada").value = "";
    document.getElementById("select_fornecedor").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar'
}

//FORMATAR DATA BÁSICO
function formatarData(datas) {

    const data = new Date(datas.split('/').reverse().join('-'));
    const dataAmericana = data.toLocaleDateString('en-US');

    let data1 = new Date(dataAmericana);
    return dataFormatada = (data1.getFullYear() + "-" + ((data1.getMonth() + 1)) + "-" + (data1.getDate()));
}

//FORMATADOR DE DATAS PADRÃO AMERICANO QUE EXIBE OS NUMEROS 0 - COMPLEMENTA O formatarData:
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
    const itemEstoque = linha.cells[1].textContent;
    const nome = linha.cells[2].textContent;
    const quantidade = linha.cells[3].textContent;
    const valor_unitario = linha.cells[4].textContent;
    const data_entrada = linha.cells[5].textContent;
    const fornecedor = linha.cells[6].textContent;

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);

    document.getElementById('id').value = id;
    document.getElementById('select_item_estoque').value = itemEstoque;
    document.getElementById('nome').value = nome;
    document.getElementById('quantidade').value = quantidade;
    document.getElementById('valor_unitario').value = valor_unitario;
    document.getElementById('data_entrada').value = formatDataUs(formatarData(data_entrada));
    document.getElementById('select_fornecedor').value = fornecedor;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const itemEstoque = document.getElementById("select_item_estoque").value;
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const valor_unitario = document.getElementById("valor_unitario").value;
    const data_entrada = formatDataUs(document.getElementById("data_entrada").value);
    const fornecedor = document.getElementById("select_fornecedor").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0
        const data = {
            itemEstoque,
            nome,
            quantidade,
            valor_unitario,
            data_entrada,
            fornecedor,
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
                alert("Entrada de estoque atualizada com sucesso!");
                getAPI(url);

            } else {
                alert("Erro ao atualizar os dados.");

            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            itemEstoque,
            nome,
            quantidade,
            valor_unitario,
            data_entrada,
            fornecedor
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
                alert("Entrada de estoque cadastrada com sucesso!");
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
                alert("Entrada de estoque deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar entrada de estoque. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

