<?php
namespace app\queue;

use Yii;
use yii\base\BaseObject;

class Queue extends BaseObject implements \yii\queue\JobInterface
{
	public $id;

	public function execute($queue)
	{
		// отправляем письмо
		$to = 'test.th.welcome@gmail.com';
		$message = Yii::$app->mailer->compose('form',[
			'formid' => $this->id,
			'name' => '-',
			'phone' => '-',
			'to' => $to,
		]);
		$message->setFrom('serverlaravel@gmail.com')
			->setTo($to)
			->setSubject('Добавлена новая заявка')
			->send();
	}
}