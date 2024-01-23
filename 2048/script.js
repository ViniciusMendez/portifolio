document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const size = 4;
    let board = [];
    let currentScore = 0;
    const currentScoreElem = document.getElementById('current-score');

    // pegando o high score do loccal storage caso o if seja 0

    let highScore = localStorage.getItem('2048-highScore') || 0;
    const highScoreElem =  document.getElementById('high-score');
    highScoreElem.textContent = highScore;


    const gameOverElem = document.getElementById('game-over')

    // fução para atualizar o score
    function updateScore(value){
        currentScore += value;
        currentScoreElem.textContent = currentScore;
        if(currentScore > highScore){
            highScore = currentScore;
            highScoreElem.textContent = highScore;
            localStorage.setItem('2048-highScore', highScore);
        }
    }

    // função para reinicar o game

    function restartGame(){
        currentScore = 0;
        currentScoreElem.textContent = '0';
        gameOverElem.style.display = 'none';
        initializeGame();
    }

    // função para iniciar o Game
    function initializeGame(){
        board = [...Array(size)].map(e => Array(size).fill(0));
        placeRandom();
        placeRandom();
        renderBoard();

    }

    // função para  renderizar o game board on  the UI
    function renderBoard(){
        for(let i = 0; i < size; i++){
            for(j =0; j < size; j++){
                const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                const prevValue = cell.dataset.value;
                const currentValue = board[i][j];
                if(currentValue !==0){
                    cell.dataset.value = currentValue;
                    cell.textContent = currentValue;
                    //animation handling
                    if(currentValue !== parseInt(prevValue) && !cell.classList.contains('new-tile')){
                        cell.classList.add('merged-tile');
                    }
                }else{
                    cell.textContent = '';
                    delete cell.dataset.value;
                    cell.classList.remove('merged-tile','new-tile');
                }
            }
        }
        
        // LImpamdo a animeção  de classes
        setTimeout(()=> {
            const cells = document.querySelectorAll('grid-cell');
            cells.classList.remove('merged-tile', 'new-tile');
        }, 300)
    }

    //function to place a random tile on the board

    function  placeRandom(){
        const available = [];
        for(let i=0; i < size; i++){
            for (let j = 0; i < size; j++) {
                if(board[i][j] === 0){
                    available.push({x: i, y:j});
                }
            }
        }

        if(available.length> 0){
            const randomCell = available[Math.floor(random()*available.length)];
            board[randomCell.x][randomCell.y] = Math.random()< 0.9 ? 2 : 4;
            const cell = document.querySelector( `[data-row="${randomCell.x}"][data-col="${randomCell.y}"]`)
            cell.classList.add('new-tile'); //animation for new tiles
        }
    }

    // função para mover os tiles baseado em arrow key input ou seja as seta do teclado

    function move(direction){
        let hasChanged = false;
        if(direction === 'ArrowUp' || direction === 'ArrowDown'){
            for(let j = 0; j <size; j++){
                const column = [...Array(size)].map((_,i) => board[i][j]);
                const newColumn = transform(column, direction ==='ArrowUp');
                for(let i  = 0; i < size; i++){
                    if(board[i][j] !== newColumn[i]){
                        hasChanged = true;
                        board[i][j] - newColumn[i];
                    }
                }
            }
        }else if(direction ==='ArrowLeft' || direction === 'ArrowRight'){
            for(let i = 0; i < size; i++){
                const row = board[i];
                const newRow = transform(row, direction === 'ArrowLeft');
                if(row.join(',') !== newRow.join(',')){
                    hasChanged = true;
                    board[i] = newRow;
                }
            }
        }
        if(hasChanged){
            placeRandom();
            renderBoard();
            checkGameOver();
        }
    }

    // função para trasformar  a linha (row pr column) baseado em seu movimento
    function transform(line, moveTowardsStart){
        let newLine = line.filter(cell => cell !== 0);
        if(!moveTowardsStart){
            newLine.reverse();
        }
        for(let i = 0; i < newLine.length-1; i++){
            if(newLine[i] === newLine[i+1]){
                newLine[i] *= 2;
                updateScore(newLine[i]);// Update score
                newLine.splice(i+1,1)
            }
        }
        while(newLine.length <size){
            newLine.push(0);
        }
        if(!moveTowardsStart){
            newLine.reverse();
        }
        return newLine;
    }

    // função tpara cehcar se é Game over
    function checkGameOver(){
        for(let i = 0; i < size; i++){
            for(j = 0; j < size; j++){
                if(board[i][j]===0){
                    return;
                }
                if(j < size -1 && board[i][j]=== board[i][j+1]){
                    return;// isso aqui é horizontal adjacente eaual cells so a move is possible
                } 
                if(i <size -1 && board[i][j] === board[i+1][j]){
                    return; // isso aqui é vertical adjacente eaual cells so a move is possible
                }
            }
        }

        // if we reach here, no moves are possible
        gameOverElem.style.display='flex'
    }
    
    //Evet listeners
    document.addEventListener('keydown', event =>{
        if(['ArrowUP'], ['ArrowDown'],['ArrowRigth'],['ArrowLeft'].includes(event.key)){
            move(event.key)
        }
    })
    document.getElementById('restart-btn').addEventListener('click', restartGame);

    initializeGame();

})