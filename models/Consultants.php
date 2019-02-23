<?php

namespace app\models;

use yii\db\ActiveRecord;

class Consultants extends ActiveRecord
{

	public static function tableName()
	{
		return '{{%consultants}}';
	}



	public function rules()
	{
		return [
			[['name', 'email', 'pass'], 'safe'],
		];
	}

	public static function forOlga($req){
		$isTurkey = mb_stripos($req, 'Турция')===0 || mb_stripos($req, 'Турция')>0;
		$is5Star = ( mb_stripos($req, '5 звезд')===0 ||  mb_stripos($req, '5 звезд')>0) || ( mb_stripos($req, '5 звёзд')===0 ||  mb_stripos($req, '5 звёзд')>0);

		if ($isTurkey && $is5Star)
			return true;
		else
			return false;
	}
	public static function forOlgaDirection($req){
		$isTurkey = mb_stripos($req, 'Турция')===0 || mb_stripos($req, 'Турция')>0;
		if ($isTurkey)
			return true;
		else
			return false;
	}
	public static function forOlgaRequest($req){
		$is5Star = ( mb_stripos($req, '5 звезд')===0 ||  mb_stripos($req, '5 звезд')>0) || ( mb_stripos($req, '5 звёзд')===0 ||  mb_stripos($req, '5 звёзд')>0);

		if ($is5Star)
			return true;
		else
			return false;
	}

	public static function forAlex($req){
		$isEgypt = mb_stripos($req, 'Египет')===0 || mb_stripos($req, 'Египет')>0;
		$isSharmEl = mb_stripos($req, 'Шарм-Эль-Шейх')===0 || mb_stripos($req, 'Шарм-Эль-Шейх')>0;

		if ($isEgypt && $isSharmEl)
			return true;
		else
			return false;
	}
	public static function forAlexDirection($req)
	{
		$isEgypt = mb_stripos($req, 'Египет')===0 || mb_stripos($req, 'Египет')>0;
		$isSharmEl = mb_stripos($req, 'Шарм-Аль-Шейх')===0 || mb_stripos($req, 'Шарм-Аль-Шейх')>0;

		if ($isEgypt && $isSharmEl)
			return true;
		else
			return false;
	}
	public static function forAlexRequest($req)
	{
		$is4Star = mb_stripos($req, '4 звезды')===0 || mb_stripos($req, '4 звезды')>0;
		$is3Star = mb_stripos($req, '3 звезды')===0 || mb_stripos($req, '3 звезды')>0;
		$is2Star = mb_stripos($req, '2 звезды')===0 || mb_stripos($req, '2 звезды')>0;
		$is1Star = mb_stripos($req, '1 звезда')===0 || mb_stripos($req, '1 звезда')>0;

		if ($is4Star || $is3Star || $is2Star || $is1Star)
			return true;
		else
			return false;
	}

	public static function forMaxim($req){
		$isTunis = mb_stripos($req, 'Тунис')===0 || mb_stripos($req, 'Тунис')>0;
		$is4Star = mb_stripos($req, '4 звезды')===0 || mb_stripos($req, '4 звезды')>0;
		$is3Star = mb_stripos($req, '3 звезды')===0 || mb_stripos($req, '3 звезды')>0;
		$is2Star = mb_stripos($req, '2 звезды')===0 || mb_stripos($req, '2 звезды')>0;

		if ($isTunis && ($is4Star || $is3Star || $is2Star))
			return true;
		else
			return false;
	}
	public static function forMaximDirection($req){
		$isTunis = mb_stripos($req, 'Тунис')===0 || mb_stripos($req, 'Тунис')>0;

		if ($isTunis)
			return true;
		else
			return false;
	}
	public static function forMaximRequest($req){
		$is4Star = mb_stripos($req, '4 звезды')===0 || mb_stripos($req, '4 звезды')>0;
		$is3Star = mb_stripos($req, '3 звезды')===0 || mb_stripos($req, '3 звезды')>0;
		$is2Star = mb_stripos($req, '2 звезды')===0 || mb_stripos($req, '2 звезды')>0;

		if ($is4Star || $is3Star || $is2Star)
			return true;
		else
			return false;
	}

	public static function forAnna($req){
		$isCountry = false;
		$countries = Form::countriesReturn();
		foreach ($countries as $country){
			if (mb_stripos($req, $country['name'])===0 || mb_stripos($req, $country['name'])>0){
				$isCountry = true;
				break;
			}
		}
		if ($isCountry)
			return true;
		else
			return false;
	}
	public static function forAnnaDirection($req){
		$isCountry = false;
		$countries = Form::countriesReturn();
		foreach ($countries as $country){
			if (mb_stripos($req, $country['name'])===0 || mb_stripos($req, $country['name'])>0){
				$isCountry = true;
				break;
			}
		}
		if ($isCountry)
			return true;
		else
			return false;
	}

}