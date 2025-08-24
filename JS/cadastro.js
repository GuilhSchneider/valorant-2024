//Função para enviar os dados POST - CREATE
function enviarDados() {

    //Obter os valores dos campos informados pelo usuário
    var nome = document.getElementById('inputNome').value
    var sobrenome = document.getElementById('inputSobrenome').value
    var rg = document.getElementById('inputRG').value
    var email = document.getElementById('inputEmail').value
    var senha = document.getElementById('inputSenha').value

    if(nome == "" || sobrenome == "" || rg == "" || email == "" || senha == ""){
        alert("Todos os campos devem estar completos!")
        return
    }

    //Enviar um função que puxa o valor de uma API - FETCH
    fetch('http://localhost:3000/cadastros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nome, sobrenome: sobrenome,rg: rg, email: email, senha: senha})
    })
    .then(resposta => resposta.JSON)
}