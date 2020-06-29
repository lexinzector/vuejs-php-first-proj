<template>
	<div class="container">
		<header-block
			v-bind:sitename="siteName"
			v-bind:menu="menuTopData"
		></header-block>
		<div class="row">
			<div class="col-lg-8">
				<router-view/>
			</div>
			<div class="col-lg-4">
				<menu-right
					title="Навигация"
					v-bind:menu="menuRightData"
				></menu-right>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>

<script>
import HeaderBlock from '../components/HeaderBlock.vue'
import MenuRight from '../components/MenuRight.vue'

export default {
	props: ['namespace'],
	data () {
		return {
			siteName: 'SiteTemplate',
			
			pageTitle: 'Блог',
			
			menuTopData: [
				{
					name: 'Блог',
					url: '/',
				},
				{
					name: 'Каталог файлов',
					url: '/load',
				},
				{
					name: 'Обратная связь',
					url: '/feedback',
				},
				{
					name: 'Калькулятор',
					url: '/calc',
				},
				{
					name: 'Статичная страница',
					url: '/static',
				},
			],
			menuRightData: [
				{
					name: 'Блог',
					url: '/',
				},
				{
					name: 'Каталог файлов',
					url: '/load',
				},
				{
					name: 'Обратная связь',
					url: '/feedback',
				},
				{
					name: 'Калькулятор',
					url: '/calc',
				},
				{
					name: 'Статичная страница',
					url: '/static',
				},
				{
					name: 'Фотогалерея',
					url: '/photo',
				},{
					name: 'Видеогалерея',
					url: '/video',
				},
			],
		}
	},
	components:
	{
		HeaderBlock: HeaderBlock,
		MenuRight: MenuRight,
	},
}
</script>
