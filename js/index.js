
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
//ARMAZENA O USUARIO INFORMADO NO LOGIN PARA SER EXIBIDO NA TELA PRINCIPAL
function armazenarUsuario() {
    var inputLogin = document.getElementById("usuario").value;
    localStorage.setItem("valor", inputLogin);
  }

  function mostrarUsuario(){
    var valorArmazenado = localStorage.getItem("valor");
        let mostrar = "<h5>Usuário: </h5><span> " + valorArmazenado +"</span>";
        document.getElementById("usuarioOnline").innerHTML = mostrar;
      }
