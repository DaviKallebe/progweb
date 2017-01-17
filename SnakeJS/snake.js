function snake(tabela, y, x, fy, fx, my, mx, pontos){
    antiga_direcao = 2;
    impedimentos   = {0: 2, 1: 3, 2: 0, 3: 1};
    pontuacao      = 0

    return function movimenta(direcao) {
        if (impedimentos[antiga_direcao] == direcao){
            direcao = antiga_direcao;
        }

        tabela.rows[y].cells[x].className = "snake-body";
        tabela.rows[y].cells[x].setAttribute("dir", direcao);

        switch (direcao) {
            case 0: --x; break;
            case 1: ++y; break;
            case 2: ++x; break;
            case 3: --y; break;
        }

        if (y >= my || y < 0 || x >= mx || x < 0 ||
            tabela.rows[y].cells[x].getAttribute("dir") != "")
            return 0;

        if (tabela.rows[y].cells[x].className != 'snake-food'){
            oy = fy;
            ox = fx;

            switch (tabela.rows[fy].cells[fx].getAttribute("dir")) {
                case '0': --fx; break;
                case '1': ++fy; break;
                case '2': ++fx; break;
                case '3': --fy; break;
            }

            tabela.rows[oy].cells[ox].className = "";
            tabela.rows[oy].cells[ox].setAttribute("dir", "");
        }
        else {
            pontuacao++;
            pontos.innerHTML = pontuacao;
        }

        tabela.rows[y].cells[x].className = "snake-body";
        tabela.rows[y].cells[x].setAttribute("dir", direcao);
        antiga_direcao = direcao;

        return 1;
    }
}

function desenharBoasVindas(){

    //tela de novo jogo
    document.body.innerHTML = '';
    let caixa_inicial = document.createElement('div');
    let botao_novo_jogo = document.createElement('button');
    let botao_opcao = document.createElement('button');

    caixa_inicial.setAttribute("class", "middle-box option-box middle-box-background");
    botao_novo_jogo.setAttribute("class", "choose-button");
    botao_novo_jogo.setAttribute("id", "novojogo");
    botao_novo_jogo.setAttribute("type", "button");
    botao_novo_jogo.innerHTML = "Novo Jogo";

    botao_opcao.setAttribute("class", "choose-button");
    botao_opcao.setAttribute("id", "novojogo");
    botao_opcao.setAttribute("type", "button");
    botao_opcao.innerHTML = "Opções";

    caixa_inicial.appendChild(document.createElement("br"));
    caixa_inicial.appendChild(document.createElement("br"));
    let textdiv = document.createElement("div");
    textdiv.appendChild(document.createTextNode("Menu Game"));
    textdiv.setAttribute("class", "text-menu");
    caixa_inicial.appendChild(textdiv);

    caixa_inicial.appendChild(document.createElement("br"));
    caixa_inicial.appendChild(document.createElement("br"));
    caixa_inicial.appendChild(document.createElement("br"));
    caixa_inicial.appendChild(document.createElement("br"));
    caixa_inicial.appendChild(botao_novo_jogo);
    caixa_inicial.appendChild(document.createElement("br"));
    caixa_inicial.appendChild(document.createElement("br"));
    caixa_inicial.appendChild(botao_opcao);
    document.body.appendChild(caixa_inicial);

    //evento para o botao novo jogo
    botao_novo_jogo.addEventListener("click", function() {
        //criando tabela
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        let max_largura = 80, max_altura = 60;
        let metade_largura = Math.floor(max_largura/2);
        let metade_altura = Math.floor(max_altura / 2);
        let caixa_pontuacao = document.createElement('div');
        let tabela_pontuacao = document.createElement('table');
        let tr_pontuacao = document.createElement('tr');
        let td_pontuacao = document.createElement('td');
        caixa_pontuacao.setAttribute("class", "score-box");
        tabela_pontuacao.setAttribute("class", "tabela-box");
        td_pontuacao.appendChild(document.createTextNode('PONTOS'));
        tr_pontuacao.appendChild(td_pontuacao);
        td_pontuacao = document.createElement('td');
        td_pontuacao.appendChild(document.createTextNode('0'));
        td_pontuacao.setAttribute("id", "pontos");
        tr_pontuacao.appendChild(td_pontuacao);
        tabela_pontuacao.appendChild(tr_pontuacao);
        caixa_pontuacao.appendChild(tabela_pontuacao);

        let caixa_snake = document.createElement('div');
        let tabela_snake = document.createElement('table');
        caixa_snake.setAttribute("class", "snake-box");
        caixa_snake.setAttribute("id", "tsnakebox");
        tabela_snake.setAttribute("class", "snake-field");
        tabela_snake.setAttribute("id", "tsnake");

        for (let i = 0; i < max_altura; ++i){
            let tabela_tr = document.createElement('tr');
            for (let j = 0; j < max_largura; ++j){
                let tabela_td = document.createElement('td');

                if (i == metade_altura && (j == metade_largura ||
                                           j == metade_largura - 1 ||
                                           j == metade_largura - 2)){
                    tabela_td.setAttribute("dir", "2");
                    tabela_td.setAttribute("class", "snake-body");
                }
                else
                    tabela_td.setAttribute("dir", "");

                tabela_tr.appendChild(tabela_td);
            }
            tabela_snake.appendChild(tabela_tr);
        }

        caixa_snake.appendChild(caixa_pontuacao);
        caixa_snake.appendChild(document.createElement('br'));
        caixa_snake.appendChild(tabela_snake);
        document.body.appendChild(caixa_snake);


        //criando closure para snake
        let FPS = 50;
        let tecla_apertada = -1;
        let direcao_snake = 2;
        let snake_tabela = document.getElementById("tsnake");
        let continua_snake = snake(snake_tabela, metade_altura, metade_largura,
                                   metade_altura, metade_largura - 2,
                                   max_altura, max_largura,
                                   document.getElementById("pontos"));
        let tid = -1; //id para setinterval
        let stoptid = function () {
            clearInterval(tid);
        };

        let tabela = document.querySelector("#tsnake");
        addEventListener("keydown", function(event) {
            if (tecla_apertada != event.keyCode && event.keyCode > 36 && event.keyCode < 41){
                tecla_apertada = event.keyCode;
                switch (tecla_apertada) {
                    case 37: direcao_snake = 0; break; //esquerda
                    case 38: direcao_snake = 3; break; //cima
                    case 39: direcao_snake = 2; break; //direita
                    case 40: direcao_snake = 1; break; //baixo
                }

                continua_snake(direcao_snake);
            }
        });


        tid = setInterval(function() {

            let valido;

            if (document.getElementsByClassName('snake-food').length > 0)
                valido = true;
            else
                valido = false;

            while (!valido) {
                x = Math.floor((Math.random() * max_largura));
                y = Math.floor((Math.random() * max_altura));

                if (snake_tabela.rows[y].cells[x].className == ""){
                    snake_tabela.rows[y].cells[x].className = "snake-food";
                    valido = true;
                }
            }

            if (!continua_snake(direcao_snake)){
                stoptid();
                let gamediv = document.createElement('div');
                let pontodiv = document.createElement('div');
                pontodiv.setAttribute("class", "scoregameover");
                gamediv.setAttribute("class", "gameover");
                gamediv.addEventListener("click", function () {
                    desenharBoasVindas();
                });
                pontodiv.appendChild(document.createTextNode(pontuacao + " PONTOS"));
                gamediv.appendChild(pontodiv);
                document.body.appendChild(gamediv);
            }
        }, 1000/FPS);
    });
}


desenharBoasVindas();
