window.onload = function () {
    iniciarPagina("formLogin", "erro");
    carregarUsuario(); 
};

function iniciarPagina(formID, pErro) {
    const formulario = document.getElementById(formID);
    formulario.addEventListener("submit", function (evento) {
        let valido = validarDados(pErro);
        if (!valido) {
            evento.preventDefault(); 
        } else {
            evento.preventDefault(); 
            salvarJSON();
            carregarUsuario();
        }
    });
}

function validarDados(pErro) {
    let erros = [];

    if (!validarNomesDiferentes()) {
        erros.push("Nome e sobrenome devem ser diferentes.");
    }

    if (!validarSenha()) {
        erros.push("Corrija os problemas da senha.");
    }

    if (!validarIdade()) {
        erros.push("Você precisa ter pelo menos 14 anos.");
    }

    const divErro = document.getElementById(pErro);
    if (erros.length > 0) {
        divErro.innerHTML = erros.join("<br>");
        divErro.style.display = "block";
        return false;
    } else {
        divErro.innerHTML = "";
        divErro.style.display = "none";
        return true;
    }
}

function validarNomesDiferentes() {
    const nome = document.getElementById('userName').value.trim().toLowerCase();
    const sobrenome = document.getElementById('userSobrenome').value.trim().toLowerCase();
    return nome && sobrenome && nome !== sobrenome;
}

function validarSenha() {
    const senha = document.getElementById('userSenha').value;
    const erros = [];

    if (senha.length < 8) erros.push("A senha deve ter no mínimo 8 caracteres.");
    if (!/[A-Z]/.test(senha)) erros.push("A senha deve conter pelo menos uma letra maiúscula.");
    if (!/[0-9]/.test(senha)) erros.push("A senha deve conter pelo menos um número.");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(senha)) erros.push("A senha deve conter pelo menos um caractere especial.");

    const divErroSenha = document.getElementById('erroSenha');
    if (erros.length > 0) {
        divErroSenha.innerHTML = erros.join("<br>");
        divErroSenha.style.display = "block";
        return false;
    } else {
        divErroSenha.innerHTML = "";
        divErroSenha.style.display = "none";
        return true;
    }
}

function validarIdade() {
    const dataNascStr = document.getElementById('userData').value;
    if (!dataNascStr) return false;

    const hoje = new Date();
    const dataNasc = new Date(dataNascStr);
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }

    return idade >= 14;
}

function salvarJSON() {
    const dados = {
        nome: document.getElementById("userName").value.trim(),
        sobrenome: document.getElementById("userSobrenome").value.trim(),
        email: document.getElementById("userEmail").value.trim(),
        dataNascimento: document.getElementById("userData").value.trim()
    };

    localStorage.setItem("usuarioLogin", JSON.stringify(dados));
}

function carregarUsuario() {
    let userJSON = localStorage.getItem("usuarioLogin");

    if (!userJSON) return;

    const user = JSON.parse(userJSON);

    document.getElementById("infoUser").innerHTML = `
        <strong>Nome completo:</strong> ${user.nome} ${user.sobrenome}<br>
        <strong>E-mail:</strong> ${user.email}<br>
        <strong>Data de nascimento:</strong> ${user.dataNascimento}
    `;

    document.getElementById("userSection").style.display = "block";
}

function logout() {
    localStorage.removeItem("usuarioLogin");
    location.reload();
}
function login() {
    window.open("index.html", "_blank");

}
