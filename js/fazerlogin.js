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


