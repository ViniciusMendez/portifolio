//classes no html

const pokemonName = document.querySelector('.pokemon_nome');
const pokemonNum = document.querySelector('.pokemon_num');
const pokemonImg = document.querySelector('.pokemon_imagem');
const form = document.querySelector('.form');
const input = document.querySelector('.input_pesquisar');


const btnVoltar = document.querySelector('.btn_voltar')
const btnProximo = document.querySelector('.btn_proxi')

let cont = 1

//Buscando os pokemons na API
const fetchPokemon = async (pokemon) =>{
    const Apiresposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon} `);

    if(Apiresposta.status == 200){
        const data = await Apiresposta.json();
        return data;
    }

}
//agora pegar os dados e mostar na tela

const mostraPokemon = async (pokemon) =>{

    pokemonName.innerHTML ='Carregando'
    pokemonNum.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    
    if(data){
        pokemonName.innerHTML = data.name
        pokemonNum.innerHTML = data.id
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] ;
        input.value = '';
        cont = data.id;
    } else{
        pokemonImg.style.display ='none';
        pokemonName.innerHTML = 'Não Encontrado';
        pokemonNum.innerHTML = '#';
    }



}
// fazendo formulario pegar o nome ou id e motrar
form.addEventListener('submit',(event) => {
    event.preventDefault();
    mostraPokemon(input.value.toLowerCase());
    
});

mostraPokemon(cont);

//botões

btnVoltar.addEventListener('click',()=>{
    if(cont >1){
         cont -=1
        mostraPokemon(cont)
    }
   
})

btnProximo.addEventListener('click',()=>{
    cont +=1
    mostraPokemon(cont)
})

