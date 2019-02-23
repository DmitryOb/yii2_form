<?php

namespace app\modules\admin\controllers;

use app\models\Consultants;
use Yii;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\filters\VerbFilter;


class ConsultantsController extends Controller
{

	public function behaviors()
	{
		return [
			'verbs' => [
				'class' => VerbFilter::className(),
				'actions' => [
					'delete' => ['POST'],
				],
			],
		];
	}

	public function actionIndex()
	{
		//$counsultants = Consultants::find();

		$dataProvider = new ActiveDataProvider([
			'query' => Consultants::find()
		]);

		return $this->render('index', [
			'dataProvider' => $dataProvider,
		]);
	}

}