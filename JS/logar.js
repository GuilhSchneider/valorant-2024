const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
var usuarioCadastrado = false;

function entrar() {
    var valorIncorreto = document.getElementById("incorreto");

    fetch("https://raw.githubusercontent.com/GuilhSchneider/API-Valorant/refs/heads/main/db.json")
        .then(response => response.json())
        .then(usuarios => {

            // Admin fixo
            if (inputEmail.value === "admin@admin" && inputSenha.value === "0000") {
                window.location.href = 'cadastrados.html';
                usuarioCadastrado = true;
                return; // já sai da função
            }

            // Verifica usuários do JSON
            usuarios.forEach(pessoa => {
                if (inputEmail.value === pessoa.email && inputSenha.value === pessoa.senha) {
                    usuarioCadastrado = true;
                    window.location.href = 'index.html';
                }
            });

            // Só mostra erro depois de verificar todos
            if (!usuarioCadastrado) {
                valorIncorreto.style.opacity = 1;
            }
        });
}
