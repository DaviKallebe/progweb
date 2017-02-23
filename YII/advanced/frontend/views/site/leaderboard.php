<?php

use yii\grid\GridView;
use yii\helpers\Html;
use yii\widgets\DetailView;
use app\models\User;

/* @var $this yii\web\View */
/* @var $model app\models\User */

$this->title = 'Leaderboard';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-leaderboard">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            [
                'attribute' => 'id_user',
                'value' => function($model, $index, $column) {
                   $user = User::findOne($model->id_user);
                   return $user->username;
                },
            ],
            'pontuacao',
            'data_hota:datetime',
        ],
    ]); ?>

</div>
