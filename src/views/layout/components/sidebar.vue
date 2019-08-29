<template>
	<ul class="sidebar-wrap">
		<sidebarItem v-for="route in routersFilter" :key="route.path" :item="route" :base-path="route.path"></sidebarItem>
	</ul>
</template>

<script>
import { componentRouters } from '@/router';
import sidebarItem from './sidebarItem';

export default {
	name: 'Sidebar',
	data() {
		return {
			componentRouters: componentRouters
		};
	},

	components: { sidebarItem },

	computed: {
		routersFilter() {
			let routerAry = [];
			this.componentRouters.forEach(item => {
				if(item.children) {
          routerAry = item.children
        }
			});
			return routerAry;
		}
	},

};
</script>
<style lang='scss' scoped>
.sidebar-wrap{
  margin-top: 0;
}
</style>