Vue.component('blog-post', {
	template: (
		'<div class="panel panel-default blog-post">'+
			'<img class="img-responsive" v-bind:src="post.poster" v-if="post.poster" />'+
			'<div class="panel-heading" style="font-size: 23px;">'+
				'<a v-bind:href="post.url">{{post.title}}</a>'+
			'</div>'+
			'<div class="panel-body">'+
				'<p>{{post.cutcontent}}</p>'+
				'<div class="pull-right">Добавлено: {{post.datetime}}</div>'+
				'<div>Автор: {{post.author}}</div>'+
				'<hr/>'+
				'<div class="pull-right text-right">'+
					'<div class="comments">'+
						'<span><i class="fa fa-comments" style="margin-right: 10px;"></i>{{post.commentsText}}</span>'+
					'</div>'+
					'<div class="views">'+
						'<span><i class="fa fa-eye" style="margin-right: 10px;"></i>{{post.viewsText}}</span>'+
					'</div>'+
				'</div>'+
				'<a v-bind:href="post.url" class="btn btn-primary">Читать далее</a>'+
			'</div>'+
		'</div>'
	),
	props: ['post'],
});
Vue.component('header-block', {
	template: (
		'<div class="navbar navbar-default">'+
			'<div class="navbar-header">'+
				'<a href="#/" class="navbar-brand">{{sitename}}</a>'+
				'<button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">'+
					'<span class="icon-bar"></span>'+
					'<span class="icon-bar"></span>'+
					'<span class="icon-bar"></span>'+
				'</button>'+
			'</div>'+
			'<div class="navbar-collapse collapse" id="navbar-main">'+
				'<ul class="nav navbar-nav">'+
					'<li v-for="item in menu">'+
						'<a v-bind:href="item.url">{{item.name}}</a>'+
					'</li>'+
				'</ul>'+
			'</div>'+
		'</div>'
	),
	props: ['sitename', 'menu'],
});
Vue.component('menu-right', {
	template: (
		'<div class="panel panel-primary">'+
			'<div class="panel-heading">{{title}}</div>'+
			'<div class="list-group">'+
				'<a v-for="item in menu" v-bind:href="item.url" class="list-group-item">{{item.name}}</a>'+
			'</div>'+
		'</div>'
	),
	props: ['title', 'menu'],
});

new Vue({
	el: '#app',
	data: {
		siteName: 'SiteTemplate',
		
		pageTitle: 'Блог',
		
		menuTop: [
			{
				name: 'Блог',
				url: '#',
			},
			{
				name: 'Каталог файлов',
				url: '#/load',
			},
			{
				name: 'Обратная связь',
				url: '#/feedback',
			},
			{
				name: 'Калькулятор',
				url: '#/calc',
			},
			{
				name: 'Статичная страница',
				url: '#/static',
			},
		],
		menuRight: [
			{
				name: 'Блог',
				url: '#',
			},
			{
				name: 'Каталог файлов',
				url: '#/load',
			},
			{
				name: 'Обратная связь',
				url: '#/feedback',
			},
			{
				name: 'Калькулятор',
				url: '#/calc',
			},
			{
				name: 'Статичная страница',
				url: '#/static',
			},
			{
				name: 'Фотогалерея',
				url: '#/photo',
			},{
				name: 'Видеогалерея',
				url: '#/video',
			},
		],
		
		blogPosts: [],
		blogPostsSearchText: '',
		blogPostsCount: 0,
		blogPostsLimit: 3,
		pagination: {},
	},
	methods: {
		setPage(p){
			fetch('/api/blog?' + new URLSearchParams({
				search: this.blogPostsSearchText,
				limit: 1,
			}))
				.then(stream => stream.json())
				.then(data => {
					this.blogPostsCount = data.count;
					this.pagination = this.paginator(this.blogPostsCount, p);
					this.scrollToTop();
				})
				.catch(error => console.error(error));
		},
		paginator(totalItems, currentPage){
			var startIndex = (currentPage - 1) * this.blogPostsLimit;
			endIndex = Math.min(startIndex + this.blogPostsLimit - 1, totalItems - 1);
			
			fetch('/api/blog?' + new URLSearchParams({
				search: this.blogPostsSearchText,
				start: startIndex,
				limit: this.blogPostsLimit,
			}))
				.then(stream => stream.json())
				.then(data => {
					data.posts.forEach(item => {
						item.url = '/blog/'+item.id;
						item.poster = 'assets/images/'+item.poster;
						item.datetime = new Date(item.ugmtime_public).format('d.m.Y в H:i:s');
						item.commentsText = parseInt(item.comments) > 0 ? item.comments+' '+decl1(item.comments, ['комментарий', 'комментария', 'комментариев']) : 'Комментариев нет';
						item.viewsText = parseInt(item.views) > 0 ? item.views+' '+decl1(item.views, ['просмотр', 'просмотра', 'просмотров']) : 'Просмотров нет';
						item.likesText = parseInt(item.likes) > 0 ? item.likes+' '+decl1(item.likes, ['лайк', 'лайка', 'лайков']) : 'Лайков нет';
					});
					this.blogPosts = data.posts;
				})
				.catch(error => console.error(error));
			
			return {
				currentPage: currentPage,
				startIndex: startIndex,
				endIndex: endIndex,
				pages: _.range(1, Math.ceil(totalItems / this.blogPostsLimit) + 1),
			};
		},
		
		loadPostData(){
			fetch('/api/blog?' + new URLSearchParams({
				//limit: 1,
			}))
			//fetch('/api/blog')
				.then(stream => stream.json())
				.then(data => {
					data.forEach(item => item.url = '/blog/'+item.id);
					this.blogPosts = data;
				})
				.catch(error => console.error(error));
			/*axios.get('/api/blog').then(response => {
				this.blogPosts = response.data;
			});*/
		},
		
		scrollToTop(){
			window.scrollTo(0, 0);
		},
	},
	beforeMount(){
		this.setPage(1);
	},
	mounted(){
		//this.loadPostData();
	},
	created(){
		//this.setPage(1);
	}
});