<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

?>

<div class="form-search">

    <?php
        $form = ActiveForm::begin([
            'action' => ['index'],
            'method' => 'get',
        ]);
    ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'request') ?>

    <?= $form->field($model, 'name') ?>

    <?= $form->field($model, 'phone') ?>

    <?= $form->field($model, 'email') ?>

    <?php $form->field($model, 'created') ?>

    <?php $form->field($model, 'direction') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>