/* Fazer o Avançar  ir para proxima imagem e trocar a classe selecionado */

// 01 - pegar os elementos dos botoes e identifica os cartões dentro da lista

const btAvancar = document.getElementById("btn-avancar");
const btVoltar = document.getElementById("btn-voltar");
const cartoes = document.querySelectorAll(".cartao");
let cartaoAtual = 0;

//funções para simplificar
 function esconderCartaoSelecionado(){
    const cartaoSelecionado =document.querySelector(".selecionado");
    cartaoSelecionado.classList.remove("selecionado");
 }

 function mostrarCartao(indiceCartao){
    cartoes[cartaoAtual].classList.add("selecionado");
 }

// 02 - identificar o clik e passar a imagem

btAvancar.addEventListener("click", function(){
    if(cartaoAtual === cartoes.length-1) return
    esconderCartaoSelecionado();
    cartaoAtual++
    mostrarCartao(cartaoAtual);
})

// 03 - identificar o clik e coltar a imagem

btVoltar.addEventListener("click" ,function(){
    if(cartaoAtual === 0) return

    esconderCartaoSelecionado();
    cartaoAtual -- ;
    mostrarCartao(cartaoAtual);
});