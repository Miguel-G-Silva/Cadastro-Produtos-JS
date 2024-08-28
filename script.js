const form = document.getElementById("form");
const nomeProduto = document.getElementById("nome-produto");
const precoProduto = document.getElementById("preco-produto");
const categoriaProduto = document.getElementById("cat-produto");
const productTableBody = document.getElementById("produtos-mostrados");
const tituloFormulario = document.getElementById("titulo-formulario");

let produtoEditando = null;

form.addEventListener("submit", addProduto);

function addProduto(event) {
    event.preventDefault();

    const produto = {
        nome: nomeProduto.value,
        preco: precoProduto.value,
        categoria: categoriaProduto.value
    };

    if (!produto.nome || !produto.preco || !produto.categoria) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (produtoEditando) {
        updateProdutoTabela(produto);
        updateProdutoLocalStorage(produto);
        tituloFormulario.textContent = "Adicionar Produto";
    } else {
        addProdutoTabela(produto);
        saveProduto(produto);
    }

    form.reset();
    produtoEditando = null;
}

function addProdutoTabela(produto) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>${produto.categoria}</td>
        <td>
            <button class="editar">Editar</button>
            <button class="remover">Remover</button>
        </td>
    `;

    row.querySelector('.editar').addEventListener('click', () => {
        editProduto(row, produto);
    });

    row.querySelector('.remover').addEventListener('click', () => {
        removeProduto(row, produto);
    });

    productTableBody.appendChild(row);
}

function saveProduto(produto) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function loadProdutos() {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.forEach(produto => addProdutoTabela(produto));
}

function removeProduto(row, produto) {
    row.remove();

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.filter(p => p.nome !== produto.nome || p.preco !== produto.preco || p.categoria !== produto.categoria);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function editProduto(row, produto) {
    nomeProduto.value = produto.nome;
    precoProduto.value = produto.preco;
    categoriaProduto.value = produto.categoria;
    produtoEditando = produto;

    tituloFormulario.textContent = "Editar Produto"; 
    row.remove();
    removeProduto(row, produto);
}

function updateProdutoTabela(produto) {
    addProdutoTabela(produto);
}

function updateProdutoLocalStorage(produto) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

document.addEventListener('DOMContentLoaded', loadProdutos);