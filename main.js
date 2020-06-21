Vue.component('blogcont', {
	template: (
		'<div class="row">'+
			'<div class="col-md-12">'+
				
				'<div class="panel panel-default" v-for="item, key in items">'+
					'<img class="img-responsive" src="assets/images/1519749837983477.png" />'+
					'<div class="panel-heading" style="font-size: 23px;">'+
						'<a v-bind:href="item.url">{{item.title}}</a>'+
					'</div>'+
					'<div class="panel-body">'+
						'<p>{{item.description}}</p>'+
						'<div class="pull-right">Добавлено: 27.02.2018 в 00:00</div>'+
						'<div>Автор: {{item.author}}</div>'+
						'<hr/>'+
						'<div class="pull-right text-right">'+
							'<div class="comments">'+
								'<span v-if="item.comments > 0"><i class="fa fa-comments" style="margin-right: 10px;"></i>{{item.comments}} комментариев</span>'+
								'<span v-else><i class="fa fa-comments" style="margin-right: 10px;"></i>Комментариев нет</span>'+
							'</div>'+
							'<div class="views">'+
								'<span v-if="item.views > 0"><i class="fa fa-eye" style="margin-right: 10px;"></i>{{item.views}} просмотров</span>'+
								'<span v-else><i class="fa fa-eye" style="margin-right: 10px;"></i>Просмотров нет</span>'+
							'</div>'+
						'</div>'+
						'<a v-bind:href="item.url" class="btn btn-primary">Читать далее</a>'+
					'</div>'+
				'</div>'+
				
				/*'<div class="text-center">'+
					'<ul class="pagination">'+
						'<li v-for="p in pagination.pages" @click.prevent="setPage(p)">'+
							'<a href="javascript://">{{p}}</a>'+
						'</li>'+
					'</ul>'+
					'Displaying from indexes {{pagination.startIndex}} to {{pagination.endIndex}}'+
				'</div>'+*/
			'</div>'+
		'</div>'
	),
	props: {
		source: {
			type: [String, Array],
			required: true
		},
	},
	data() {
		return {
			items: [],
		}
	},
	mounted() {
		this.fetchItems();
	},
	computed: {
		
	},
	methods: {
		fetchItems() {
			if ( typeof this.source === 'string' ) {
				fetch(this.source)
					.then(stream => stream.json())
					.then(data => {
						data.forEach(item => item.url = '/blog/'+item.id);
						this.items = data;
					})
					.catch(error => console.error(error))
			} else {
				this.items = this.source
			}
		},
	}
});

new Vue({
	el: '#app',
	//template: '<App/>',
	//components: {App},
	data: {
		pageTitle: 'Блог',
		
		//data: [],
		//perPage: 3,
		//pagination: {},
	},
	computed: {
		/*items(){
			return this.paginate(this.data);
		}*/
	},
	methods: {
		/*setPage(p){
			this.pagination = this.paginator(this.data.length, p);
		},
		paginate(data){
			return _.slice(data, this.pagination.startIndex, this.pagination.endIndex + 1);
		},
		paginator(totalItems, currentPage){
			var startIndex = (currentPage - 1) * this.perPage;
			endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
			
			return {
				currentPage: currentPage,
				startIndex: startIndex,
				endIndex: endIndex,
				pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1),
			};
		},
		getData(){
			fetch('/api/blog').then(function(response){
				if(response.status !== 200){
					console.log('Looks like there was a problem. Status Code: '+response.status);
					return;
				}
				// Examine the text in the response
				response.json().then(function(data){
					this.data = data;
				});
			}).catch(function(err){
				console.log('Fetch Error :-S', err);
			});
			console.log(this.data);
		},*/
	},
	created(){
		//this.setPage(1);
	}
});