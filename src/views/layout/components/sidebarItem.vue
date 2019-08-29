<template>
	<li v-if="!item.hidden">
        <router-link :to="item.path">{{item.name}}</router-link>
    </li>
</template>

<script>
export default {
    name: 'SidebarItem',

	props: {
        item: {
            type: Object,
            required: true
        }
    },
};
</script>
<style lang='scss' scoped>
</style>