<?php
	// https://silex.symfony.com/doc/2.0/usage.html
	
	require_once __DIR__.'/vendor/autoload.php';
	
	$app = new Silex\Application();
	
	$app->get('/', function()
	{
		return 'hello';
	});
	$app->get('/blog', function()
	{
		$author = 'lexinzector';
		$descr = 'Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки соответствующий условий активизации. Равным образом сложившаяся структура организации позволяет оценить значение дальнейших направлений развития. Таким образом консультация с широким активом влечет за собой процесс внедрения и модернизации модели развития. Повседневная практика показывает, что рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Товарищи! новая модель организационной деятельности позволяет выполнять важные задания по разработке системы обучения кадров, соответствует насущным потребностям.';
		
		return json_encode(array(
			array(
				'id' => 1,
				'title' => 'Равным образом сложившаяся структура организации',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
			array(
				'id' => 2,
				'title' => 'Товарищи! постоянное информационно-пропагандистское обеспечение',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
			array(
				'id' => 3,
				'title' => 'Интересный эксперимент проверки',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
			array(
				'id' => 4,
				'title' => 'Структура организации позволяет оценить значение',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
			array(
				'id' => 5,
				'title' => 'Консультация с широким активом',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
			array(
				'id' => 6,
				'title' => 'Повседневная практика',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
			array(
				'id' => 7,
				'title' => 'Место обучения кадров обеспечивает широкому кругу (специалистов) участие',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
			array(
				'id' => 8,
				'title' => 'Новая модель организационной деятельности',
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			),
		));
	});
	
	$app->run();