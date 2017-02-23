<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'Snake - Instituto de Computação (ICOMP)';

echo '<script>';

if (Yii::$app->user->getIsGuest())
    echo 'var user_id = ' .json_encode(null) . ';';
else
    echo 'var user_id = ' .json_encode(Yii::$app->user->identity->id) . ';';

echo '</script>';

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
        <p><a class="btn btn-lg btn-success" onclick="IniciarJogo(user_id);">Iniciar Jogo</a></p>
    </div>

</div>
