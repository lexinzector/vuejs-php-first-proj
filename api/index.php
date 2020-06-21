<?php
	require_once __DIR__.'/vendor/autoload.php';
	
	$app = new Silex\Application();
	
	$app->get('/', function()
	{
		return 'hello';
	});
	$app->get('/blog', function()
	{
		return json_encode(array(
			'a' => 'b',
		));
	});
	
	$app->run();