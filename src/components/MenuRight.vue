<template>
	<div class="panel panel-primary">
		<div class="panel-heading">{{title}}</div>
		<div class="list-group">
			<router-link v-for="item in menu" :to="{path: item.url}" class="list-group-item">{{item.name}}</router-link>
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
export default {
	props: ['title', 'menu'],
}
</script>