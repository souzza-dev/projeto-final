function cadastrar() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
    exibirMensagem("Preencha todos os campos!");
    return;
  }

  const usuario = { nome, email, senha };
  localStorage.setItem("usuario", JSON.stringify(usuario));
  exibirMensagem("Cadastro realizado com sucesso!", true);
}

function logar() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value.trim();
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioSalvo) {
    exibirMensagem("Nenhum usuário cadastrado.");
    return;
  }

  if (usuarioSalvo.email === email && usuarioSalvo.senha === senha) {
     window.location.href = "../pages/organiza.html";
  } else {
    exibirMensagem("Email ou senha incorretos.");
  }
}

function exibirMensagem(msg, sucesso = false) {
  const el = document.getElementById("mensagem");
  el.style.color = sucesso ? "green" : "red";
  el.innerText = msg;
}
