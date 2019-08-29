<template>
	<div class="xw_progress_container">
		<div class="wx_progress_">
			<div class="wx_progress_left" :style="leftStyle"></div>
			<div class="wx_progress_right" :style="rightStyle"></div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Progress',
	data() {
		return {};
	},
	// props: {
	// 	percent: Number,
	// 	showInfo: {
	// 		type: Boolean,
	// 		default: false
	// 	},
	// 	borderRadius: {
	// 		type: [Number, String],
	// 		default: 0
	// 	},
	// 	fontSize: {
	// 		type: [Number, String],
	// 		default: 16
	// 	},
	// 	stokeWidth: {
	// 		type: [Number, String],
	// 		default: 6
	// 	},
	// 	activeColor: {
	// 		type: String,
	// 		default: '#09BB07'
	// 	},
	// 	backgroundColor: {
	// 		type: string,
	// 		default: '#EBEBEB'
	// 	},
	// 	active: {
	// 		type: Boolean,
	// 		default: false
	// 	},
	// 	activeMode: {
	// 		type: String,
	// 		default: 'backwards'
	// 	},
	// 	bindactiveend: Function
	// },

	computed: {
		leftStyle() {
			return `backgroundColor: ${this.activeColor};`;
		},
		rightStyle() {
			return `backgroundColor: ${this.backgroundColor};`;
		}
	},

	methods: {}
};
</script>
<style lang='scss' scoped>
</style>