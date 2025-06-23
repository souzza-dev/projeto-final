// Tema
const temaBtn = document.getElementById("btnTema");

if (localStorage.getItem("tema") === "escuro") {
  document.body.classList.add("dark-mode");
  temaBtn.textContent = "☀️ Tema Claro";
}
temaBtn.addEventListener("click", () => {
  const escuro = document.body.classList.toggle("dark-mode");
  temaBtn.style.color = escuro ? "white" : "black";
  temaBtn.textContent = escuro ? "☀️ Tema Claro" : "🌙 Tema Escuro";
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
});

// Estoque
let produtos = JSON.parse(localStorage.getItem("estoque")) || [];

function salvar() {
  localStorage.setItem("estoque", JSON.stringify(produtos));
  render();
}

function render() {
  const tabela = document.getElementById("tabelaProdutos");
  tabela.innerHTML = "";

  produtos.forEach((p, i) => {
    const alerta = p.quantidade <= 2 ? 'style="color:red;"' : "";
    tabela.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td ${alerta}>${p.quantidade}</td>
        <td>
          <button onclick="adicionar(${i})">➕</button>
          <button onclick="remover(${i})">➖</button>
          <button onclick="excluir(${i})" style="background-color: var(--danger); color: white;">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function adicionar(index) {
  produtos[index].quantidade++;
  salvar();
}

function remover(index) {
  if (produtos[index].quantidade > 0) {
    produtos[index].quantidade--;
    salvar();
  }
}

function excluir(index) {
  if (confirm("Deseja realmente excluir este produto?")) {
    produtos.splice(index, 1);
    salvar();
  }
}

document.getElementById("formProduto").addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const quantidade = parseInt(document.getElementById("quantidade").value);

  if (!nome || isNaN(quantidade)) return;

  produtos.push({ nome, quantidade });
  salvar();
  e.target.reset();
});

render();
