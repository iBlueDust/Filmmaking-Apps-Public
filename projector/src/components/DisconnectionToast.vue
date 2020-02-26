<template>
	<aside :class="{ 'visible' : value }">The server has disconnected</aside>
</template>

<script>
export default {
	name: "DisconnectionToast",
	props: {
		value: Boolean
	}
};
</script>

<style scoped lang='scss'>
@import "@/master.scss";

aside {
	position: absolute;
	bottom: -5em;
	right: 1em;

	color: color(text-primary);
	background: color(error);
	border-radius: 4px;
	padding: 0.5em 0.75em;

	transition: bottom 0.5s;

	&.visible {
		bottom: 1em;
	}
}
</style>