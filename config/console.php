<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic-console',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log', 'queue'],
    'controllerNamespace' => 'app\commands',
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
		'@console' => dirname(dirname(__FILE__)) . '/console',
    ],
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
		'mailer' => [
			'class' => 'yii\swiftmailer\Mailer',
			'useFileTransport' => true,
			'transport' => [
				'class' => 'Swift_SmtpTransport',
				'host' => 'smtp.gmail.com',
				'username' => 'serverlaravel@gmail.com',
				'password' => 'd5JVtqCbLXR2KVCVhJ',
				'port' => '587',
				'encryption' => 'tls',
			],
		],
        'log' => [
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
		'queue' => [
			'class' => \yii\queue\file\Queue::class,
			'path' => '@console/runtime/queue',
			'as log' => \yii\queue\LogBehavior::class,
		],
        'db' => $db,
		'urlManager' => [
			'class' => 'yii\web\UrlManager',
			'scriptUrl' => 'http://obrazumov.tophotels.site',
			'baseUrl' => 'http://obrazumov.tophotels.site',
			'enablePrettyUrl' => true,
			'showScriptName' => false,
		],
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;
