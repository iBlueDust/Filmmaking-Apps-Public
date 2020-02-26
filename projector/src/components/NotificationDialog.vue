<template>
	<!-- <modal :name='name' @before-open="$emit('before-open')" @opened="$emit('opened')" @before-close="$emit('before-close')" @closed="$emit('closed')"> -->
	<div class="container">
		<h3>{{ title }}</h3>
		<hr />
		<p v-html="message"></p>
	</div>
</template>

<script>
export default {
	name: "NotificationDialog",
	props: {
		title: {
			type: String,
			default: ""
		},
		message: {
			type: String,
			default: ""
		}
	},
	sockets: {
		"notification hide"() {
			this.$emit("close");
		}
	}
};
</script>

<style scoped lang='scss'>
@import "@/master.scss";

.container {
	background: color(primary);
	padding: 2em;
	color: color(text-primary);
	text-align: center;
	height: 100%;

	h3 {
		font-size: 3em;
		margin: 0;
	}

	p {
		margin-top: 2em;

		& /deep/ a {
			color: color(link);
			text-decoration: underline;
			cursor: pointer;
		}
	}
}
</style>