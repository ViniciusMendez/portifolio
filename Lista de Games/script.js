const API_KEY = '6dacd5d0c9984b7ab8f3d329010633a9'; // Substitua 'sua_chave_de_api' pela sua chave de API RAWG
let gamesAdded = JSON.parse(localStorage.getItem('gamesAdded')) || []; // Array para armazenar os IDs dos jogos adicionados à lista

document.getElementById("gameInput").addEventListener("input", function() {
    var searchTerm = this.value;

    // Limpa a lista de sugestões
    document.getElementById("gameSuggestions").innerHTML = "";

    // Faz a requisição à API RAWG para sugestões
    var suggestionsUrl = `https://api.rawg.io/api/games?search=${searchTerm}&key=${API_KEY}`;

    fetch(suggestionsUrl)
    .then(response => response.json())
    .then(data => {
        // Preenche o menu dropdown com as sugestões de jogos
        data.results.slice(0, 10).forEach(function(game) {
            var option = document.createElement("option");
            option.value = game.name;
            document.getElementById("gameSuggestions").appendChild(option);
        });
    })
    .catch(error => console.error(error));
});

async function adicionarGame() {
    var searchTerm = document.getElementById("gameInput").value;

    // Faz a requisição à API RAWG
    var url = `https://api.rawg.io/api/games?search=${searchTerm}&key=${API_KEY}`;

    try {
        var response = await fetch(url);
        var data = await response.json();

        // Verifica se o jogo já foi adicionado à lista
        if (data.results.length > 0 && !gamesAdded.includes(data.results[0].id)) {
            var game = data.results[0];
            gamesAdded.push(game.id); // Adiciona o ID do jogo ao array de jogos adicionados
            localStorage.setItem('gamesAdded', JSON.stringify(gamesAdded)); // Armazena os IDs dos jogos adicionados no armazenamento local

            var listItem = document.createElement("div");
            listItem.classList.add("game-item");

            // Cria a div para a imagem
            var imageDiv = document.createElement("div");
            imageDiv.classList.add("game-image");

            var img = document.createElement("img");
            img.src = game.background_image;
            imageDiv.appendChild(img);
            listItem.appendChild(imageDiv);

            // Cria a div para o título e as informações
            var titleInfoDiv = document.createElement("div");
            titleInfoDiv.classList.add("title-info");

            var title = document.createElement("h3");
            title.textContent = game.name;
            titleInfoDiv.appendChild(title);

            var developers = document.createElement("p");
            developers.textContent = `Desenvolvedora: ${game.developers ? game.developers.map(dev => dev.name).join(", ") : 'Desenvolvedora não especificada'}`;
            titleInfoDiv.appendChild(developers);

            var platformsSpan = document.createElement("span");
            platformsSpan.textContent = ''; // Limpa o texto anterior

            // Adiciona as imagens das plataformas genéricas
            getGenericPlatforms(game.platforms).forEach(platform => {
                var platformImg = document.createElement("img");
                platformImg.src = platformImages[platform]; // Obtém o caminho da imagem a partir do objeto platformImages
                platformImg.alt = platform; // Define o atributo alt com o nome da plataforma
                platformsSpan.appendChild(platformImg);
            });

            titleInfoDiv.appendChild(platformsSpan);

            // Cria a div para os checkboxes
            var checkboxesDiv = document.createElement("div");
            checkboxesDiv.classList.add("checkboxes");

            // Checkbox para "Jogando"
            var jogandoCheckbox = document.createElement("input");
            jogandoCheckbox.type = "checkbox";
            jogandoCheckbox.name = "jogando";
            jogandoCheckbox.value = "jogando";
            jogandoCheckbox.id = "jogandoCheckbox";
            jogandoCheckbox.classList.add("checkbox-jogando"); // Adiciona a classe para o estado "jogando"
            jogandoCheckbox.addEventListener("change", function() {
                if (this.checked) {
                    zeradoCheckbox.checked = false;
                    dropadoCheckbox.checked = false;
                    // Aqui você pode adicionar o código para mostrar uma mensagem ou executar alguma ação quando o checkbox "Jogando" é marcado
                    alert("Marcado como jogando");
                }
            });

            var jogandoLabel = document.createElement("label");
            jogandoLabel.textContent = "Jogando";
            jogandoLabel.setAttribute("for", "jogandoCheckbox");

            checkboxesDiv.appendChild(jogandoCheckbox);
            checkboxesDiv.appendChild(jogandoLabel);

            // Checkbox para "Zerado"
            var zeradoCheckbox = document.createElement("input");
            zeradoCheckbox.type = "checkbox";
            zeradoCheckbox.name = "zerado";
            zeradoCheckbox.value = "zerado";
            zeradoCheckbox.id = "zeradoCheckbox";
            zeradoCheckbox.classList.add("checkbox-zerado");
            zeradoCheckbox.addEventListener("change", function() {
                if (this.checked) {
                    jogandoCheckbox.checked = false;
                    dropadoCheckbox.checked = false;
                    // Aqui você pode adicionar o código para mostrar uma mensagem ou executar alguma ação quando o checkbox "Zerado" é marcado
                    alert("Marcado como zerado");
                }
            });

            var zeradoLabel = document.createElement("label");
            zeradoLabel.textContent = "Zerado";
            zeradoLabel.setAttribute("for", "zeradoCheckbox");

            checkboxesDiv.appendChild(zeradoCheckbox);
            checkboxesDiv.appendChild(zeradoLabel);

            // Checkbox para "Dropado"
            var dropadoCheckbox = document.createElement("input");
            dropadoCheckbox.type = "checkbox";
            dropadoCheckbox.name = "dropado";
            dropadoCheckbox.value = "dropado";
            dropadoCheckbox.id = "dropadoCheckbox";
            dropadoCheckbox.classList.add("checkbox-dropado");
            dropadoCheckbox.addEventListener("change", function() {
                if (this.checked) {
                    jogandoCheckbox.checked = false;
                    zeradoCheckbox.checked = false;
                    // Aqui você pode adicionar o código para mostrar uma mensagem ou executar alguma ação quando o checkbox "Dropado" é marcado
                    alert("Marcado como dropado");
                }
            });

            var dropadoLabel = document.createElement("label");
            dropadoLabel.textContent = "Dropado";
            dropadoLabel.setAttribute("for", "dropadoCheckbox");

            checkboxesDiv.appendChild(dropadoCheckbox);
            checkboxesDiv.appendChild(dropadoLabel);

            titleInfoDiv.appendChild(checkboxesDiv);

            // Botão para excluir o jogo da lista
            var removeButton = document.createElement("button");
            removeButton.textContent = "Excluir";
            removeButton.classList.add("deleteButton");
            removeButton.addEventListener("click", function() {
                listItem.remove(); // Remove o item da lista
                var index = gamesAdded.indexOf(game.id);
                if (index !== -1) {
                    gamesAdded.splice(index, 1); // Remove o ID do jogo do array de jogos adicionados
                    localStorage.setItem('gamesAdded', JSON.stringify(gamesAdded)); // Atualiza o armazenamento local
                }
            });
            titleInfoDiv.appendChild(removeButton);

            listItem.appendChild(titleInfoDiv);

            // Cria a div para a nota
            var ratingDiv = document.createElement("div");
            ratingDiv.classList.add("rating");

            var ratingValue = game.metacritic;
            var rating = document.createElement("p");
            rating.textContent = `${ratingValue}`;
            rating.style.backgroundColor = getRatingColor(ratingValue); // Define a cor de fundo da nota com base na classificação do Metacritic
            ratingDiv.appendChild(rating);

            listItem.appendChild(ratingDiv);

            document.getElementById("gameList").appendChild(listItem);
        } else {
            console.log("Nenhum jogo encontrado ou jogo já adicionado à lista.");
        }
    } catch (error) {
        console.error(error);
    }
}

