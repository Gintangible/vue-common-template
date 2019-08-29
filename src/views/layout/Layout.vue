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
	name: 'Layout',
	data() {
		return {};
	},
	components: {
		sidebar
	}
};
</script>
<style lang='scss' scoped>
.app-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.sidebar-container{
	background: #ccc;
}

.main-container{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>