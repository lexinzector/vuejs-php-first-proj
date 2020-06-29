<template>
	<div class="navbar navbar-default">
		<div class="navbar-header">
			<a href="#/" class="navbar-brand">{{sitename}}</a>
			<button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
		<div class="navbar-collapse collapse" id="navbar-main">
			<ul class="nav navbar-nav">
				<li v-for="item in menu">
					<a v-bind:href="item.url">{{item.name}}</a>
				</li>
			</ul>
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
	props: ['sitename', 'menu'],
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