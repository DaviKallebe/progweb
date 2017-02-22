<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Esta aplicação é um snake feito com javascript, php e o framework YII 2.</p>

    <p>Dia e hora atual é <?= $date ?></p>
    <code><?= __FILE__ ?></code>
</div>
