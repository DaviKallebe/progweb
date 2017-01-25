<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Esta aplicação é um jogo, Snake, feito na disciplina Programação Web utilizando as tecnologias como JavaScript, PHP, Yii Framework e HTML 5.</p>

    <br>Data e hora atual: <code><?= $data ?></code>
</div>
