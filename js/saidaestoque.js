const url = "http://localhost:8080/saidasestoque";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(saidasestoque) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Data de Saída</th>
        </tr>
    </thead>
    `;

    for (let saidaestoque of saidasestoque) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        tab +=
            `

        <tr onclick="preencherFormulario(this)">
            <td scope="row">${saidaestoque.id}</td>
            <td>${saidaestoque.itemEstoque.descricao}</td>
            <td>${saidaestoque.quantidade}</td>
            <td>${formatter.format(saidaestoque.data_saida)}</td> 
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
    document.getElementById("quantidade").value = "";
    document.getElementById("data_saida").value = "";
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
    const quantidade = linha.cells[2].textContent;
    const data_saida = linha.cells[3].textContent;

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);

    document.getElementById('id').value = id;
    document.getElementById('select_item_estoque').value = itemEstoque;
    document.getElementById('quantidade').value = quantidade;
    document.getElementById('data_saida').value = formatDataUs(formatarData(data_saida));
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const itemEstoque = document.getElementById("select_item_estoque").value;
    const quantidade = document.getElementById("quantidade").value;
    const data_saida = document.getElementById("data_saida").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0
        const data = {
            itemEstoque,
            quantidade,
            data_saida,
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
                alert("Saída de estoque atualizada com sucesso!");
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
            quantidade,
            data_saida
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
                alert("Saída de estoque cadastrada com sucesso!");
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
                alert("Saída de estoque deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar saída de estoque. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

