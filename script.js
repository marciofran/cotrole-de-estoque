let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

function salvarEstoque() {
    localStorage.setItem('estoque', JSON.stringify(estoque));
}

function adicionarPeca() {
    const nome = document.getElementById('nome').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (nome && quantidade > 0 && preco > 0) {
        estoque.push({ nome, quantidade, preco });
        atualizarTabela();
        limparCampos();
        salvarEstoque();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function atualizarTabela() {
    const tabelaEstoque = document.getElementById('tabelaEstoque').getElementsByTagName('tbody')[0];
    tabelaEstoque.innerHTML = '';

    estoque.forEach((item, index) => {
        let novaLinha = tabelaEstoque.insertRow();
        let celulaNome = novaLinha.insertCell(0);
        let celulaQuantidade = novaLinha.insertCell(1);
        let celulaPreco = novaLinha.insertCell(2);
        let celulaAcoes = novaLinha.insertCell(3);

        celulaNome.textContent = item.nome;
        celulaQuantidade.textContent = item.quantidade;
        celulaPreco.textContent = `R$ ${item.preco.toFixed(2)}`;

        celulaAcoes.innerHTML = `
            <button class="btn btn-edit" onclick="editarPeca(${index})">Editar</button>
            <button class="btn btn-delete" onclick="removerPeca(${index})">Remover</button>
        `;
    });
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
}

function buscarPeca() {
    const nomeBusca = document.getElementById('buscar').value.toLowerCase();
    const resultado = estoque.find(item => item.nome.toLowerCase() === nomeBusca);

    const resultadoBusca = document.getElementById('resultadoBusca');
    resultadoBusca.innerHTML = '';

    if (resultado) {
        resultadoBusca.innerHTML = `
            <p><strong>Nome:</strong> ${resultado.nome}</p>
            <p><strong>Quantidade:</strong> ${resultado.quantidade}</p>
            <p><strong>Preço:</strong> R$ ${resultado.preco.toFixed(2)}</p>
        `;
    } else {
        resultadoBusca.innerHTML = '<p>Peça não encontrada.</p>';
    }
}

function editarPeca(index) {
    const item = estoque[index];
    document.getElementById('nome').value = item.nome;
    document.getElementById('quantidade').value = item.quantidade;
    document.getElementById('preco').value = item.preco;

    removerPeca(index);
}

function removerPeca(index) {
    estoque.splice(index, 1);
    atualizarTabela();
    salvarEstoque();
}

// Inicializa a tabela ao carregar a página
atualizarTabela();
