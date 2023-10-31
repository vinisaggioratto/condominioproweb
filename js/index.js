//ARMAZENA O USUARIO INFORMADO NO LOGIN PARA SER EXIBIDO NA TELA PRINCIPAL      
const usuarioOnline = document.getElementById('usuarioOnline');
const usuario = window.localStorage.getItem('usuario');
if (usuario) {
    usuarioOnline.innerHTML = usuario;
}
