<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;


class Form extends ActiveRecord
{
	public $simpleform;

	public function rules()
	{
		return [
			[
				['name', 'phone'],
				'required',
				'when' => function($model) { return $model->simpleform; },
			],
			['email', 'email'],
			[['request', 'direction', 'date', 'peoples', 'budget', 'city'], 'safe'],
			[['created'], 'default', 'value' => date('Y-m-d H:i:s')],
			[['consultant_name'], 'default', 'value' => 'нет распределения, так как нет направления'],
		];
	}

	public static function tableName()
	{
		return '{{%form}}';
	}

	public static function countriesReturn()
	{
		// Взвращаем список всех стран из базы
		$query = "SELECT * FROM dict.dict_country 
						WHERE nick!='нет такой страны' AND name!='test' AND trash='false' ORDER BY name ASC";
		$allcountries = Yii::$app->pgdb->createCommand($query)->queryAll();
		$countriesWithFlag = [];
		foreach ($allcountries as $country){
			$fileName = implode('_', explode(' ', mb_strtolower($country['name_eng']))).'.jpg';
			$pathToFile = $_SERVER['DOCUMENT_ROOT'].Yii::getAlias('@web').'/flags/'.$fileName;
			if (file_exists($pathToFile)){
				$country['fileName'] = $fileName;
				$countriesWithFlag[] = $country;
			}
		}
		return $countriesWithFlag;
	}
}