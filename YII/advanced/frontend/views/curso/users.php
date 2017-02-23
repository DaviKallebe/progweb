<?php

use yii\grid\GridView;
use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\User */

$this->title = $curso->nome;
$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $curso->nome, 'url' => ['view', 'id' => $curso->id]];
$this->params['breadcrumbs'][] = 'Usuários';
?>
<div class="curso-users">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'username',
            'email:email',
            'created_at:datetime',
        ],
    ]); ?>

</div>
