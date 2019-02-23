<?php

use yii\db\Migration;

class m181225_040919_create_form_table extends Migration
{
	public function safeUp()
	{
		$this->createTable('form', [
			'id' => $this->primaryKey(),
			'created' => $this->timestamp(),
			'direction' => $this->string(),
			'name' => $this->string(),
			'phone' => $this->string(),
			'email' => $this->string(),
			'request' => $this->string(),
			'date' => $this->string(),
			'peoples' => $this->string(),
			'budget' => $this->string(),
			'city' => $this->string(),
			'consultant_name' => $this->string(),
		]);

		$this->createTable('consultants', [
			'id' => $this->primaryKey(),
			'name' => $this->string(),
			'email' => $this->string(),
			'pass' => $this->string(),
			'condition' => $this->string(),
		]);

		$this->batchInsert('consultants', ['name', 'email', 'pass', 'condition'], [
			[
				'Ольга',
				'lembaso@inbox.ru',
				'qwertyuiopoiuytrewq',
				'Турция и 5 звезд'
			],
			[
				'Александр',
				'primak.alex@yahoo.com',
				'qwertyuiopoiuytrewq',
				'Египет и Шарм-Эль-Шейх и любая из 5 видов звездностей',
			],
			[
				'Максим',
				'maximka.nazarenko@yandex.ru',
				'qwertyuiopoiuytrewq1',
				'Тунис и (2,3 или 4 звезды)',
			],
			[
				'Анна',
				'test.th.welcome@gmail.com',
				'',
				'Все что не получили другие',
			]
		]);
	}

	public function safeDown()
	{
		$this->dropTable('form');
		$this->dropTable('consultants');
	}
}