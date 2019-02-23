<?php

use yii\helpers\Html;
use yii\grid\GridView;

$this->title = 'Forms';
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="form-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Form', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?=
        GridView::widget([
            'dataProvider' => $dataProvider,
            'filterModel' => $searchModel,
			'tableOptions' => [
				'class' => 'table table-striped table-bordered forms_gridview_class'
			],
            'columns' => [
                ['class' => 'yii\grid\SerialColumn'],

                'id',
				'created:text:Дата и время добавления',
				'direction:text:Направление',
				'name:text:Имя',
				'phone:text:Телефон',
				'email:email:email',
                'request:text:Доп. пожелание',
				'date:text:Дата вылета/Кол-во ночей',
				'peoples:text:Кол-во человек',
				'budget:text:Бюджет',
				'city:text:Город туриста',
				'consultant_name:text:Имя консультанта',

                ['class' => 'yii\grid\ActionColumn'],
            ],
        ]);
    ?>
</div>