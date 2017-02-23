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

function post(url, parametros) {
    var http = new XMLHttpRequest();
    var link = location.protocol + '//' + location.host + location.pathname;
    var params = Object.keys(parametros).map(function(k) {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(parametros[k])
                    }).join('&')

    http.open("POST", link + url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }

    console.log(params);

    http.send(params);
}

function get(url, parametros) {
    var http = new XMLHttpRequest();
    var link = location.protocol + '//' + location.host + location.pathname;
    var params = Object.keys(parametros).map(function(k) {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(parametros[k])
                    }).join('&')

    http.open("GET", link + url + '&' + params, true);

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            //
        }
    }

    http.send();
}

function IniciarJogo(id){
    //tela de novo jogo
    //document.body.innerHTML = '';
    let site_root = document.getElementsByClassName("site-index")[0];
    let copy_html = site_root.innerHTML;

    site_root.innerHTML = ''

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

    site_root.appendChild(caixa_snake);

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
                site_root.innerHTML = copy_html;
            });
            pontodiv.appendChild(document.createTextNode(pontuacao + " PONTOS"));
            gamediv.appendChild(pontodiv);

            site_root.appendChild(gamediv);

            if (id != null){
                get('?r=user/storepoint', {
                    'id': id,
                    'pontuacao': document.getElementById("pontos").innerHTML});
            }

        }
    }, 2000/FPS);
}
