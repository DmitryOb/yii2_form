<?php

namespace app\assets;

use yii\web\AssetBundle;

class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
	public $css = [
		'css/_lsfw/reset-ls.css',
		'css/_lsfw/atom.css',
		'css/_lsfw/fonts.css',
		'css/_lsfw/tabs.css',
		'css/vendor/font-awesome-5.0/css/fontawesome-all.css',
		'css/vendor/sumoselect.css',
		'css/vendor/th-sumoselect.css',
		'css/vendor/magnific-popup.css',

		'css/lib-ui-tour-filter/flags.css',
		'css/lib-ui-tour-filter/lsfw-tour-filter.css',
		'css/lib-ui-tour-filter/lsfw-form-direction.css',
		'css/lib-ui-tour-filter/lsfw-date-widget.css',
		'css/lib-ui-tour-filter/lsfw-adults-widget.css',
		'css/lib-ui-tour-filter/lsfw-durability-widget.css',
		'css/lib-ui-tour-filter/lsfw-price-widget.css',

		'css/tophotels_site_html/main-cnt.css',
		'css/tophotels_site_html/main.css',
		'css/tophotels_site_html/layouts/header.css',
		'css/tophotels_site_html/layouts/header-mobile.css',
		'css/tophotels_site_html/layouts/footer.css',
		'css/tophotels_site_html/layouts/left-menu.css',
		'css/tophotels_site_html/layouts/left-menu-mobile.css',
		'css/tophotels_site_html/agree-pp.css',
		'css/tophotels_site_html/tabs-bar-mobile.css',

		'css/site.css',
	];
	public $js = [
		// 'js/jquery.311.min.js',
		'js/jquery-ui.min.js',
		'js/vendor/magnific-popup.min.js',
		'js/vendor/SumoSelectLS/js/jquery.sumoselect-ls.min.js',
		'js/vendor/jquery-datepicker-range.js',
		'js/tophotels_site_html/tk-form-v2/date-function.js',
		'js/tophotels_site_html/tk-form-v2/main.js',
		'js/tophotels_site_html/tk-form-v2/form-date.js',
		'js/tophotels_site_html/form-pp-universal.js',
		'js/tophotels_site_html/form-directions.js',
		'js/duration-select.js',
		'js/tophotels_site_html/main.js',
		'js/tophotels_site_html/help-selections.js',
		'js/tophotels_site_html/agree-pp.js',
		'js/tophotels_site_html/header-mobile.js',
		// 'js/tophotels_site_html/left-menu-mobile.js',
		'js/tophotels_site_html/legal-info-pp.js',
		'js/libs/array-function.js',
		'js/libs/date-function.js',
		'js/libs/number-function.js',
		'js/libs/string-function.js',
		'js/libs/debounce.js',
		'js/libs/reverseLocale.js',
		'js/libs/LSPager.js',
		'js/libs/LSSuggest.js',
		'js/tkv-locale.js',
	];
	public $baseUrl = '@web';
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}