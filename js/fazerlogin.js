function validarLogin(){
    const usuarioTeste = 'teste';
    const senhaTeste = '123'; 

    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    if(usuarioTeste == usuario && senhaTeste == senha){
        window.location.href = 'telaprincipal.html';
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
            const json = await response.json();
            if (json) {
                alert("Usuário validado com sucesso!");
                window.location.href = "telaprincipal.html";
            } else {
                const myModal = new bootstrap.Modal('#modal-login', { }); 
                myModal.show();
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
});


