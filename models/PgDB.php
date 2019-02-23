<?php

namespace app\models;

use Yii;
use yii\base\Model;

class PgDB extends Model {

	public static function GetCities($id){
		$query = "SELECT * FROM dict.dict_city WHERE trash !=true AND country='".$id."' ORDER BY name ASC";
		$allCities = Yii::$app->pgdb->createCommand($query)->queryAll();
		return json_encode($allCities);
	}

	public static function GetHotels($str){
		$query = "SELECT c.name as hotel, d.name as category, e.name as resor, f.name_eng as name_eng, f.name as country
					FROM dict.dict_allocation as c
						LEFT JOIN dict.dict_alloccat as d ON c.cat=d.id
						LEFT JOIN dict.dict_resort as e ON c.resort=e.id
						LEFT JOIN dict.dict_country as f ON e.country=f.id
							WHERE c.name ILIKE '%".$str."%'
								LIMIT 10";
		$hotels = Yii::$app->pgdb->createCommand($query)->queryAll();
		$hotelsWithFlag = [];
		foreach ($hotels as $hotel){
			$fileName = implode('_', explode(' ', mb_strtolower($hotel['name_eng']))).'.jpg';
			$pathToFile = $_SERVER['DOCUMENT_ROOT'].Yii::getAlias('@web').'/flags/'.$fileName;
			if (file_exists($pathToFile)){
				$hotel['fileName'] = $fileName;
				$hotelsWithFlag[] = $hotel;
			}
		}
		return json_encode($hotelsWithFlag);
	}
}