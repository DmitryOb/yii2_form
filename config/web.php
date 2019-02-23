<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log', 'queue'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
		'@console' => dirname(dirname(__FILE__)) . '/console',
    ],
    'components' => [
        'request' => [
            'cookieValidationKey' => 'd69VM04sTaXTxreyt5-FcREtO9nNdxQq',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
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
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
		'db' => [
			'class' => 'yii\db\Connection',
			'dsn' => 'sqlite:'.__DIR__ . '\sqlite.db',
			'charset' => 'utf8',
		],
		'pgdb' => [
			'class' => 'yii\db\Connection',
			'dsn' => 'pgsql:host=db.tophotels.site;port=6432;dbname=dict',
			'charset' => 'utf8',
			'username' => 'dict_reader',
			'password' => 'dict_reader',
		],
		'queue' => [
			'class' => \yii\queue\file\Queue::class,
			'path' => '@console/runtime/queue',
			'as log' => \yii\queue\LogBehavior::class,
		],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
    ],
	'modules' => [
		'admin' => [
			'class' => 'app\modules\admin\Module',
			'defaultRoute' => 'form',
		],
	],
    'params' => $params,
];

if (YII_ENV_DEV) {
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
	unset($config['components']['cache']);
}

return $config;
