// Função para carregar os comentários
function carregarComentarios(pagina) {
    const comentariosContainer = document.getElementById('comentarios-container');
    const colunas = comentariosContainer.querySelectorAll('.comentario-coluna');

    colunas.forEach(coluna => coluna.innerHTML = ''); // Limpa as colunas

    const comentarios = JSON.parse(localStorage.getItem(`comentarios_${pagina}`)) || [];

    comentarios.forEach((comentario, index) => {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.className = 'comentario-item';
        comentarioDiv.innerHTML = `
            <p><span class="nome">${comentario.nome}</span></p>
            <p>${comentario.comentario}</p>
        `;
        colunas[index % 3].appendChild(comentarioDiv); // Distribui os comentários entre as 3 colunas
    });
}

// Função para salvar um novo comentário
function salvarComentario(event, pagina) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;

    if (nome && comentario) {
        const comentarios = JSON.parse(localStorage.getItem(`comentarios_${pagina}`)) || [];
        comentarios.push({ nome, comentario });
        localStorage.setItem(`comentarios_${pagina}`, JSON.stringify(comentarios));

        // Limpa o formulário
        document.getElementById('nome').value = '';
        document.getElementById('comentario').value = '';

        // Recarrega os comentários
        carregarComentarios(pagina);
    }
}

// Adiciona o evento de submit ao formulário
function configurarFormulario(pagina) {
    document.querySelector('.form-coment-paises').addEventListener('submit', function(event) {
        salvarComentario(event, pagina);
    });
}

// Carrega os comentários ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const pagina = document.title.replace(/\s+/g, '_'); // Usando o título da página como identificador
    carregarComentarios(pagina);
    configurarFormulario(pagina);
});




//formulario contatos
document.getElementById('contato-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const mensagens = JSON.parse(localStorage.getItem('mensagens_contato')) || [];
    mensagens.push({ nome, email, mensagem });
    localStorage.setItem('mensagens_contato', JSON.stringify(mensagens));

    alert('Mensagem enviada com sucesso!');
    document.getElementById('contato-form').reset();
});