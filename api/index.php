<?php
	// https://silex.symfony.com/doc/2.0/usage.html
	// https://www.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/configuration.html
	// https://www.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/data-retrieval-and-manipulation.html#api
	
	require_once __DIR__.'/vendor/autoload.php';
	require_once __DIR__.'/conf.php';
	
	$app = new Silex\Application();
	
	$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
		'db.options' => array(
			'driver'   => 'pdo_mysql',
			'host' => MYSQL_HOST,
			'dbname' => MYSQL_DB,
			'user' => MYSQL_USER,
			'password' => MYSQL_PASSWORD,
		),
	));
	
	$app->get('/', function()
	{
		return json_encode(array(
			'available-routes' => array(
				'/api/blog' => 'get blog list',
				'/api/blog/{id}' => 'get blog item by id',
				'/api/blog2' => 'get test blog list',
			)
		));
	});
	
	$app->get('/blog', function() use ($app)
	{
		$search = isset($_GET['search']) ? $_GET['search'] : '';
		$start = isset($_GET['start']) ? intval($_GET['start']) : 0;
		$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
		
		$ret = array();
		
		$sql2 = '';
		if($search != '')
		{
			$sql2 .= (
				' WHERE title LIKE "%'.$search.'%"'.
				/*' OR cutcontent LIKE "%'.$search.'%"'.
				' OR content LIKE "%'.$search.'%"'.*/
				' OR tags LIKE "%'.$search.'%"'.
				' OR author LIKE "%'.$search.'%"'
			);
		}
		
		$sql = 'SELECT COUNT(*) FROM blog'.$sql2;
		$count = $app['db']->fetchAssoc($sql);
		$count = intval(array_shift($count));
		
		$sql = 'SELECT * FROM blog'.$sql2.' LIMIT '.$start.', '.$limit;
		$posts = $app['db']->fetchAll($sql);
		
		return json_encode(array(
			'posts' => $posts,
			'count' => $count,
		));
	});
	
	$app->get('/blog/{id}', function($id) use ($app)
	{
		$sql = 'SELECT * FROM blog WHERE id = ?';
		$post = $app['db']->fetchAssoc($sql, array($id));
		
		return json_encode($post);
	});
	
	$app->get('/blog2', function()
	{
		$start = isset($_GET['start']) ? intval($_GET['start']) : 0;
		$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
		
		$titles = array(
			'Равным образом сложившаяся структура организации',
			'Товарищи! постоянное информационно-пропагандистское обеспечение',
			'Интересный эксперимент проверки',
			'Структура организации позволяет оценить значение',
			'Консультация с широким активом',
			'Повседневная практика',
			'Место обучения кадров обеспечивает широкому кругу (специалистов) участие',
			'Новая модель организационной деятельности',
		);
		$descr = 'Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки соответствующий условий активизации. Равным образом сложившаяся структура организации позволяет оценить значение дальнейших направлений развития. Таким образом консультация с широким активом влечет за собой процесс внедрения и модернизации модели развития. Повседневная практика показывает, что рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Товарищи! новая модель организационной деятельности позволяет выполнять важные задания по разработке системы обучения кадров, соответствует насущным потребностям.';
		$author = 'lexinzector';
		
		$ret = array();
		for($i = 0; $i < $limit; $i++)
		{
			$ret[] = array(
				'id' => $i + 1,
				'title' => $titles[rand(0, count($titles) - 1)],
				'description' => $descr,
				'author' => $author,
				'date' => time(),
				'comments' => rand(0, 99),
				'views' => rand(0, 999),
			);
		}
		
		return json_encode($ret);
	});
	
	// 404 - Page not found
	$app->error(function (\Exception $e) use ($app)
	{
		if($e instanceof NotFoundHttpException)
		{
			return $app->json(array('error' => 'Page Not Found'), 404);
		}
		$code = ($e instanceof HttpException) ? $e->getStatusCode() : 500;
		return $app->json(array('error' => $e->getMessage()), $code);
	});
	
	$app->run();