<?php

namespace app\controllers;

use app\models\Consultants;
use app\models\PgDB;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\Form;
use app\models\ExtendedForm;
use app\queue\Queue;

class SiteController extends Controller
{

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    // основной экшн публички
    public function actionIndex()
    {
		$model = new Form();
		$model->simpleform = true;
		$extendedModel = new ExtendedForm();

		// "нестандартный запрос"
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			// функция возвращает имя и имэйл консультанта на основе запроса клиента
			$response = $this->parseSimpleFrom($model->request);
			if ($response){
				$to = $response[0];
				$model->consultant_name = $response[1];
				$model->Save();
				$this->sendMail($to, $model->name, $model->phone, $model->consultant_name);
			}
			else $model->Save();

			return $this->render('entry-confirm', ['model' => $model]);
		}

		// с шага2 "сложной формы" на шаг3 "сложной формы"
		else if ( $extendedModel->load(Yii::$app->request->post()) && $extendedModel->validate() ){
			return $this->render('entry-confirm');
		}

		else {
			return $this->render('index', [
				'model' => $model,
				'extendedModel' => $extendedModel,
				'countries' => Form::countriesReturn(),
			]);
		}
    }

	public function parseSimpleFrom($request)
	{
		if (Consultants::forOlga($request))
			return ['lembaso@inbox.ru', 'Ольга'];
		else if (Consultants::forAlex($request))
			return ['primak.alex@yahoo.com', 'Александр'];
		else if (Consultants::forMaxim($request))
			return ['maximka.nazarenko@yandex.ru', 'Максим'];
		else if (Consultants::forAnna($request))
			return ['test.th.welcome@gmail.com', 'Анна'];
		else
			return false;
	}

	public function parseComplexFormTourpack($direction, $request){
		if (Consultants::forOlgaDirection($direction) && Consultants::forOlgaRequest($request))
			return ['lembaso@inbox.ru', 'Ольга'];
		else if (Consultants::forAlexDirection($direction))
			return ['primak.alex@yahoo.com', 'Александр'];
		else if (Consultants::forMaximDirection($direction) && Consultants::forMaximRequest($request))
			return ['maximka.nazarenko@yandex.ru', 'Максим'];
		else if (Consultants::forAnnaDirection($direction))
			return ['test.th.welcome@gmail.com', 'Анна'];
		else
			return false;
	}

	public function parseComplexFormConcreteHotel($direction){
		if (Consultants::forOlga($direction))
			return ['lembaso@inbox.ru', 'Ольга'];
		else if (Consultants::forAlex($direction))
			return ['primak.alex@yahoo.com', 'Александр'];
		else if (Consultants::forMaxim($direction))
			return ['maximka.nazarenko@yandex.ru', 'Максим'];
		else
			return ['test.th.welcome@gmail.com', 'Анна'];
	}

    // сохраняем 1 шаг сложной формы
    public function actionExtendedFormSubmit()
	{
		$model = new Form();
		$model->direction = Yii::$app->request->get()['direction'];
		$model->request = Yii::$app->request->get()['request'];
		$model->date = Yii::$app->request->get()['range'].'/'.Yii::$app->request->get()['nights'].' нч';
		$model->peoples = Yii::$app->request->get()['peoples'];
		$model->budget = Yii::$app->request->get()['budget'];
		if ($model->validate()) {
			if (Yii::$app->request->get()['type'] == 'tourPack')
				$response = $this->parseComplexFormTourpack($model->direction, $model->request);
			else
				$response = $this->parseComplexFormConcreteHotel($model->direction);
			if ($response){
				$model->consultant_name = $response[1];
				$model->Save();
				$this->sendMail($response[0], $model->name, $model->phone, $response[1]);
			}
			$model->Save();
		}
		$id = Yii::$app->db->getLastInsertID();

		// отложенная отправка письма
		//Yii::$app->queue->delay(2 * 60)->push(new Queue([ 'id' => $id ]));

		return $id;
	}

	public function actionGetCities($id)
	{
		return PgDB::GetCities($id);
	}

	public function actionGetHotels($str)
	{
		return PgDB::GetHotels($str);
	}

	public function sendMail($to, $name, $phone, $consultName)
	{
		$message = Yii::$app->mailer->compose('form',[
			'formid' => Yii::$app->db->getLastInsertID(),
			'name' => $name,
			'phone' => $phone,
			'to' => $to,
			'consultName' => $consultName,
		]);
		$message->setFrom('serverlaravel@gmail.com')
			->setTo($to)
			->setSubject('Добавлена новая заявка')
			->send();
	}

}