const url = "http://localhost:8080/manutencoes";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(manutencoes) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Manutenção</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data Inicial</th>
            <th scope="col">Data Final</th>
            <th scope="col">Fornecedor</th>
        </tr>
    </thead>
    `;

    for (let manutencao of manutencoes) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${manutencao.id}</td>
            <td>${manutencao.nome}</td>
            <td>${manutencao.descricao}</td>
            <td>${Math.round(manutencao.valor).toFixed(2)}</td>
            <td>${formatter.format(manutencao.data_inicial)}</td> 
            <td>${formatter.format(manutencao.data_final)}</td> 
            <td>${manutencao.fornecedor.nome}</td>
        </tr>
        `;
    }

    document.getElementById("bodytabela").innerHTML = tab;
}

//CARREGAR O TOTAL DE ENTRADAS FINANCEIRAS
function total(manutencoes) {

    let tab = "";
    let total = 0;
    for (let manutencao of manutencoes) {
        total = total + manutencao.valor;
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
    document.getElementById("manutencao_nome").value = "";
    document.getElementById("manutencao_descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data_inicial").value = "";
    document.getElementById("data_final").value = "";
    document.getElementById("select_fornecedor").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
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
    const manutencao_nome = linha.cells[1].textContent;
    const manutencao_descricao = linha.cells[2].textContent;
    const valor = linha.cells[3].textContent;
    const data_inicial = linha.cells[4].textContent;
    const data_final = linha.cells[5].textContent;
    const select_fornecedor = linha.cells[6].textContent;

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);

    document.getElementById('id').value = id;
    document.getElementById('manutencao_nome').value = manutencao_nome;
    document.getElementById('manutencao_descricao').value = manutencao_descricao;
    document.getElementById('valor').value = valor;
    document.getElementById('data_inicial').value = formatDataUs(formatarData(data_inicial));
    document.getElementById('data_final').value = formatDataUs(formatarData(data_final));
    document.getElementById('select_fornecedor').value = select_fornecedor;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("manutencao_nome").value;
    const descricao = document.getElementById("manutencao_descricao").value;
    const valor = document.getElementById("valor").value;
    const data_inicial = formatDataUs(document.getElementById("data_inicial").value);
    const data_final = formatDataUs(document.getElementById("data_final").value);
    const fornecedor = document.getElementById("select_fornecedor").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            nome,
            descricao,
            valor,
            data_inicial,
            data_final,
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
                alert("Manutenção atualizado com sucesso!");
                getAPI(url);

            } else {
                alert("Erro ao atualizar os dados.");

            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            nome,
            descricao,
            valor,
            data_inicial,
            data_final,
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
                alert("Manutenção cadastrada com sucesso!");
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
                alert("Manutenção deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar manutenção. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

