// pegando as classes no html do projeto
const keys = document.querySelectorAll('.key');
const checkbox = document.querySelector('.checkbox__keys')
const switcher = document.querySelector('.switcher') 
const keysSection = document.querySelector('.piano__keys')

//pegando e executando a notas musicais que acordo com a id
const playNote = (note) => {
    const audio = new Audio(`../notes/${note}.wav`)
    audio.play();
}
//ação ao aperta o mouse  execute o som da nota de acordo com o id
const handleMouseDown = (key) =>{
    playNote(key.getAttribute('data-nite'));


    if(key.className.includes('black')){
        key.classList.add('black--pressed')
        return;
    }
    key.style.background = '#d3d1d1';
}

//ação apos soltar o mouse 
const handleMouseUP = (key) =>{
    if(key.className.includes('black')){
        key.classList.remove('black--pressed')
        return;
    }
    key.style.background = 'white';
}

//cria o evendo de prescionar o mouse
keys.forEach((key)=>{
    key.addEventListener('mousedown',()=> handleMouseDown(key))

    key.addEventListener('mouseup',()=> handleMouseUP(key))

});

checkbox. addEventListener('change', ({target})=>{
    if(target.checked){
        switcher.classList.add('switcher--active')
        keysSection.classList.remove('dissable-keys')
        return;
    }
    switcher.classList.remove('switcher--active')
    keysSection.classList.add('dissable-keys')
})


const keydownMapper = {
    "Tab": () => handleMouseDown(keys[0]),
    "1": () => handleMouseDown(keys[1]),
    "q": () => handleMouseDown(keys[2]),
    "2": () => handleMouseDown(keys[3]),
    "w": () => handleMouseDown(keys[4]),
    "e": () => handleMouseDown(keys[5]),
    "4": () => handleMouseDown(keys[6]),
    "r": () => handleMouseDown(keys[7]),
    "5": () => handleMouseDown(keys[8]),
    "t": () => handleMouseDown(keys[9]),
    "6": () => handleMouseDown(keys[10]),
    "y": () => handleMouseDown(keys[11]),
    "u": () => handleMouseDown(keys[12]),
    "8": () => handleMouseDown(keys[13]),
    "i": () => handleMouseDown(keys[14]),
    "9": () => handleMouseDown(keys[15]),
    "o": () => handleMouseDown(keys[16]),
    "p": () => handleMouseDown(keys[17]),
    "-": () => handleMouseDown(keys[18]),
    "[": () => handleMouseDown(keys[19]),
    "=": () => handleMouseDown(keys[20]),
    "]": () => handleMouseDown(keys[21]),
    "Backspace": () => handleMouseDown(keys[22]),
    "/": () => handleMouseDown(keys[23]),
}

const keyUperMapper = {
    "Tab": () => handleMouseUP(keys[0]),
    "1": () => handleMouseUP(keys[1]),
    "q": () => handleMouseUP(keys[2]),
    "2": () => handleMouseUP(keys[3]),
    "w": () => handleMouseUP(keys[4]),
    "e": () => handleMouseUP(keys[5]),
    "4": () => handleMouseUP(keys[6]),
    "r": () => handleMouseUP(keys[7]),
    "5": () => handleMouseUP(keys[8]),
    "t": () => handleMouseUP(keys[9]),
    "6": () => handleMouseUP(keys[10]),
    "y": () => handleMouseUP(keys[11]),
    "u": () => handleMouseUP(keys[12]),
    "8": () => handleMouseUP(keys[13]),
    "i": () => handleMouseUP(keys[14]),
    "9": () => handleMouseUP(keys[15]),
    "o": () => handleMouseUP(keys[16]),
    "p": () => handleMouseUP(keys[17]),
    "-": () => handleMouseUP(keys[18]),
    "[": () => handleMouseUP(keys[19]),
    "=": () => handleMouseUP(keys[20]),
    "]": () => handleMouseUP(keys[21]),
    "Backspace": () => handleMouseUP(keys[22]),
    "/": () => handleMouseUP(keys[23]),
}

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    keydownMapper[event.key]()
});

document.addEventListener('keyup', (event) => {
    keyUperMapper[event.key]()
});