// Função para preencher a lista de jogos ao carregar a página
window.onload = function() {
    gamesAdded.forEach(function(gameId) {
        var url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;

        fetch(url)
        .then(response => response.json())
        .then(game => {
            var listItem = document.createElement("div");
            listItem.classList.add("game-item");

            // Cria a div para a imagem
            var imageDiv = document.createElement("div");
            imageDiv.classList.add("game-image");

            var img = document.createElement("img");
            img.src = game.background_image;
            imageDiv.appendChild(img);
            listItem.appendChild(imageDiv);

            // Cria a div para o título e as informações
            var titleInfoDiv = document.createElement("div");
            titleInfoDiv.classList.add("title-info");

            var title = document.createElement("h3");
            title.textContent = game.name;
            titleInfoDiv.appendChild(title);

            var developers = document.createElement("p");
            developers.textContent = `${game.developers ? game.developers.map(dev => dev.name).join(", ") : 'Desenvolvedora não especificada'}`;
            titleInfoDiv.appendChild(developers);

            var platformsSpan = document.createElement("span");
            platformsSpan.textContent = ''; // Limpa o texto anterior
            platformsSpan.classList.add("platform-images");

            // Adiciona as imagens das plataformas genéricas
            getGenericPlatforms(game.platforms).forEach(platform => {
                var platformImg = document.createElement("img");
                platformImg.src = platformImages[platform]; // Obtém o caminho da imagem a partir do objeto platformImages
                platformImg.alt = platform; // Define o atributo alt com o nome da plataforma
                platformsSpan.appendChild(platformImg);
            });

            titleInfoDiv.appendChild(platformsSpan);

            // Cria a div para os checkboxes
            var checkboxesDiv = document.createElement("div");
            checkboxesDiv.classList.add("checkboxes");

            // Checkbox para "Jogando"
            var jogandoCheckbox = document.createElement("input");
            jogandoCheckbox.type = "checkbox";
            jogandoCheckbox.name = "jogando";
            jogandoCheckbox.value = "jogando";
            jogandoCheckbox.id = "jogandoCheckbox";
            jogandoCheckbox.classList.add("checkbox-jogando"); // Adiciona a classe para o estado "jogando"
            jogandoCheckbox.addEventListener("change", function() {
                if (this.checked) {
                    zeradoCheckbox.checked = false;
                    dropadoCheckbox.checked = false;
                    // Aqui você pode adicionar o código para mostrar uma mensagem ou executar alguma ação quando o checkbox "Jogando" é marcado
                    alert("Marcado como jogando");
                }
            });

            var jogandoLabel = document.createElement("label");
            jogandoLabel.textContent = "Jogando";
            jogandoLabel.setAttribute("for", "jogandoCheckbox");

            checkboxesDiv.appendChild(jogandoCheckbox);
            checkboxesDiv.appendChild(jogandoLabel);

            // Checkbox para "Zerado"
            var zeradoCheckbox = document.createElement("input");
            zeradoCheckbox.type = "checkbox";
            zeradoCheckbox.name = "zerado";
            zeradoCheckbox.value = "zerado";
            zeradoCheckbox.id = "zeradoCheckbox";
            zeradoCheckbox.classList.add("checkbox-zerado");
            zeradoCheckbox.addEventListener("change", function() {
                if (this.checked) {
                    jogandoCheckbox.checked = false;
                    dropadoCheckbox.checked = false;
                    // Aqui você pode adicionar o código para mostrar uma mensagem ou executar alguma ação quando o checkbox "Zerado" é marcado
                    alert("Marcado como zerado");
                }
            });

            var zeradoLabel = document.createElement("label");
            zeradoLabel.textContent = "Zerado";
            zeradoLabel.setAttribute("for", "zeradoCheckbox");

            checkboxesDiv.appendChild(zeradoCheckbox);
            checkboxesDiv.appendChild(zeradoLabel);

            // Checkbox para "Dropado"
            var dropadoCheckbox = document.createElement("input");
            dropadoCheckbox.type = "checkbox";
            dropadoCheckbox.name = "dropado";
            dropadoCheckbox.value = "dropado";
            dropadoCheckbox.id = "dropadoCheckbox";
            dropadoCheckbox.classList.add("checkbox-dropado");
            dropadoCheckbox.addEventListener("change", function() {
                if (this.checked) {
                    jogandoCheckbox.checked = false;
                    zeradoCheckbox.checked = false;
                    // Aqui você pode adicionar o código para mostrar uma mensagem ou executar alguma ação quando o checkbox "Dropado" é marcado
                    alert("Marcado como dropado");
                }
            });

            var dropadoLabel = document.createElement("label");
            dropadoLabel.textContent = "Dropado";
            dropadoLabel.setAttribute("for", "dropadoCheckbox");

            checkboxesDiv.appendChild(dropadoCheckbox);
            checkboxesDiv.appendChild(dropadoLabel);

            titleInfoDiv.appendChild(checkboxesDiv);

            // Botão para excluir o jogo da lista
            var removeButton = document.createElement("button");
            removeButton.textContent = "Excluir";
            removeButton.classList.add("deleteButton");
            removeButton.addEventListener("click", function() {
                listItem.remove(); // Remove o item da lista
                var index = gamesAdded.indexOf(game.id);
                if (index !== -1) {
                    gamesAdded.splice(index, 1); // Remove o ID do jogo do array de jogos adicionados
                    localStorage.setItem('gamesAdded', JSON.stringify(gamesAdded)); // Atualiza o armazenamento local
                }
            });
            titleInfoDiv.appendChild(removeButton);

            listItem.appendChild(titleInfoDiv);

            // Cria a div para a nota
            var ratingDiv = document.createElement("div");
            ratingDiv.classList.add("rating");

            var ratingValue = game.metacritic;
            var rating = document.createElement("p");
            rating.textContent = `${ratingValue}`;
            rating.style.backgroundColor = getRatingColor(ratingValue); // Define a cor de fundo da nota com base na classificação do Metacritic
            ratingDiv.appendChild(rating);

            listItem.appendChild(ratingDiv);

            document.getElementById("gameList").appendChild(listItem);
        })
        .catch(error => console.error(error));
    });
};

