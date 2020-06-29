<template>
	<div class="panel panel-default blog-post">
		<img class="img-responsive" v-bind:src="post.poster" v-if="post.poster" />
		<div class="panel-heading" style="font-size: 23px;">
			<a v-bind:href="post.url">{{post.title}}</a>
		</div>
		<div class="panel-body">
			<p>{{post.cutcontent}}</p>
			<div class="pull-right">Добавлено: {{post.datetime}}</div>
			<div>Автор: {{post.author}}</div>
			<hr/>
			<div class="pull-right text-right">
				<div class="comments">
					<span><i class="fa fa-comments" style="margin-right: 10px;"></i>{{post.commentsText}}</span>
				</div>
				<div class="views">
					<span><i class="fa fa-eye" style="margin-right: 10px;"></i>{{post.viewsText}}</span>
				</div>
			</div>
			<a v-bind:href="post.url" class="btn btn-primary">Читать далее</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.list{
	&__item{
		display: block;
		text-align: left;
		cursor: pointer;
		padding: 10px;
	}
	&__item.active{
		background-color: blue;
		color: white;
	}
}
</style>

<script>
export default
{
	props: ['post'],
	buildStore: (state) =>
	{
		if (state == null || state == undefined)
		{
			state = 
			{
				items: [],
				active_id: -1,
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
				select (state, id)
				{
					state.active_id = id;
				},
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
		active_id ()
		{
			return this.model.active_id;
		},
		list ()
		{
			return this.model.list;
		},
	},
	methods:
	{
		onSelect: function (id)
		{
			this.storeCommit("select", id);
			this.$emit("select", id);
		},
	},
	components:
	{
	},
}
</script>