<template>
	<div>
		<form v-on:submit.prevent="setPage(1)" style="margin-bottom: 20px;">
			<input type="text" v-model="blogPostsSearchText" class="form-control" placeholder="Поиск" />
		</form>
		<div class="panel panel-default">
			<div class="panel-heading">
				{{model.pageTitle}}
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-md-12">
						<blog-post
							v-for="post in blogPosts"
							v-bind:key="post.id"
							v-bind:post="post"
						></blog-post>
						
						<div class="text-center">
							<ul class="pagination">
								<li v-for="p in pagination.pages" @click.prevent="setPage(p)" v-bind:class="{active: p == pagination.currentPage}">
									<a href="javascript://">{{p}}</a>
								</li>
							</ul>
							<div>Показано с {{pagination.startIndex + 1}} по {{pagination.endIndex + 1}} из {{blogPostsCount}} записей</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>

<script>
import BlogPost from '../components/BlogPost.vue'
import { decl1, decl2 } from '../assets/js/scripts.js'

export default
{
	props: ['namespace'],
	data () {
		return {
			blogPostsSearchText: '',
			blogPosts: [],
			blogPostsCount: 0,
			blogPostsLimit: 3,
			pagination: {},
		}
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
			var endIndex = Math.min(startIndex + this.blogPostsLimit - 1, totalItems - 1);
			
			fetch('/api/blog?' + new URLSearchParams({
				search: this.blogPostsSearchText,
				start: startIndex,
				limit: this.blogPostsLimit,
			}))
				.then(stream => stream.json())
				.then(data => {
					data.posts.forEach(item => {
						item.url = '/blog/'+item.id;
						item.poster = '/assets/img/'+item.poster;
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
	buildStore: (state) =>
	{
		if (state == null || state == undefined)
		{
			state =
			{
				pageTitle: "Username2",
			};
		}
		
		var res =
		{
			namespaced: true,
			state: () => { return state; },
			modules:
			{
				
			},
			mutations:
			{
			},
		}
		
		return res;
	},
	computed:
	{
		model()
		{
			return this.getModel();
		},
	},
	components:
	{
		BlogPost: BlogPost,
	},
}
</script>