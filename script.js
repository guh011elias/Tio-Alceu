const btnTema = document.querySelector('#btn-tema');

const inputNome = document.querySelector('#input-nome');
const mensagemBoasVindas = document.querySelector('#mensagem-boas-vindas');

const imagemProduto = document.querySelector('#imagem-produto');
const nomeProduto = document.querySelector('#nome-produto');
const descricaoProduto = document.querySelector('#descricao-produto');
const precoItem = document.querySelector('#preco-item');
const btnMudarProduto = document.querySelector('#btn-mudar-produto');

const btnAdicionar = document.querySelector('#btn-adicionar');
const qtdItens = document.querySelector('#qtd-itens');
const subtotalValor = document.querySelector('#subtotal-valor');
const inputCupom = document.querySelector('#input-cupom');
const btnMostrarSenha = document.querySelector('#btn-mostrar-senha');
const btnAplicarCupom = document.querySelector('#btn-aplicar-cupom');
const mensagemCupom = document.querySelector('#mensagem-cupom');
const valorTotal = document.querySelector('#valor-total');
const btnFinalizar = document.querySelector('#btn-finalizar');
const statusCompra = document.querySelector('#status-compra');

const contadorTempo = document.querySelector('#contador-tempo');
const btnPausarTempo = document.querySelector('#btn-pausar-tempo');

const listaLanches = [
    {
        nome: "Hambúrguer Artesanal",
        descricao: "Pão brioche, 180g de carne artesanal e queijo cheddar.",
        preco: 20.00,
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop"
    },
    {
        nome: "Batata Frita Crocante",
        descricao: "Porção individual de batatas fritas bem sequinhas.",
        preco: 12.00,
        imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop"
    },
    {
        nome: "Refrigerante Gelado",
        descricao: "Lata de 350ml trincando de gelada.",
        preco: 6.00,
        imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop"
    }
];

let posicaoAtual = 0;
let subtotal = 0;
let quantidade = 0;
let descontoAplicado = false;
let promocaoValida = true;
let tempoRestante = 30; 
let intervalID = null;

btnTema.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

inputNome.addEventListener('input', function() {
    const nome = inputNome.value;
    if (nome === "") {
        mensagemBoasVindas.innerText = "Bem-vindo(a), Cliente!";
    } else {
        mensagemBoasVindas.innerText = "Bem-vindo(a), " + nome + "!";
    }
});

btnMostrarSenha.addEventListener('click', function() {
    if (inputCupom.type === 'password') {
        inputCupom.type = 'text';
        btnMostrarSenha.innerText = 'Ocultar';
    } else {
        inputCupom.type = 'password';
        btnMostrarSenha.innerText = 'Ver';
    }
});

btnAdicionar.addEventListener('mouseover', function() {
    btnAdicionar.classList.add('destaque-hover');
});

btnAdicionar.addEventListener('mouseout', function() {
    btnAdicionar.classList.remove('destaque-hover');
});

btnMudarProduto.addEventListener('click', function() {
    posicaoAtual = posicaoAtual + 1;
    if (posicaoAtual >= listaLanches.length) {
        posicaoAtual = 0;
    }

    const lanche = listaLanches[posicaoAtual];
    nomeProduto.innerText = lanche.nome;
    descricaoProduto.innerText = lanche.descricao;
    precoItem.innerText = lanche.preco;
    imagemProduto.src = lanche.imagem;
});

function atualizarTotais() {
    qtdItens.innerText = quantidade;
    subtotalValor.innerText = subtotal;

    let totalFinal = subtotal;

    if (descontoAplicado) {
        totalFinal = subtotal * 0.9;
    }

    valorTotal.innerText = totalFinal;

    if (quantidade > 0) {
        btnFinalizar.disabled = false;
    } else {
        btnFinalizar.disabled = true;
    }
}

btnAdicionar.addEventListener('click', function() {
    const lanche = listaLanches[posicaoAtual];
    subtotal = subtotal + lanche.preco;
    quantidade = quantidade + 1;
    atualizarTotais();
});

btnAplicarCupom.addEventListener('click', function() {
    const cupomDigitado = inputCupom.value;

    if (!promocaoValida) {
        mensagemCupom.innerText = "A promoção expirou!";
    } else if (cupomDigitado === "DESCONTO10") { 
        descontoAplicado = true;
        mensagemCupom.innerText = "Desconto de 10% aplicado!";
        atualizarTotais();
    } else {
        mensagemCupom.innerText = "Cupom inválido!";
    }
});

btnFinalizar.addEventListener('click', function() {
    statusCompra.innerText = "Pedido enviado para a cozinha!";

    subtotal = 0;
    quantidade = 0;
    descontoAplicado = false;
    mensagemCupom.innerText = "";
    inputCupom.value = "";
    atualizarTotais();

    setTimeout(function() {
        statusCompra.innerText = "";
    }, 3000);
});

function iniciarTemporizador() {
    intervalID = setInterval(function() {
        tempoRestante = tempoRestante - 1;
        contadorTempo.innerText = tempoRestante;

        if (tempoRestante <= 0) {
            clearInterval(intervalID);
            intervalID = null;
            promocaoValida = false;
            contadorTempo.innerText = "Expirada!";
            btnPausarTempo.disabled = true;
            
            if (!descontoAplicado) {
                mensagemCupom.innerText = "Promoção encerrada.";
            }
        }
    }, 1000);
}

iniciarTemporizador();

btnPausarTempo.addEventListener('click', function() {
    if (tempoRestante <= 0) return; 

    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
        btnPausarTempo.innerText = "Retomar Oferta";
    } else {
        iniciarTemporizador();
        btnPausarTempo.innerText = "Pausar Oferta";
    }
});