// Função para obter as plataformas genéricas
function getGenericPlatforms(platforms) {
    const genericPlatforms = {
        PC: ["macOS", "Linux", "Windows"],
        PlayStation: ["PlayStation", "PS1", "PS2", "PS3", "PS4", "PS5", "PSP", "PS Vita"],
        Xbox: ["Xbox", "Xbox 360", "Xbox One", "Xbox Series X", "Xbox Series S"],
        Nintendo: ["Nintendo", "Nintendo Switch", "NES", "SNES", "Nintendo 64", "GameCube", "Wii", "Wii U", "Game Boy", "Game Boy Color", "Game Boy Advance", "Nintendo DS", "Nintendo 3DS"]
    };

    let genericPlatformsArray = [];

    platforms.forEach(platform => {
        Object.keys(genericPlatforms).forEach(genericPlatform => {
            if (genericPlatforms[genericPlatform].some(officialPlatform => platform.platform.name.includes(officialPlatform))) {
                genericPlatformsArray.push(genericPlatform);
            }
        });
    });

    return [...new Set(genericPlatformsArray)]; // Retorna apenas plataformas genéricas únicas
}

// Função para definir a cor de fundo da nota com base na classificação do Metacritic
function getRatingColor(rating) {
    if (rating >= 70) {
        return "#4CAF50"; // Verde
    } else if (rating >= 65) {
        return "#FFEB3B"; // Amarelo
    } else if (rating >= 40) {
        return "#FF9800"; // Laranja
    } else {
        return "#F44336"; // Vermelho
    }
}

// Imagens das plataformas genéricas
const platformImages = {
    PC: "plataform_logos/ph_desktop-bold.png",
    PlayStation: "plataform_logos/PS.svg",
    Xbox: "plataform_logos/xbox.svg",
    Nintendo: "plataform_logos/nintendo.svg"
};
