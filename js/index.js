$(document).ready(function () {
    $('#container-login').hide();
});

function mostrarLogin(){
    $('#container-login').show();
}
function validarLogin(){
    const usuarioTeste = 'Vinicius';
    const senhaTeste = '123'; 

    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    if(usuarioTeste == usuario && senhaTeste == senha){
        window.open('telaprincipal.html');
        armazenarUsuario();
    }
    else{
        const myModal = new bootstrap.Modal('#modal-login', { }); 
        myModal.show();
    }
}

function armazenarUsuario() {
    var inputLogin = document.getElementById("usuario").value;
    localStorage.setItem("valor", inputLogin);
  }

  function mostrarUsuario(){
    var valorArmazenado = localStorage.getItem("valor");
        let mostrar = "<h5>Usuário: </h5><span> " + valorArmazenado +"</span>";
        document.getElementById("usuarioOnline").innerHTML = mostrar;
      }
