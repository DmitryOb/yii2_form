<?php

namespace app\models;

use Yii;
use yii\base\Model;

class ExtendedForm extends Model {
	public $range;
	public $nights;
	public $peoples;
	public $budget;

	public $type;

	public $tourpack_direct_country_1;
	public $tourpack_direct_city_1;
	public $tourpack_flyfromcity_1;

	public $concrete_hotel_title_1;

	public $request;

	public $name;
	public $phone;
	public $email;
	public $yourcity;

	public $toStep3;

	public function beforeValidate()
	{
		if (isset(Yii::$app->request->post()['current_step'])){
			$orderID = Yii::$app->request->post()['current_step'];
			$this->continuedForm($orderID);
			$this->toStep3 = true;
		} else {
			$this->toStep3 = false;
		}
		return parent::beforeValidate();
	}

	public function rules()
	{
		return [
			[
				['range', 'nights', 'peoples', 'type'], 'required'
			],
			// шаг1
			[
				['tourpack_direct_country_1', 'tourpack_direct_city_1', 'tourpack_flyfromcity_1'],
				'required',
				'when' => function($model){
					return ($model->toStep3 == false);
				},
				'whenClient' => "function (attribute, value) { 
					return ( $(document.querySelector('#type-1')).prop('checked') && $('#current_step').val()=='step1' );
				}",
			],
			[
				'concrete_hotel_title_1',
				'required',
				'message'=>'Поле "{attribute}" не может быть пустым',
				'when' => function($model){
					return ($model->toStep3 == false);
				},
				'whenClient' => "function (attribute, value) {
					return ( $(document.querySelector('#type-2')).prop('checked') && $('#current_step').val()=='step1' );
				}",
			],
			// шаг2
			[
				['tourpack_direct_country_1', 'tourpack_direct_city_1', 'tourpack_flyfromcity_1', 'name', 'phone', 'yourcity'],
				'required',
				'message'=>'Поле "{attribute}" не может быть пустым',
				'when' => function($model){
					return ($model->toStep3 == true && $model->type == 'tourPack');
				},
				'whenClient' => "function (attribute, value) { 
					return ( $(document.querySelector('#type-1')).prop('checked') && $('#current_step').val()=='step2' );
				}",
			],
			[
				'phone', 'number', 'message'=>'Допустимы только цифры',
					'when' => function($model){
						return ($model->toStep3 == true && $model->type == 'tourPack');
					},
					'whenClient' => "function (attribute, value) { 
					return ( $(document.querySelector('#type-1')).prop('checked') && $('#current_step').val()=='step2' );
				}"
			],
			[
				['concrete_hotel_title_1', 'name', 'phone', 'yourcity'],
				'required',
				'when' => function($model){
					return ($model->toStep3 == true && $model->type == 'concreteHotel');
				},
				'whenClient' => "function (attribute, value) {
					return ( $(document.querySelector('#type-2')).prop('checked') && $('#current_step').val()=='step2' );
				}",
			],
			[
				'phone', 'number', 'message'=>'Допустимы только цифры',
				'when' => function($model){
					return ($model->toStep3 == true && $model->type == 'concreteHotel');
				},
				'whenClient' => "function (attribute, value) { 
					return ( $(document.querySelector('#type-2')).prop('checked') && $('#current_step').val()=='step2' );
				}"
			],
			['email', 'email'],
		];
	}

	public function attributeLabels() {
		return  [
			'yourcity' => 'Ваш город',
			'phone' => 'Телефон',
			'name' => 'Ваше имя',
			'concrete_hotel_title_1' => 'Отель',
		];
	}

	public function continuedForm($id){
		$model = new Form();
		$model = $model::findOne($id);
		$model->name = $this->name;
		$model->phone = $this->phone;
		$model->email = $this->email;
		$model->city = $this->yourcity;
		$model->Save();
	}
}