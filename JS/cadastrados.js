fetch("http://localhost:3000/cadastros")
    .then(resposta => resposta.json())
    .then(dados => {
        // Selecionando a tabela
        var tabelaCorpo = document.getElementById("tableCadastros");
        tabelaCorpo.innerHTML = ""
        // Uma linha da tabela para cada objeto
        dados.forEach(objeto => {
            var tr = document.createElement('tr');
            var tdNome = document.createElement('td');
            var tdSobrenome = document.createElement('td');
            var tdRG = document.createElement('td');
            var tdEmail = document.createElement('td');
            var tdSenha = document.createElement('td');

            // Preenchendo as células com as informações
            tdNome.innerHTML = objeto.nome;
            tdSobrenome.innerHTML = objeto.sobrenome;
            tdRG.innerHTML = objeto.rg;
            tdEmail.innerHTML = objeto.email;
            tdSenha.innerHTML = objeto.senha;

            tr.appendChild(tdNome);
            tr.appendChild(tdSobrenome);
            tr.appendChild(tdRG);
            tr.appendChild(tdEmail);
            tr.appendChild(tdSenha);

            tabelaCorpo.appendChild(tr);
        });
    })

function buscarDados() {
    var rg = document.getElementById("inputRGBusca").value;
    fetch("http://localhost:3000/cadastros", {
        method: 'GET',
    })
        .then(response => response.json())
        .then(dados => {
            // Encontra a pessoa com o RG correspondente
            var pessoaEncontrada = dados.find(pessoa => pessoa.rg == rg);
            if (pessoaEncontrada) {
                document.getElementById("inputNomeAtualizar").value = pessoaEncontrada.nome
                document.getElementById("inputSobrenomeAtualizar").value = pessoaEncontrada.sobrenome
                document.getElementById("inputEmailAtualizar").value = pessoaEncontrada.email
                document.getElementById("inputSenhaAtualizar").value = pessoaEncontrada.senha
            }
        })
}

function atualizarDados() {
    var rg = document.getElementById("inputRGBusca").value;

    var nome = document.getElementById("inputNomeAtualizar").value;
    var sobrenome = document.getElementById("inputSobrenomeAtualizar").value;
    var email = document.getElementById("inputEmailAtualizar").value;
    var senha = document.getElementById("inputSenhaAtualizar").value;
    var id

    if (nome == "" || sobrenome == "" || email == "" || senha == "") {
        alert("Todos os campos devem estar completos!")
        return
    }

    fetch(`http://localhost:3000/cadastros/`).then(response => response.json()).then(dados => {
        var pessoaEncontrada = dados.find(pessoa => pessoa.rg == rg);
        if (pessoaEncontrada) {
            console.log(pessoaEncontrada.id)
            id = pessoaEncontrada.id
        } else {
            return
        }

        fetch(`http://localhost:3000/cadastros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                sobrenome: sobrenome,
                rg: rg,
                email: email,
                senha: senha
            })
        })
    })
}

function criarUsuário(){
    var rg = document.getElementById("inputRGBusca").value;
    var nome = document.getElementById("inputNomeAtualizar").value;
    var sobrenome = document.getElementById("inputSobrenomeAtualizar").value;
    var email = document.getElementById("inputEmailAtualizar").value;
    var senha = document.getElementById("inputSenhaAtualizar").value;
    
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

function deletarCadastro() {
    var rg = document.getElementById("inputRGBusca").value
    var id

    fetch(`http://localhost:3000/cadastros/`).then(response => response.json()).then(dados => {
        var pessoaEncontrada = dados.find(pessoa => pessoa.rg == rg);
        if (pessoaEncontrada) {
            console.log(pessoaEncontrada.id)
            id = pessoaEncontrada.id
        } else {
            return
        }

        fetch(`http://localhost:3000/cadastros/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
    })
}