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
							v-bind:post="blogPost"
						></blog-post>
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
			
			blogPost: [],
		}
	},
	methods: {
		loadPostData(id){
			fetch('/api/blog/'+id)
				.then(stream => stream.json())
				.then(data => {
					data.url = '/blog/'+data.id;
					data.poster = '/assets/img/'+data.poster;
					data.datetime = new Date(data.ugmtime_public).format('d.m.Y в H:i:s');
					data.commentsText = parseInt(data.comments) > 0 ? data.comments+' '+decl1(data.comments, ['комментарий', 'комментария', 'комментариев']) : 'Комментариев нет';
					data.viewsText = parseInt(data.views) > 0 ? data.views+' '+decl1(data.views, ['просмотр', 'просмотра', 'просмотров']) : 'Просмотров нет';
					data.likesText = parseInt(data.likes) > 0 ? data.likes+' '+decl1(data.likes, ['лайк', 'лайка', 'лайков']) : 'Лайков нет';
					
					this.blogPost = data;
				})
				.catch(error => console.error(error));
		},
	},
	beforeMount(){
		this.loadPostData(this.$route.params.id);
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