
//OBJETIVO 1 - quando clicarmos na seta avançar temos que moatrar o proximo cartão.

//- passo 1 - pegar o elemento html na seta avançar
const btAvancar = document.getElementById("btn-avancar");
const btVoltar = document.getElementById("btn-voltar");
const cartoes = document.querySelectorAll(".cartao");
let cartaoAtual = 0;

function esconderCartaoSelecionado(){
    const cartaSelecionado = document.querySelector(".selecionado");
    cartaSelecionado.classList.remove("selecionado");
}

function mostrarCartao(indiceCartao){
    cartoes[indiceCartao].classList.add("selecionado")
}

//- passo 2 - identificar o click do usuario 
btAvancar.addEventListener("click",function(){
    if(cartaoAtual === cartoes.length - 1) return //clausula de guarda.

    esconderCartaoSelecionado();
    cartaoAtual ++ ;
    mostrarCartao(cartaoAtual);

});

//OBJETIVO 2 - quando clicarmos na seta voltar temos que moatrar o  cartão anterior.

//- passo 1 - pegar o elemento html na seta voltar
//- passo 2 - identificar o click do usuario 
//- passo 3 - fazer aparecer o anterior cartão
//- passo 4 - buscar cartão selecionado e esconder

btVoltar.addEventListener("click",function(){

    if(cartaoAtual === 0) return

    esconderCartaoSelecionado();
    cartaoAtual -- ;
    mostrarCartao(cartaoAtual);

});

