<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'Gsvg',
    props: {
        name: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.name}`;
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className;
            } else {
                return 'svg-icon';
            }
        }
    }
};
</script>
<style scoped>
.svg-icon {
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    fill: currentColor;
    overflow: hidden;
}
</style>
