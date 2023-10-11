const url = "http://localhost:8080/sindico";


function show(sindicos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Data Inicial</th>
            <th scope="col">Data Final Prevista</th>
            <th scope="col">Data Final</th>
            <th scope="col">Ativo</th>
        </tr>
    </thead>
    `;

    for (let sindico of sindicos) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);

        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${sindico.sindico_id}</td>
            <td>${sindico.condomino}</td>
            <td>${formatter.format(sindico.data_inicial)}</td>
            <td>${formatter.format(sindico.data_final_prevista)}</td>
            <td>${formatter.format(sindico.data_final)}</td>
            <td>${sindico.ativo}</td>
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

//
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("select-condomino").value = "";
    document.getElementById("data_inicial").value = "";
    document.getElementById("data_final_prevista").value = "";
    document.getElementById("data_final").value = "";
    document.getElementById("select_cadastro2").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const condomino = linha.cells[1].textContent;
    const data_inicial = linha.cells[2].textContent;
    const data_final_prevista = linha.cells[3].textContent;
    const data_final = linha.cells[4].textContent;
    const select_cadastro = linha.cells[5].textContent;

    console.log("Data inicial valor original: " + data_inicial);

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);
    console.log(formattedDate);

    //converte para o padrão americano funcionando
    /**/
    function formatarData(datas) {

        const data = new Date(datas.split('/').reverse().join('-'));
        const dataAmericana = data.toLocaleDateString('en-US');

        let data1 = new Date(dataAmericana);
        let dataFormatada = "";
        return dataFormatada = (data1.getFullYear() + "-" + ((data1.getMonth() + 1)) + "-" + (data1.getDate()));
    }
    
/*PESQUISAR A BIBLIOTECA MOMENT.JS 

VAI MOSTRAR A DATA COM O FUSOHORARIO CORRETO.
const data = moment(data_inicial, 'DD/MM/YYYY').utcOffset('-03:00');
const dataAmericana = data.format('YYYY-MM-DD');

*/
    document.getElementById('id').value = id;
    document.getElementById('select-condomino').value = condomino;
    document.getElementById('data_inicial').value = formatarData(data_inicial);
    document.getElementById('data_final_prevista').value = formatarData(data_final_prevista);
    document.getElementById('data_final').value = formatarData(data_final);
    document.getElementById('select_cadastro2').value = select_cadastro;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

