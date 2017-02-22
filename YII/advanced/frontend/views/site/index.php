<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'Snake - Instituto de Computação (ICOMP)';

$this->registerJsFile('js/snake.js', [
    'position' => $this::POS_END
]);
$this->registerCssFile('css/snake.css');
?>
<div class="site-index">

    <div class="jumbotron">
        <?= Html::img('@web/img/icomp.png',['width'=>'400']) ?>
        <p class="lead">Snake</p>
        <br><br>
        <p><a class="btn btn-lg btn-success" onclick="IniciarJogo();">Iniciar Jogo</a></p>
    </div>

</div>
