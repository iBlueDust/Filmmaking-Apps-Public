<template>
	<div class="container">
		<h3>Charges{{ headerSuffix }}</h3>
		<Hooper
			class="hooper panel"
			v-if="charges.length > 0"
			:vertical="true"
			:autoPlay="true"
			:playSpeed="2000"
			:itemsToShow="3"
			:centerMode="true"
			:infiniteScroll="true"
		>
			<Slide class="panel-item" v-for="charge in charges" :key="charge">{{ charge }}</Slide>
		</Hooper>
		<div class="panel" v-else>
			<p class="empty">No Charges</p>
		</div>
	</div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default Vue.extend({
	name: "ChargesPanel",
	components: {
		Hooper,
		Slide
	},
	props: {
		charges: Array
	},
	computed: {
		headerSuffix() {
			return this.charges == null || this.charges.length <= 0
				? ""
				: ` - ${this.charges.length}`;
		}
	}
});
</script>

<style scoped lang='scss'>
@import "@/master.scss";

.container {
	display: flex;
	flex-direction: column;
	margin: 32px;
}

.hooper /deep/ .panel-item {
	text-align: center;
	font-size: 1.5em;
	padding: 8px 16px;
	display: flex;
	justify-content: center;
	align-items: center;
}

h3 {
	font-size: 3rem;
	margin: 0 32px 16px 0;
	flex: 0 0 auto;
}

.panel {
	list-style-type: none;
	background: color(card);
	flex: 1 0 auto;

	display: flex;
	justify-content: center;
	align-items: center;

	.empty {
		opacity: 0.6;
		font-weight: 700;
	}
}
</style>
