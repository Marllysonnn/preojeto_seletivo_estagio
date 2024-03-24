// Fechar o cadastro de produtos
function fecharFormulario() {
    let formulario = document.getElementById('formulario');
    let opacy = document.getElementById('opacy');
    formulario.style.display = 'none';
    opacy.style.display = 'none';
}

// mostrar o formulário de registro de produtos
function mostrarFormulario() {
    let formulario = document.getElementById('formulario');
    let opacy = document.getElementById('opacy');
    if (formulario.style.display === 'block') {
        formulario.style.display = 'none';
    } else {
        formulario.style.display = 'block';
        formulario.style.position = 'absolute';
        opacy.style.display = 'flex';
    }
}

// registrar o produto
function registrarProduto() {
    let nome = document.getElementById('nomeProduto').value;
    let valor = document.getElementById('valorProduto').value;
    let disponivelVenda = document.getElementById('disponivelVenda').value;

    if (nome && valor) {
        let produto = {
            nome: nome,
            valor: parseFloat(valor),
            disponivelVenda: disponivelVenda
        };

        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));

        exibirProdutos();
        limparFormulario();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// exibir os produtos
function exibirProdutos() {
    let tabelaProdutos = document.getElementById('tabelaProdutos');
    tabelaProdutos.innerHTML = '';

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos.sort((a, b) => a.valor - b.valor); // ordena os produtos pelo valor

    produtos.forEach(produto => {
        let row = tabelaProdutos.insertRow();
        row.insertCell(0).textContent = produto.nome;
        row.insertCell(1).textContent = produto.valor.toFixed(2);
        row.insertCell(2).textContent = produto.disponivelVenda === 'sim' ? 'Sim' : 'Não';
        
        let img = document.createElement('img');
        img.src = 'https://cdn-icons-png.flaticon.com/512/17/17152.png';
        img.alt = 'Excluir';
        img.title = 'Excluir';
        img.style.cursor = 'pointer';
        img.style.width = '0.8em'
        img.onclick = function() {
            excluirProduto(produto);
        };

        let cell = row.insertCell(3);
        cell.appendChild(img);
    });
}

// excluir um produto
function excluirProduto(produto) {
    let confirmar = confirm(`Tem certeza que deseja excluir o produto ${produto.nome}?`);
    if (confirmar) {
        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos = produtos.filter(p => p.nome !== produto.nome);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        exibirProdutos();
    }
}

// limpar formulário
function limparFormulario() {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('valorProduto').value = '';
}

// exibir os produtos ao carregar a página
exibirProdutos();
