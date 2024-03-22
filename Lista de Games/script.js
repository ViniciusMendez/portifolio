document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addGameForm');
    const input = document.getElementById('gameInput');
    const list = document.getElementById('gameList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const gameTitle = input.value.trim();
        if (gameTitle !== '') {
            if (!isGameAlreadyAdded(gameTitle)) {
                searchGame(gameTitle);
                input.value = '';
            } else {
                alert("Este jogo já está na lista!");
            }
        }
    });

    function searchGame(title) {
        const apiKey = '6dacd5d0c9984b7ab8f3d329010633a9'; // Substitua 'SUA_API_KEY' pela sua chave de API RAWG

        fetch(`https://api.rawg.io/api/games?search=${encodeURIComponent(title)}&key=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar jogo');
                }
                return response.json();
            })
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const game = data.results[0];
                    addGameToList(game.name, game.background_image);
                } else {
                    alert("Jogo não encontrado!");
                }
            })
            .catch(error => {
                console.error('Erro ao buscar jogo:', error);
            });
    }

    function addGameToList(title, imageUrl) {
        const listItem = document.createElement('div');
        listItem.classList.add('gameItem');

        const gameTitle = document.createElement('span');
        gameTitle.textContent = title;
        listItem.appendChild(gameTitle);

        const gameImage = document.createElement('img');
        gameImage.src = imageUrl;
        gameImage.alt = title;
        listItem.appendChild(gameImage);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            listItem.remove();
        });
        listItem.appendChild(deleteButton);

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.addEventListener('change', function() {
            if (completeCheckbox.checked) {
                gameTitle.style.textDecoration = 'line-through';
            } else {
                gameTitle.style.textDecoration = 'none';
            }
        });
        listItem.appendChild(completeCheckbox);

        list.appendChild(listItem);
    }

    function isGameAlreadyAdded(title) {
        const existingGames = list.querySelectorAll('.gameItem span');
        for (let i = 0; i < existingGames.length; i++) {
            if (existingGames[i].textContent.toLowerCase() === title.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
});
