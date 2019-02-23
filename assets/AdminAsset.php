<?php

namespace app\assets;

use yii\web\AssetBundle;

class AdminAsset extends AssetBundle
{
	public $basePath = '@webroot';
	public $css = [
		'css/site.css',
	];
	public $baseUrl = '@web';
	public $js = [
		// 'js/jquery.311.min.js',
	];
	public $depends = [
		'yii\web\YiiAsset',
		'yii\bootstrap\BootstrapAsset',
	];
}