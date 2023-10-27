function validarLogin(){
    const usuarioTeste = 'teste';
    const senhaTeste = '123'; 

    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    if(usuarioTeste == usuario && senhaTeste == senha){
        window.location.href = 'telaprincipal.html';
        armazenarUsuario();
        document.getElementById("usuario").value = "";
        document.getElementById("senha").value = "";
    }
    else{
        const myModal = new bootstrap.Modal('#modal-login', { }); 
        myModal.show();
    }
}

const url = "http://localhost:8080/usuario/validar-login";
document.getElementById("btn-login").addEventListener("click", async () => {
    const login = document.getElementById("usuario").value;
    const password = document.getElementById("senha").value;

        const data = {
            login,
            password
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
                
            });
            console.log(login, password);
            const json = await response.json();
            if (json) {
                console.log(json);
                alert("Usuário validado com sucesso!");
                window.location.href = "telaprincipal.html";
            } else {
                console.log(json);
                alert("Erro ao validar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
});


