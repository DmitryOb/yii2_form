<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Forms', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>

<div class="form-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?=
        Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ])
        ?>
		<?= Html::a('Просмотреть все заявки', ['/admin/'], ['class' => 'btn btn-info']) ?>
    </p>

    <?=
        DetailView::widget([
            'model' => $model,
            'attributes' => [
                'id',
                'request',
                'name',
                'phone',
                'email:email',
                'created',
                'direction',
            ],
        ])
    ?>

</div>