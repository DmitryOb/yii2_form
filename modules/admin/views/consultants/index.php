<?php

use yii\helpers\Html;
use yii\grid\GridView;

$this->title = 'Consultants';
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="form-index">

	<h1><?= Html::encode($this->title) ?></h1>

	<?=
	GridView::widget([
		'dataProvider' => $dataProvider,
		'columns' => [
			'id:text:ID',
			'name:text:Имя консультанта',
			'email:text:Почта',
			'condition:text:Условие',
		],
	]);
	?>
</div>