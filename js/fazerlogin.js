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
        if (json.valido) {
            window.localStorage.setItem('usuario', login);
            window.localStorage.setItem('perfil',json.perfil);

            window.location.href = "telaprincipal.html";
        } else {
            const myModal = new bootstrap.Modal('#modal-login', {});
            myModal.show();
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});


