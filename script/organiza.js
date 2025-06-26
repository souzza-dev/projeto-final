window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || !usuario.nome) {
    window.location.href = "../index.html";
    return;
  }

  document.getElementById("boas-vindas").innerText = `Bem-vindo, ${usuario.nome}!`;
  aplicarTemaSalvo();
  carregarProdutos();
});

function logout() {
  window.location.href = "../index.html";
}

function adicionarProduto() {
  const nome = document.getElementById("produto-nome").value.trim();
  const quantidade = parseInt(document.getElementById("produto-quantidade").value);
  const categoria = document.getElementById("produto-categoria").value.trim();

  if (!nome || isNaN(quantidade) || !categoria) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novoProduto = { nome, quantidade, categoria };
  const lista = JSON.parse(localStorage.getItem("estoque")) || [];
  lista.push(novoProduto);
  localStorage.setItem("estoque", JSON.stringify(lista));

  resetarFormulario();
  carregarProdutos();
}

function carregarProdutos() {
  const lista = JSON.parse(localStorage.getItem("estoque")) || [];
  const tbody = document.getElementById("lista-produtos");
  tbody.innerHTML = "";

  lista.forEach((produto, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>${produto.categoria}</td>
      <td>
        <button class="editar" onclick="editarProduto(${index})">✏️</button>
        <button class="excluir" onclick="excluirProduto(${index})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function excluirProduto(index) {
  const lista = JSON.parse(localStorage.getItem("estoque")) || [];
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    lista.splice(index, 1);
    localStorage.setItem("estoque", JSON.stringify(lista));
    carregarProdutos();
  }
}

function editarProduto(index) {
  const lista = JSON.parse(localStorage.getItem("estoque")) || [];
  const produto = lista[index];

  document.getElementById("produto-nome").value = produto.nome;
  document.getElementById("produto-quantidade").value = produto.quantidade;
  document.getElementById("produto-categoria").value = produto.categoria;

  const botao = document.querySelector(".cadastro button");
  botao.innerText = "Salvar";
  botao.onclick = function () {
    produto.nome = document.getElementById("produto-nome").value.trim();
    produto.quantidade = parseInt(document.getElementById("produto-quantidade").value);
    produto.categoria = document.getElementById("produto-categoria").value.trim();

    if (!produto.nome || isNaN(produto.quantidade) || !produto.categoria) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    lista[index] = produto;
    localStorage.setItem("estoque", JSON.stringify(lista));
    resetarFormulario();
    carregarProdutos();
  };
}

function resetarFormulario() {
  document.getElementById("produto-nome").value = "";
  document.getElementById("produto-quantidade").value = "";
  document.getElementById("produto-categoria").value = "";

  const botao = document.querySelector(".cadastro button");
  botao.innerText = "Adicionar";
  botao.onclick = adicionarProduto;
}

// Tema
function alternarTema() {
  document.body.classList.toggle("tema-escuro");

  const temaAtual = document.body.classList.contains("tema-escuro") ? "escuro" : "claro";
  localStorage.setItem("tema", temaAtual);

  document.getElementById("botao-tema").innerText = temaAtual === "escuro" ? "☀️" : "🌙";
}

function aplicarTemaSalvo() {
  const tema = localStorage.getItem("tema");
  const botaoTema = document.getElementById("botao-tema");

  if (tema === "escuro") {
    document.body.classList.add("tema-escuro");
    botaoTema.innerText = "☀️";
  } else {
    botaoTema.innerText = "🌙";
  }
}
