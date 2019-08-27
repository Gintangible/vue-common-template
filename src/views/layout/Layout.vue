<template>
	<div class="app-container">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
            <router-view />
        </div>
	</div>
</template>

<script>
import sidebar from './components/sidebar';

export default {
	data() {
		return {};
	},

	components: {
		sidebar
	},

	computed: {},

	methods: {}
};
</script>
<style lang='scss' scoped>
.app-container {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>