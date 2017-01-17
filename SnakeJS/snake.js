function snake(tabela, y, x, fy, fx, my, mx){
    antiga_direcao = 2;
    impedimentos   = {0: 2, 1: 3, 2: 0, 3: 1};

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

        if (y >= my || y < 0 || x >= mx || x < 0 || tabela.rows[y].cells[x].getAttribute("dir") != "")
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

        tabela.rows[y].cells[x].className = "snake-body";
        tabela.rows[y].cells[x].setAttribute("dir", direcao);
        antiga_direcao = direcao;

        return 1;
    }
}

function desenharBoasVindas(){

    //tela de novo jogo
    document.body.innerHTML = '';
    let codigo_html = `
        <div class="middle-box option-box">
            <br><br><br><br><br>
            <button class="middle-button" id="novojogo" type="button">Novo Jogo</button>
        </div>
    `;

    document.body.innerHTML = codigo_html;

    //evento para o botao novo jogo
    var botao = document.querySelector("#novojogo");
    botao.addEventListener("click", function() {
        //criando tabela
        document.body.innerHTML = '';
        let codigo_html = '<div class="middle-box snake-box" id="tsnakebox"><table class="snake-field" id="tsnake">';
        let max_largura = 80, max_altura = 60, metade_largura = Math.floor(max_largura/2), metade_altura = Math.floor(max_altura / 2);

        for (let i = 0; i < max_altura; ++i){
            codigo_html = codigo_html + "<tr>"
            for (let j = 0; j < max_largura; ++j){
                if (i == metade_altura && (j == metade_largura || j == metade_largura - 1 || j == metade_largura - 2)){
                    codigo_html = codigo_html + '<td class="snake-body" dir="2"></td>';
                }
                else
                    codigo_html = codigo_html + '<td dir=""></td>';
            }
            codigo_html = codigo_html + "</tr>";
        }

        codigo_html = codigo_html + "</table></div>";

        document.body.innerHTML = codigo_html;


        //criando closure para snake
        let FPS = 60;
        let direcao_snake = 2;
        let snake_tabela = document.getElementById("tsnake");
        let continua_snake = snake(snake_tabela, metade_altura, metade_largura, metade_altura, metade_largura - 2, max_altura, max_largura);
        let tid = -1; //id para setinterval
        let stoptid = function () {
            clearInterval(tid);
        };

        let tabela = document.querySelector("#tsnake");
        addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 37: direcao_snake = 0; break; //esquerda
                case 38: direcao_snake = 3; break; //cima
                case 39: direcao_snake = 2; break; //direita
                case 40: direcao_snake = 1; break; //baixo
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

            if (!continua_snake(direcao_snake))
                stoptid();
        }, 1000/20);
    });
}


desenharBoasVindas();
