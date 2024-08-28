const formulario = document.getElementById("form");
const nomeProduto = document.getElementById("nome-produto");
const precoProduto = document.getElementById("preco-produto");
const categoriaProduto = document.getElementById("cat-produto");
const corpoTabelaProdutos = document.getElementById("produtos-mostrados");
const tituloFormulario = document.getElementById("titulo-formulario");

let produtoEditando = null;

formulario.addEventListener("submit", adicionarProduto);

function adicionarProduto(evento) {
    evento.preventDefault();

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
        atualizarProdutoTabela(produto);
        atualizarProdutoLocalStorage(produto);
        tituloFormulario.textContent = "Adicionar Produto";
    } else {
        adicionarProdutoTabela(produto);
        salvarProduto(produto);
    }

    formulario.reset();
    produtoEditando = null;
}

function adicionarProdutoTabela(produto) {
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>${produto.categoria}</td>
        <td>
            <button class="editar">Editar</button>
            <button class="remover">Remover</button>
        </td>
    `;

    linha.querySelector('.editar').addEventListener('click', () => {
        editarProduto(linha, produto);
    });

    linha.querySelector('.remover').addEventListener('click', () => {
        removerProduto(linha, produto);
    });

    corpoTabelaProdutos.appendChild(linha);
}

function salvarProduto(produto) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.forEach(produto => adicionarProdutoTabela(produto));
}

function removerProduto(linha, produto) {
    linha.remove();

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.filter(p => p.nome !== produto.nome || p.preco !== produto.preco || p.categoria !== produto.categoria);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function editarProduto(linha, produto) {
    nomeProduto.value = produto.nome;
    precoProduto.value = produto.preco;
    categoriaProduto.value = produto.categoria;
    produtoEditando = produto;

    tituloFormulario.textContent = "Editar Produto"; 
    linha.remove();
    removerProduto(linha, produto);
}

function atualizarProdutoTabela(produto) {
    adicionarProdutoTabela(produto);
}

function atualizarProdutoLocalStorage(produto) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

document.addEventListener('DOMContentLoaded', carregarProdutos);